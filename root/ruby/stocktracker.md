# Stock Tracker Social Media App

rails new finance_tracker

Same deal here, I'm not going to document info we've already seen. Only going to document new information learned from this section.

## Add Devise Gem for Authentication
gem 'devise'

```cli
bundle install
rails generate devise:install

rails generate devise User
rails db:migrate

```

```ruby
# application controller
class ApplicationController < ActionController::Base
  before_action :authenticate_user!
end
```

```erb
<p class="notice"><%= notice %></p>
<p class="alert"><%= alert %></p>
```


## Test Authentication System - Login, Logout

```erb
<h1>Welcome#index</h1>
<p>Find me in app/views/welcome/index.html.erb</p>

<%= link_to 'Sign out', destroy_user_session_path, method: :delete %>
```


## Add Bootstrap to the App

https://www.mashrurhossain.com/blog/rails6bootstrap4


## Update Devise Views

```cli
gem 'devise-bootstrap-views'
bundle install
rails generate devise:views:bootstrap_templates
```


## Setup and use API to get Stock Data

```ruby
gem 'iex-ruby-client'
# bundle install

# rails g model Stock ticker:string name:string last_price:decimal

# Stock model
class Stock < ApplicationRecord
  def self.new_lookup(ticker_symbol)
    client = IEX::Api::Client.new(
      publishable_token: 'publishable_token',
      secret_token: 'secret_token',
      endpoint: 'https://cloud.iexapis.com/v1'  # use 'https://sandbox.iexapis.com/v1' for Sandbox
    )
    client.price(ticker_symbol)
  end
end

# EDITOR="code --wait" rails credentials:edit
# for some reason, this isnt working, it doesn't wait for me
```


## Build Stock Lookup Form
gem "font-awesome-rails"

```erb
<!-- users/my_portfolio.html.erb -->
<h1>My Portfolio</h1>

<div class="search-area">
  <h3>Search Stocks</h3>
  <%= form_tag search_stock_path, method: :get do %>
    <div class="form-group row">
      <div class="col-sm-9 no-right-padding">
        <%= text_field_tag  :stock, params[:stock], placeholder: "Stock ticker symbol", autofocus: true, class: "form-control form-control-lg" %>
      </div>
      <div class="col-sm-3 no-left-padding">
        <%= button_tag type: :submit, class: "btn btn-success" do %>
          <%= fa_icon 'search 2x' %>
        <% end %>
      </div>
    </div>
  <% end %>
</div>
<% if @stock %>
  <div class="card card-header">
    <strong>Symbol:</strong> <%= @stock.ticker %>
    <strong>Name:</strong> <%= @stock.name %>
    <strong>Price:</strong> <%= @stock.last_price %>
  </div>
<% end %>
```

```ruby
# routes.rb
Rails.application.routes.draw do
  # ...
  get 'search_stock', to: 'stocks#search'
end

# create controllers/stocks_controller.rb
class StocksController < ApplicationController
  def search
    if params[:stock].present?
      @stock = Stock.new_lookup(params[:stock])
      if @stock
        render 'users/my_portfolio'
      else
        flash[:alert] = "Please enter a valid symbol"
        redirect_to my_portfolio_path
      end
    else
      flash[:alert] = "Please enter a valid symbol"
      redirect_to my_portfolio_path
    end
  end
end

# models/stock.rb
class Stock < ApplicationRecord
  def self.new_lookup(ticker_symbol)
    client = IEX::Api::Client.new(
      publishable_token: 'Tpk_a3206175d4ea446dbe4e0350061c2b25',  # for some reason, i cant store secrets
      secret_token: 'Tsk_4e0d2d1a1f8842a7b1966abe523af68dn',
      endpoint: 'https://sandbox.iexapis.com/v1'
    )
    begin   #try
      new(ticker: ticker_symbol, name: client.company(ticker_symbol).company_name, last_price: client.price(ticker_symbol))
    rescue => exception   #catch
      return nil
    end
  end
end
```


## Using AJAX with Form Submission

```erb
<!-- create users/_result.html.erb -->
<div class="results-block">
  <%= render 'layouts/messages' %>
</div>
<% if @stock %>
  <div class="card card-header">
    <strong>Symbol:</strong> <%= @stock.ticker %>
    <strong>Name:</strong> <%= @stock.name %>
    <strong>Price:</strong> <%= @stock.last_price %>
  </div>
<% end %>

<!-- my_portfolio.html.erb -->
<div class="search-area">
  <h3>Search Stocks</h3>
  <%= form_tag search_stock_path, remote: true, method: :get do %>
    <!-- add remote: true -->
    <!-- this turns it into an ajax request -->
    <!-- ... -->
  <% end %>
</div>
<div id="results">

</div>


<!-- create users/_results.js.erb -->
document.querySelector('#results').innerHTML = "<%= j render 'users/result.html' %>"
```

