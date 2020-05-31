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
























