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


















