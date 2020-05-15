# CRUD Operations in Ruby on Rails

## Tables, Migrations, and Naming Conventions

### Rails naming conventions
Articles resource:
- Model name: article
  - File name: article.rb
  - Class name: Article
- Table : articles
- Controller
- Views

```cli
rails generate migration create_articles
```
This creates a migration file (create_articles: name of migration file).

```ruby
# create_articles migration file (most will be filled out by ruby itself)
class CreateArticles < ActiveRecord::Migration[6.0]
  def change
    create_table :articles do |t|
      # here is where we make our manual changes
      t.string :title
      t.text :description
    end
  end
end

# after configuring the table, run 'rails db:migrate' on cli

# if we want to edit/add to our config. we would have to create another migration file eg:
# rails generate migration add_timestamps_to_articles
# which would give us this a new migration file with:
class AddTimestampToArticles < ActiveRecord::Migration[6.0]
  def change
    # here is where we make changes
    add_column :articles, :created_at, :datetime
    add_column :articles, :upated_at, :datetime
  end
end
```

## Models and Rails Console

Create a new file in the models folder called articles.rb

```ruby
class Article < ApplicationRecord
  # ...
end
```

```cli
rails c

> Article.all
<!-- shows all data in Article table -->

> Article.create(title: 'first article', description: 'desc')
<!-- create an Article by directly calling the class -->

> article = Article.new
> article.title = 'second article'
> article.description = 'desc 2'
> article.save
<!-- create an Article via variable assignment  -->

<!-- OR -->
> article = Article.new(title: 'title 3', description: 'desc3')
> article.save

exit
```

## CRUD Operations from the Rails Console
```cli
rails c

> Article.find(2)
<!-- grabs Article with id: 2 -->

> Article.first
> Article.last

> article = Article.find(2)
> article.title

> article.description = 'edited desc'
> article.save
<!-- update -->

> article = Article.last
> article.destroy
<!-- delete -->

```

## Validations
```ruby
# model file article.rb
class Article < ApplicationRecord
  validates :title, presence: true, length: { minimum: 6, maximum: 100 }
  validates :description, presence: true, length: { minimum: 10, maximum: 300 }
end
```

## Show Articles (route, action, view)
```ruby
# routes.rb
Rails.application.routes.draw.do
  root 'pages#home'
  get 'about', to: 'pages#about'

  resources: articles, only: [:show]
end

# controllers/articles_controller.rb
class ArticlesController < ApplicationController
  def show
    @article = Article.find(params[:id])
    # @ turns variable into an instance variable
  end
end
```

```erb
<!-- views/articles/show.html.erb -->
<h1>Showing Article Details</h1>

<p>Title: <%= @article.title %></p>
<p>Description: <%= @article.description %></p>
```


## Index Articles
```ruby
# routes.rb
Rails.application.routes.draw.do
  root 'pages#home'
  get 'about', to: 'pages#about'

  resources: articles, only: [:show, :index]
end

# controllers/articles_controller.rb
class ArticlesController < ApplicationController
  def show
    @article = Article.find(params[:id])
  end

  def index
    @articles = Article.all
  end
end
```

```erb
<!-- views/articles/index.html.erb -->
<h1>Articles List</h1>
<table>
  <thead>
    <tr>
      <th>Title</th>
      <th>Description</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    <% @articles.each do |article| %>
      <tr>
        <td><%= article.title %></td>
        <td><%= article.description %></td>
        <td></td>
      </tr>
    <% end %>
  </tbody>
</table>
```


## Create Articles
```ruby
# routes.rb
Rails.application.routes.draw.do
  root 'pages#home'
  get 'about', to: 'pages#about'

  resources: articles, only: [:show, :index, :new, :create]
end

# controllers/articles_controller.rb
class ArticlesController < ApplicationController
  def show
    @article = Article.find(params[:id])
  end

  def index
    @articles = Article.all
  end

  def new

  end

  def create
    @article = Article.new(user_params)
    @article.save

    # ruby extracts id from @article and uses it to redirect to path
    redirect_to @article
  end

  # whitelisting title and description fields
  def user_params
    params.require(:article).permit(:title, :description)
  end
end
```