```ruby
# controllers/stocks_controller.rb
class StocksController < ApplicationController
  def search
    if params[:stock].present?
      @stock = Stock.new_lookup(params[:stock])
      if @stock
        respond_to do |format|              # add this to handle js
          format.js { render partial: 'users/result'  }
        end
      else
        respond_to do |format|
          flash.now[:alert] = "Please enter a valid symbol"
          format.js { render partial: 'users/result'  }
        end
      end
    else
      respond_to do |format|
        flash.now[:alert] = "Please enter a symbol"
        format.js { render partial: 'users/result'  }
      end
    end
  end
end
```


## Setup UserStock Resource

rails generate resource UserStock user:references stock:references
rails db:migrate

```ruby
# user model
class User < ApplicationRecord
  has_many :user_stocks
  has_many :stocks, through: :user_stocks

  # ...
end

# stock model
class Stock < ApplicationRecord
  has_many :user_stocks
  has_many :users, through: :user_stocks

  validates :name, :ticker, presence: true

  # ...
end
```


## Stocks Listing Views

```ruby
# User controller
class UsersController < ApplicationController
  def my_portfolio
    @tracked_stocks = current_user.stocks
  end
end
```

```erb
<!-- _navigation.html.erb -->
<li class="nav-item <%= 'active' if request.path == my_portfolio_path %>">
  <%= link_to 'My Portfolio', my_portfolio_path, class: 'nav-link' %>
</li>
```


## Track Stocks from Front-end: browser

```ruby
# stock model
class Stock < ApplicationRecord
  # ...

  def self.check_db(ticker_symbol)
    where(ticker: ticker_symbol).first
  end
end

# user_stock controller
class UserStocksController < ApplicationController

  def create
    stock = Stock.check_db(params[:ticker])
    if stock.blank?
      stock = Stock.new_lookup(params[:ticker])
      stock.save
    end
    @user_stock = UserStock.create(user: current_user, stock: stock)
    flash[:notice] = "Stock #{stock.name} successfully added"
    redirect_to my_portfolio_path
  end
end
```


## Implementing Stock Tracking Restrictions

```ruby
# user model
class User < ApplicationRecord
  # ...

  def stock_already_tracked?(ticker_symbol)
    stock = Stock.check_db(ticker_symbol)
    return false unless stock
    stocks.where(id: stock.id).exists?
  end

  def under_stock_limit?
    stocks.count < 10
  end

  def can_track_stock?(ticker_symbol)
    under_stock_limit? && !stock_already_tracked?(ticker_symbol)
  end
end
```

```erb
<% if @stock %>
  <!-- ... -->
    <% if current_user.can_track_stock?(@stock.ticker) %>
      <%= link_to 'Add to portfolio', user_stocks_path(user: current_user, ticker: @stock.ticker), class: "btn btn-success", method: :post %>
    <% else %>
      <span class="badge badge-secondary">
        You are already tracking
        <% if !current_user.under_stock_limit? %>
          10 stocks
        <% end %>
        <% if !current_user.stock_already_tracked?(@stock.ticker) %>
          this stock
        <% end %>
      </span>
    <% end %>
  </div>
<% end %>
```


## Accept Additional Fields in App

```erb
<!-- _nav -->
<li class="nav-item dropdown">
  <!-- ... -->
  <div class="dropdown-menu" aria-labelledby="navbarDropdown">
    <%= link_to edit_user_registration_path, class: 'dropdown-item' do %>
      <%= fa_icon 'edit' %> Edit profile
    <% end %>
    <!-- ... -->
  </div>
</li>
```

```ruby
class ApplicationController < ActionController::Base
  before_action :authenticate_user!
  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:account_update, keys: [:first_name, :last_name])
  end
end
```

SKIPPED LECTURE 275, UNNECESSARY (BUT REFERENCE IN FUTURE IF NEED)

## Self Referential Association - Users and Friends

```ruby
# rails g Friendship user:references
class CreateFriendships < ActiveRecord::Migration[6.0]
  def change
    create_table :friendships do |t|
      t.references :user, null: false, foreign_key: true
      t.references :friend, references: :users, foreign_key: { to_table: :users }
      t.timestamps
    end
  end
end


class Friendship < ApplicationRecord
  belongs_to :user
  belongs_to :friend, class_name: 'User'
end


class User < ApplicationRecord
  # ...
  has_many :friendships
  has_many :friends, through: :friendships
  # ...
end
```





































