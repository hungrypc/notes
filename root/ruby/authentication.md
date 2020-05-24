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


## Adding a Login Form
We're gonna utilize 'sessions' here.
> Sessions enable the app to maintain a user-specific state.

```ruby
# routes.rb
# ...
get 'login', to: 'sessions#new'
post 'login', to: 'sessions#create'
delete 'logout', to: 'sessions#destroy'

# create controllers/sessions_controller.rb
class SessionsController < ApplicationController
  def new
  end

  def create
    user = User.find_by(email: params[:session][:email].downcase)
    if user && user.authenticate(params[:session][:password])
      session[:user_id] = user.id
      flash[:notice] = "Login in successful"
      redirect_to user
    else
      flash.now[:alert] = "There was something wrong with your login details"
      render 'new'
    end
  end

  def destroy
    session[:user_id] = nil
    flash[:notice] = "Logged out"
    redirect_to root_path
  end
end
```

```erb
<!-- create views/sessions/new.html.erb -->
<h1>Log in</h1>

<%= form_with (scope: :session, url: login_path, local: true) do |f| %>
  <p>
    <%= f.label :email %> <br/>
    <%= f.text_field :email, placeholder: "Email" %>
  </p>
  <p>
    <%= f.label :password %> <br/>
    <%= f.password_field :password, placeholder: "Password" %>
  </p>
  <p>
    <%= f.submit "Log in" %>
  </p>
<% end %>
```


## Authentication Helper methods
```ruby
# helpers/application_helper.rb
module ApplicationHelper
  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
    # instead of running find every time current_user is called, we memoize the user like this
  end

  def logged_in?
    !!current_user
    # turns current_user into a boolean
  end
end
```

```erb
<!-- in our navigation.html.erb somewhere -->
<% if logged_in? %>
  <li class="nav-item">
    <%=  link_to current_user.username, user_path(current_user), class: "nav-link" %>
  </li>
  <li class="nav-item">
    <%=  link_to 'Log out', logout_path, class: "nav-link", method: :delete %>
  </li>
<% else %>
  <li class="nav-item">
    <%=  link_to 'Log in', login_path, class: "nav-link" %>
  </li>
  <li class="nav-item">
    <%=  link_to 'Sign up', signup_path, class: "nav-link" %>
  </li>
<% end %>
```

Now, we want it so that when a user signs up, they're automatically logged in:

```ruby
# users_controller.rb
class UsersController < ApplicationController
  before_action :set_user, only: [:show, :edit, :update]   # this is so we can remove @user = User.find(params[:id]) from all our methods listed above

  # ...

  def create
    if @user.save
      session[:user_id] = @user.id
      flash[:notice] = 'Welcome to the Blog, signup successful'
      redirect_to articles_path
    else
      render 'new'
    end
  end

  private
  # ...

  def set_user
    @user = User.find(params[:id])
  end
end
```


## Controller Methods as Helper Methods
Taking our method from our application helper and assigning it to our application controller.

```ruby
# controllers/application_controller.rb
class ApplicationController < ActionController::Base

  helper_method :current_user
  # this makes it so it's ALSO a helper method while being a controller method

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end
  # take this out of ApplicationHelper and paste it here
end

# articles_controller.rb
# ...
def create
  @article = Article.new(article_params)
  @article.user = current_user  # this should work now
  # ...
end
```


## Restrict Actions from UI
Right now, all users can edit/delete each others' articles. We need to restrict that.

```erb
<!-- views/articles/_article.html.erb -->
<!-- ... -->
<% if logged_in? && article.user == current_user %>
  <%= link_to "Edit", edit_article_path(article) %>
  <%= link_to "Delete", article_path(article), method: :delete %>
<% end %>
```


## Restrict Actions at Controller Level
Despite the drop-down for "create new article" being unavailable for non logged in users, they are still able to access the create page via the URL. We have the same case for editting articles - any user can edit another user's article via url. Let's restrict this

```ruby
# application_controller.rb
class ApplicationController < ActionController::Base
  # ...

  def require_user
    if !logged_in?
      flash[:alert] = "You must be logged in to perform this action"
      redirect_to login_path
    end
  end
end

# articles_controller.rb
class ArticlesController < ApplicationController
  # ...
  before_action :require_user, except: [:show, :index]
  before_action :require_same_user, only: [:edit, :update, :destroy]
  # require user_needs to be before require_same_user since code runs top down
  # ...

  def require_same_user
    if current_user != @article.user
      flash[:alert] = "You can only edit/delete your own article"
      redirect_to @article
  end
end
```
Do the same with UsersController.


## Delete User
When we delete the user, we should also delete all articles written by that user.

```erb
<!-- wherever you want the delete button to be -->
<%= link_to "Delete Profile", user_path(current_user), method: :delete, data: { confirm: "Are you sure?" } %>
```

```ruby
#  users_controller.rb
before_action :set_user, only: [:show, :edit, :update, :destroy]
before_action :require_same_user, only: [:edit, :update, :destroy]
# ...
def destroy
  @user.destroy
  session[:user_id] = nil
  flash[:notice] = "Account deleted"
  redirect_to articles_path
end

# models/user.rb
class User < ApplicationRecord
has_many :articles, dependent: :destroy   # deletes articles if user is deleted
# ...
end
```


## Adding Admin User Functionality
```cli
rails generate migration add_admin_to_users
```

```ruby
class AddAdminToUsers <ActiveRecord::Migration[6.0]
  def change
    add_column :users, :admin, :boolean, default: false
  end
end

# run rails db:migrate

# articles_controller.rb
class ArticlesController < ApplicationController
  # ...
  before_action :require_user, except: [:show, :index]
  before_action :require_same_user, only: [:edit, :update, :destroy]

  # ...

  def require_same_user
    if current_user != @article.user && !current_user.admin?
      # redirect if current_user isnt article.user AND isnt admin
      # so if they're admin, they are allowed do these actions
      flash[:alert] = "You can only edit/delete your own article"
      redirect_to @article
  end
end
```
Admins should have the ability to edit/delete ALL articles.

```erb
<!-- views/articles/_article.html.erb -->
<!-- ... -->
<% if logged_in? && (article.user == current_user || current_user.admin?) %>
  <%= link_to "Edit", edit_article_path(article) %>
  <%= link_to "Delete", article_path(article), method: :delete %>
<% end %>
```
Do the same thing wherever necessary (articles show, delete profile, etc).

```ruby
# users controller
def destroy
  @user.destroy
  session[:user_id] = nil if @user == current_user
  flash[:notice] = "Account deleted"
  redirect_to articles_path
end
```
etc.