```erb
<!-- views/articles/new.html.erb -->
<h1>Create a new Article</h1>
<%= form_with scope: :article, url: articles_path, local: true do |f| %>
  <p>
    <%= f.label :title %> <br/>
    <%= f.text_field :title %>
  </p>
  <p>
    <%= f.label :description %> <br/>
    <%= f.text_area :description %>
  </p>
  <p>
    <%= f.submit %>
  </p>
<% end %>
```


## Messaging - Validation and Flash Messages
```ruby
# controllers/articles_controller.rb
class ArticlesController < ApplicationController
  # ...

  #  initializing an empty @article instance variable so errors can be rendered
  def new
    @article = Article.new
  end

  def create
    @article = Article.new(user_params)
    if @article.save
      flash[:notice] = "Article was successfully created."
      redirect_to @article
    else
      render 'new'
    end
  end

  def user_params
    params.require(:article).permit(:title, :description)
  end
end
```

```erb
<!-- views/articles/new.html.erb -->
<h1>Create a new Article</h1>
<% if @article.errors.any? %>
  <h2>The following errors prevented the article from being saved</h2>
  <ul>
    <% @article.errors.full_messages.each do |msg| %>
      <li><%= msg %></li>
    <% end %>
  </ul>
<% end %>
<%= form_with scope: :article, url: articles_path, local: true do |f| %>
  <p>
    <%= f.label :title %> <br/>
    <%= f.text_field :title %>
  </p>
  <p>
    <%= f.label :description %> <br/>
    <%= f.text_area :description %>
  </p>
  <p>
    <%= f.submit %>
  </p>
<% end %>


<!-- layouts/application.html.erb -->
<!-- ... -->
<body>
  <% flash.each do |name, msg| %>
    <%= msg %>
  <% end %>
  <%= yield %>
</body>
<!-- ... -->
```


## Update Existing Articles
```ruby
# routes.rb
Rails.application.routes.draw.do
  # ...
  resources: articles, only: [:show, :index, :new, :create, :edit, :update]
end

# controllers/articles_controller.rb
class ArticlesController < ApplicationController
  # ...
  def edit
    @article = Article.find(params[:id])
  end

  def update
    @article = Article.find(params[:id])
    if @article.update(user_params)
      flash[:notice] = "Article was successfully updated."
      redirect_to @article
    else
      render 'edit'
    end
  end
  # ...
end
```

```erb
<!-- views/articles/edit.html.erb -->
<h1>Edit Article</h1>
<% if @article.errors.any? %>
  <h2>The following errors prevented the article from being saved</h2>
  <ul>
    <% @article.errors.full_messages.each do |msg| %>
      <li><%= msg %></li>
    <% end %>
  </ul>
<% end %>
<!-- this config fills in the form with existing data -->
<%= form_with (model: @article, local: true) do |f| %>
  <p>
    <%= f.label :title %> <br/>
    <%= f.text_field :title %>
  </p>
  <p>
    <%= f.label :description %> <br/>
    <%= f.text_area :description %>
  </p>
  <p>
    <%= f.submit %>
  </p>
<% end %>
```


## Delete Existing Articles
```ruby
# routes.rb
Rails.application.routes.draw.do
  # ...
  # now that we have all the routes, we dont need 'only' anymore
  # however, this exposes all the RESTful routes
  resources: articles
end

# controllers/articles_controller.rb
class ArticlesController < ApplicationController
  # ...
  def destroy
    @article = Article.find(params[:id])
    @article.destroy
    redirect_to articles_path
  end
  # ...
end
```

