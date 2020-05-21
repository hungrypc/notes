# Associations and Authentication Systems

## One to Many Association Basics
```cli
rails generate migration add_user_id_to_articles
```

```ruby
# in our recently created migration file
def change
  add_column :articles, :user_id, :id
end

# on console: rails db:migrate

# user model
has_many :articles

# article model
belongs_to :user
```
This is all you need to form a one to many association (**one** user can have **many** articles). This gives us the functionality to add many articles to a user

note: this video introduced the existence of the shovel operator, definitely look into it.


## Create Users and Add User Validation
```cli
rails generate migration create_users
```

```ruby
# in the created migration file
def change
  create_table :users do |t|
    t.string :username
    t.string :email
    t.timestamps
  end
end

# rails db:migrate

# app/models/user.rb (create new file)
class User < ApplicationRecord
  validates :username, presence: true, uniqueness: { case_sensitive: false}, length: { minimum: 3, maximum: 25 }
  # sets uniqueness to true AND case sensitive false
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, presence: true, uniqueness: { case_sensitive: false}, length: { maximum: 105 }, format: { with: VALID_EMAIL_REGEX }
  # ensures that the email is in correct email format
end
```


## Show User Info in Articles
```erb
<!-- index.html.erb -->
<div>
  by <%= article.user.username %>
</div>

<!-- show.html.erb -->
<div>
  by <%= @article.user.username %>
</div>
<!-- using @ since this erb works with an instance variable, refer to previous notes -->
```


## Alter Object State before_save
```ruby
# app/models/user.rb
  before_save { self.email = email.downcase }
  # this downcases the email string before saving the user object

  validates :username, presence: true, uniqueness: { case_sensitive: false}, length: { minimum: 3, maximum: 25 }
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, presence: true, uniqueness: { case_sensitive: false}, length: { maximum: 105 }, format: { with: VALID_EMAIL_REGEX }
end
```


## Intro to Auth: Add a Secure Password
1. Add bcrypt gem (uncomment bcrypt line in gemfile, then run bundle install)
2. Add had_secure_password on User model
3. Add password digest field to Users table

Step 3 in steps:

```cli
rails generate migration add_password_digest_to_users
```

```ruby
# new migration file
def change
  add_column :users, :password_digest, :string
end

# rails db:migrate
```


## Users Sign Up and Create New Users (back-end)
Build a signup route.

```ruby
# routes.rb
get 'signup', to: 'users#new'
resources :users, except: [:new]
# we're doing this because ruby will want to post to 'signup' when we want the post to be routed to users#create. this way, we get all the routes for users but still have 'signup' route to users#new without this interference

# create users controller users_controller.rb
class UsersController < ApplicationController
  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      flash[:notice] = 'Welcome to the Blog, signup successful'
      redirect_to articles_path
    else
      render 'new'
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password)
  end
end
```

```erb
<!-- create views/users/new.html.erb -->
<h1>Sign Up for Blog </h1>
<%= render 'form' %>

<!-- create views/users/_form.html.erb -->
<% if obj.errors.any? %>
  <h2>The following errors prevented the <%= obj.class.name.downcase %> from being saved</h2>
  <ul>
    <% obj.errors.full_messages.each do |msg| %>
      <li><%= msg %></li>
    <% end %>
  </ul>
<% end %>
<!-- note: lecture 138 shows a shared errors partial. after completing the shared aspect, we can change @users above to obj so that multiple models can use this errors partial -->
<%= render 'shared/errors', obj: @article %>
<%= render 'shared/errors', obj: @user %>
<!-- the above is what would be here instead of our errors.any? with obj defined so that each page knows what instance we're working with -->

<%= form_with (model: @user, local: true) do |f| %>
  <p>
    <%= f.label :username %> <br/>
    <%= f.text_field :username, placeholder: "Username" %>
  </p>
  <p>
    <%= f.label :email %> <br/>
    <%= f.text_field :email, placeholder: "Email" %>
  </p>
  <p>
    <%= f.label :password %> <br/>
    <%= f.password_field :password, placeholder: "Password" %>
  </p>
  <p>
    <%= f.submit "Sign up", class: "whatever class" %>
  </p>
<% end %>

<!-- home.html.erb -->
<!-- ... -->
<%= link_to "Sign up!", signup_path, class: "btn btn-success btn-lg" %>
```


## Edit Users

```ruby
# users_controller.rb
class UsersController < ApplicationController
  def new
    # ...
  end

  def create
    # ...
  end

  def edit
    @user = User.find(params[:id])
  end

  def update
    @user = User.find(params[:id])
    if @user.update(user_params)
      flash[:notice] = "Account updated."
      redirect_to @user
    else
      render 'edit'
    end
  end

  private

  def user_params
    # ...
  end
end
```

```erb
<!-- create views/users/edit.html.erb -->
<h1>Edit Profile </h1>
<%= render 'form' %>

<!-- but our form partial says 'Sign up', so we need to tell the partial to display based on whether a new record is being made or a record is being edited -->

<!-- create views/users/_form.html.erb -->
<%= form_with (model: @user, local: true) do |f| %>
  <!-- ... -->
  <p>
    <%= f.submit(@user.new_record? ? "Sign up" : "Update account", class: "whatever class") %>
  </p>
<% end %>
```


## Show User and Profile Image

```ruby
# users_controller.rb
class UsersController < ApplicationController
  # ...

  def show
    @user = User.find(params[:id])
    @articles = @user.articles
  end

  private

  def user_params
    # ...
  end
end
```

```erb
<!-- create views/users/show.html.erb -->
<h1><%= @user.username %>'s Profile</h1>
<!-- lecture suggests using gravatar, but id rather not make a wordpress account -->
<h3>Articles</h3>
<!-- make a partial out of views/articles/index.html => views/articles/_article.html.erb so that we can do: -->
<%= render 'articles/article' %>
```

There's a lot of repetition from here on out, so I'm only going to include new information/methods (plus relevant repeated code) to save for time and space.

## Users Index

```ruby
# users_controller.rb
class UsersController < ApplicationController
  # ...

  def index
    @users = User.all
  end

  private

  def user_params
    # ...
  end
end
```

```erb
<!-- create views/users/index.html.erb -->
<h1>Bloggers</h1>

<% @users.each do |user| %>
  <div>
    <%= link_to user.username, user %>
  </div>
  <div>
    <!-- gravatar user image -->
  </div>
  <div>
    <%= pluralize(user.articles.count, "article") %>
    <!-- if user only has one article, says "article", else, "articles" -->
  </div>
<% end %>
```


## Cleanup Layout
```erb
<!-- views/users/show.html.erb -->
<!-- ... -->
<%= link_to "Edit your profile", edit_user_path(@user) %>

<!-- _article.html.erb -->
<!-- linking username to user's profile -->
<%= link_to article.user.username, user_path(article.user) %>
```


## Add Pagination to views
install will_paginate gem, then bundle install

```ruby
# articles_controller.rb
# ...

def index
  @articles = Article.paginate(page: params[:page], per_page: 5)
end

# ...

# can do the same with users profile show articles
# users_controller.rb
class UsersController < ApplicationController
  # ...

  def show
    @user = User.find(params[:id])
    @articles = @user.articles.paginate(page: params[:page], per_page: 5)
  end

  private

  def user_params
    # ...
  end
end
```

```erb
<!-- views/articles/index.html.erb -->
<%= will_paginate @articles %>
```






























