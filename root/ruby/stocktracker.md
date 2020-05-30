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































