# Subscriptions

Setting up GraphQL to listen for data updates.

## Subscription Basics
```graphql
# schema.graphql
# ...
type Subscription {
  count: Int!
}
# ...
```

```js
////// Subscription.js
const Subscription = {
  count: {
    subscribe(parent, args, { pubsub }, info) {
      let count = 0;

      setInterval(() => {
        count++;
        // send data
        pubsub.publish('count', {
          count   // value we expect to come back
        })
      }, 1000);

      // sets up channel: count
      return pubsub.asyncIterator('count');
    }
  }
}
export { Subscription as default };


////// index.js
import { GraphQLServer, PubSub } from 'graphql-yoga';
// ...
import Subscription from './resolvers/Subscription';

const pubsub = new PubSub();

const server = new GraphQLServer){
  // ...
  resolvers: {
    // ...
    Subscription,
    // ...
  },
  context: {
    db,
    pubsub
  }
}
```
Query:

```graphql
subscription {
  count
}
```
So we've set this up to watch for a change in data for the variable 'count'. Whenever count updates, GraphQL updates and sends us back this updated data. At this point, we've set up a subscription but it's not doing anything meaningful yet.


## Setting up a Comments and Posts Subscription
```graphql
# schema.graphql
# ...
type Subscription {
  count: Int!
  comment(postId: ID!): Comment!
  post: Post!
}
# ...
```

```js
////// Subscription.js
const Subscription = {
  // ...
  comment: {
    subscribe(parent, { postId }, { db, pubsub }, info) {
      // check if post exists
      const post = db.post.find((post) => post.id === postId && post.published)

      if (!post) {
        throw new Error('Post not found')
      }

      return pubsub.asyncIterator(`comment: ${postId}`);
    }
  },
  post: {
    subscribe(parent, args, { db, pubsub }, info) {
      return pubsub.asyncIterator('post')
    }
  }
}
export { Subscription as default };


////// Mutation.js
const Mutation = {
  // ...
  // since this is where we create comments, this is where we'll call pubsub.publish()
  createComment(parent, args, { db, pubsub }, info) {
    const userExists = users.some((user) => user.id === args.data.author);
    const postExists = posts.some((post) => post.id === args.data.post && post.published);

    if (!userExists) {
      throw new Error('User not found');
    }

    if(!postExists) {
      throw new Error('Post not found');
    }

    const comment = {
      id: uuidv4(),
      ...args.data
    }

    db.comments.push(comment)
    pubsub.publish(`comment: ${args.data.post}`, { comment })

    return comment;
  },
  createPost(parent, args, { db, pubsub }, info) {
      const userExists = users.some((user) => user.id === args.data.author);

      if (!userExists) {
        throw new Error('User not found');
      }

      const post = {
        id: uuidv4(),
        ...args.data
      }

      db.posts.push(post)

      // check if post is published
      if (args.data.published) pubsub.publish('post', { post })

      return post;
    },
};
```
Query:

```graphql
subscription {
  # listening for new comments on postId: 10
  comment(postId: "10") {
    id
    text
    author {
      id
      name
    }
  }
}

# so when we fire off:
mutation {
  createComment(
    data: {
      text: "New comment",
      author: "1",
      post: "10"
    }
  ) {
    id
    text
  }
}

# our subscription will be pinged and will notify us that the comment was created
```


## Expanding our Comments and Posts Subscription for Edits and Deletes
```graphql
# schema.graphql
# ...
type Subscription {
  comment(postId: ID!): CommentSubscriptionPayload!
  post: PostSubscriptionPayload!
}
# we're adding a field to tell the client whether its a create, edit, or delete

type PostSubscriptionPayload {
  mutation: String!
  data: Post!
}

type CommentSubscriptionPayload {
  mutation: String!
  data: Comment!
}
# ...
```

