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


## Setting up a Comments Subscription
```graphql
# schema.graphql
# ...
type Subscription {
  count: Int!
  comment(postId: ID!): Comment!
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
  }
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























