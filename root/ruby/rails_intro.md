# Introduction to Ruby on Rails

## Model View Controller (MVC)
```cli
gem isntall bundler
gem install webpacker
gem install rails
rails test_app

<!-- to start the server -->
rails s
```
```ruby
# config/routes.rb
Rails.application.routes.draw do
  root 'application#hello' # reference pages_controller.rb
end

# controllers/application_controller.rb
class ApplicationController < ActionController::Base
  def hello
    # render a template
    render html: 'Hello World!'
  end
end
```
Let's create a pages to start with.

```cli
rails generate controller pages
```
```ruby
# config/routes.rb
Rails.application.routes.draw do
  root 'pages#home'
end

# controllers/pages_controller.rb
class ApplicationController < ActionController::Base
  def hello

  end
end
```
```html
<!-- views/pages/home.html.erb -->
Hello World!
```

## Add About Page and Homework Assignment
```ruby
# config/routes.rb
Rails.application.routes.draw do
  root 'pages#home'
  get 'about', to: 'pages#about'   # GET request to about page
end

# controllers/pages_controller.rb
class ApplicationController < ActionController::Base
  def hello
  end

  def about

  end
end
```
```html
<!-- views/pages/about.html.erb -->
<h1> Welcome to the About page </h1>
```
