```js
////// Subscription.js
const Subscription = {
  // ...
  comment: {
    subscribe(parent, { postId }, { db, pubsub }, info) {
      // check if post exists
      const post = db.post.find((post) => post.id === postId && post.published)

      if (!post) {
        throw new Error('Post not found')
      }

      return pubsub.asyncIterator(`comment: ${postId}`);
    }
  },
  post: {
    subscribe(parent, args, { db, pubsub }, info) {
      return pubsub.asyncIterator('post')
    }
  }
}
export { Subscription as default };


////// Mutation.js
const Mutation = {
  // ...
  // since this is where we create comments, this is where we'll call pubsub.publish()
  createComment(parent, args, { db, pubsub }, info) {
    const userExists = users.some((user) => user.id === args.data.author);
    const postExists = posts.some((post) => post.id === args.data.post && post.published);

    if (!userExists) {
      throw new Error('User not found');
    }

    if(!postExists) {
      throw new Error('Post not found');
    }

    const comment = {
      id: uuidv4(),
      ...args.data
    }

    db.comments.push(comment)
    pubsub.publish(`comment: ${args.data.post}`, {
      comment: {
        mutation: 'CREATED',
        data: comment
      }
    })

    return comment;
  },
  deleteComment(parent, args, { db, pubsub }, info) {
    const commentIndex = comments.findIndex((comment) => comment.id === args.data.id)

    if (commentIndex === -1) {
      throw new Error('Comment not found')
    }

    const [ comment ] = db.comments.splice(commentIndex, 1)

    pubsub.publish(`comment: ${comment.post}`, {
      comment: {
        mutation: 'DELETED',
        data: comment
      }
    })

    return comment;
  },
  updateComment(parent, args, { db, pubsub }, info) {
    const { id, data } = args;
    const comment = db.comments.find((comment) => comment.id === id);

    if (!comment) {
      throw new Error('Comment not found')
    }

    if (typeof data.text === 'string') {
      comment.text = data.text
    }

    pubsub.publish(`comment: ${comment.post}`, {
      comment: {
        mutation: 'UPDATED',
        data: comment
      }
    })

    return comment;
  },
  createPost(parent, args, { db, pubsub }, info) {
    const userExists = users.some((user) => user.id === args.data.author);

    if (!userExists) {
      throw new Error('User not found');
    }

    const post = {
      id: uuidv4(),
      ...args.data
    }

    db.posts.push(post)

    // passing more to inform mutation
    if (args.data.published) {
      pubsub.publish('post', {
        post: {
          mutation: 'CREATED',
          data: post
        }
      })
    }

    return post;
  },
  deletePost(parent, args, { db, pubsub }, info) {
    const postIndex = posts.findIndex((post) => post.id === args.id)

    if (postIndex === -1) {
      throw new Error('Post not found')
    }

    // since there's only one element in array, we can do this:
    const [ post ] = db.posts.splice(postIndex, 1)

    comments = comments.filter((comment) => comment.post !== args.id)

    if(post.published) {
      pubsub.publish('post', {
        post: {
          mutation: 'DELETED',
          data: post
        }
      })
    }

    return deletedPosts[0];
  },
  updatePost(parent, args, { db, pubsub }, info) {
    const { id, data } = args;
    const post = db.posts.find((post) => post.id === id);
    const originalPost = { ...post };

    if (!post) {
      throw new Error('Post not found')
    }

    if (typeof data.title === 'string') {
      post.title = data.title
    }

    if (typeof data.body === 'string') {
      post.body = data.body
    }

    if (typeof data.published === 'boolean') {
      post.published = data.published

      if (originalPost.published && !post.published) {
        pubsub.publish('post', {
          post: {
            mutation: 'DELETED',
            data: post
          }
        })
      } else if (!originalPost.published && post.published){
        pubsub.publish('post', {
          post: {
            mutation: 'CREATED',
            data: post
          }
        })
      }
    } else if (post.published) {
      pubsub.publish('post', {
        post: {
          mutation: 'UPDATED',
          data: post
        }
      })
    }

    return post;
  },
};
```
Query:

```graphql
subscription {
  post {
    mutation
    data {
      id
      title
      body
      published
    }
  }
  comment(postId: "10") {
    mutation
    data {
      id
      text
    }
  }
}
```


## Enums
Enums are just another tool for us to use that allows us to better model our application data.
- a special type that defines a set of constants
- this type can then be used as the type for a field (similar to scalar and custom object types)
- values for the field must be one of the constants for the type

e.g. UserRole - standard, editor, admin

> Basically, enums allow us to represent a set of constants so that any fields of that type must have a value equal to one of our constants. This is good when modelling our data and we have a set of standard values that we know about ahead of time.

```graphql
# schema.graphql
# ...

# we're going to set up in here constant values
enum MutationType {
  CREATED
  UPDATED
  DELETED
}

# ...

# so mutation must have one of the listed constants above
type PostSubscriptionPayload {
  mutation: MutationType!
  data: Post!
}

type CommentSubscriptionPayload {
  mutation: MutationType!
  data: Comment!
}
# ...
```