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






