```erb
<!-- views/articles/index.html.erb -->
<h1>Articles List</h1>
<table>
  <thead>
    <tr>
      <th>Title</th>
      <th>Description</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    <% @articles.each do |article| %>
      <tr>
        <td><%= article.title %></td>
        <td><%= article.description %></td>
        <td><%= link_to 'Show', article_path(article) %>
        <td><%= link_to 'Delete', article_path(article), method: :delete %></td>
      </tr>
    <% end %>
  </tbody>
</table>
```


## User Interface - Add Layout Links
```erb
<!-- views/articles/index.html.erb -->
<table>
  <thead>
    <tr>
      <th>Title</th>
      <th>Description</th>
      <th colspan="3">Actions</th>
    </tr>
  </thead>
  <tbody>
    <% @articles.each do |article| %>
      <tr>
        <td><%= article.title %></td>
        <td><%= article.description %></td>
        <td><%= link_to 'Show', article_path(article) %></td>
        <td><%= link_to 'Edit', edit_article_path(article) %></td>
        <td><%= link_to 'Delete', article_path(article), method: :delete, data: { confirm: "Are you sure?" } %></td>
      </tr>
    <% end %>
  </tbody>
</table>
<p>
  <%= link_to 'Create new article', new_article_path %>
</p>


<!-- views/articles/show.html.erb -->
<h1>Showing Article Details</h1>

<p>Title: <%= @article.title %></p>
<p>Description: <%= @article.description %></p>

<%= link_to 'Edit', edit_article_path(@article) %> |
<%= link_to 'Delete', article_path(@article), method: :delete, data: { confirm: "Are you sure?" } %> |
<%= link_to 'Return to Index', articles_path %>
<!-- add Return to Index to all other pages -->


<!-- pages/home.html.erb -->
<h1>Welcome to the Homepage</h1>
<%= link_to 'Articles listing', articles_path %> |
<%= link_to 'About Page', about_path %>
```


## Refactoring and Partials
We've written a lot, but theres quite a bit of code that we've written multiple times. It's best that we refactor our code so that our code is DRY (Dont Repeat Yourself).

```ruby
# controllers/articles_controller.rb
class ArticlesController < ApplicationController
  # for example,
  # we repeat @article = Article.find(params[:id])
  # instead of writing it multiple times, we can do this:

  before_action: set_article, only: [:show, :edit, :update, :destroy]
  # this calls set_article before any code is run ONLY on the listed actions

  def destroy
    # @article = Article.find(params[:id])   # so now we don't need this line
    set_article
    @article.destroy
    redirect_to articles_path
  end
  # ...

  private # this makes methods that we define below only accessible by this controller

  def set_article
    @article = Article.find(params[:id])
  end

  def user_params # putting this under private to pratice good habits
    params.require(:article).permit(:title, :description)
  end

end
```
Next, we can create a partial for some of our views. Naming conventions dictate that we name partial files with an _ (eg. _messages.html.erb)

```erb
<!-- views/articles/_form.html.erb -->
<% if @article.errors.any? %>
  <h2>The following errors prevented the article from being saved</h2>
  <ul>
    <% @article.errors.full_messages.each do |msg| %>
      <li><%= msg %></li>
    <% end %>
  </ul>
<% end %>

<%= form_with (model: @article, local: true) do |f| %>
  <p>
    <%= f.label :title %> <br/>
    <%= f.text_field :title %>
  </p>
  <p>
    <%= f.label :description %> <br/>
    <%= f.text_area :description %>
  </p>
  <p>
    <%= f.submit %>
  </p>
<% end %>


<!-- views/articles/edit.html.erb -->
<h1>Edit Article</h1>
<%= render 'form' %>


<!-- views/articles/new.html.erb -->
<h1>Create a new Article</h1>
<%= render 'form' %>
```


## Deploying to Heroku
```ruby
# Gemfile
# move sqlite gem out from main area into development
group :development, :test do
  gem 'sqlite3', '~> 1.4'
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
end
# this is because in production in heroku, we're going to use the 'pg' gem
group :production do
  gem 'pg'
end
```

```cli
bundle install --without production
<!-- updates gemfiles -->

git push heroku master
heroku run rails db:migrate

```
