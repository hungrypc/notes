# Real-time Rails - MessageMe Chat App using Action Cable and Websockets

[App file](https://github.com/hungrypc/notes/blob/master/root/ruby/message_me)

## Root and Login Routes

```ruby
# routes.rb
Rails.application.routes.draw do
  root 'chatroom#index'
  get 'login', to: 'sessions#new'
end

# rails generate controller Sessions
# rails generate controller Chatroom

class SessionsController < ApplicationController
  def new
  end
end

class ChatroomController < ApplicationController
  def index
  end
end

# create views for both
# views/chatroom/index.html.erb
# views/sessions/new.html.erb
```


## Install Semantic-UI for Front-End

```ruby
# Gemfile
gem 'semantic-ui-sass'
gem 'jquery-rails'

# bundle install
```

```css
/* create app/assets/stylesheets/custom.css.scss */
@import 'semantic-ui'
```

```js
// javascript manifest application.js
require('jquery')
require('semantic-ui');
$(document).on('turbolinks:load', function() {
  $('.ui.dropdown')
  .dropdown()
})

// yarn add jquery

// config/webpack/environment.js
const webpack = require('webpack')
environment.plugins.prepend('Provide',
  new webpack.ProvidePlugin({
    $: 'jquery/src/jquery',
    jQuery: 'jquery/src/jquery'
  })
);
// this isn't working, most likely because of rails 6
```
Notes:

- Jquery doesn't work
- Going to keep only important notes here, most changes will be done on the app so if it's something we've done before then there's no need to document it


## Build User Resource

```ruby
# rails generate model User
# migration file
class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :username
      t.string :password_digest
      t.timestamps
    end
  end
end

# user model
class User < ApplicationRecord
  validates :username, presence: true, length: { minimum: 3, maximum: 15 }
  has_secure_password
end

# seeds.rb
User.create(username: 'dolores', password: 'password')
User.create(username: 'abernathy', password: 'password')
User.create(username: 'bernardlowe', password: 'password')
User.create(username: 'rick', password: 'password')
User.create(username: 'morty', password: 'password')
User.create(username: 'richardhendricks', password: 'password')
```


## Build Message Resource

```ruby
# rails generate model Message
# migration file
class CreateMessages < ActiveRecord::Migration[6.0]
  def change
    create_table :messages do |t|
      t.text :body
      t.integer :user_id
      t.timestamps
    end
  end
end

# message model
class Message < ApplicationRecord
  belongs_to :user
  validates :body, presence: true
end

# user model
class User < ApplicationRecord
  validates :username, presence: true, length: { minimum: 3, maximum: 15 }
  has_many :messages
  has_secure_password
end

# seeds.rb
Message.create(body: 'hi', user: User.last)
Message.create(body: 'hello', user: User.first)
Message.create(body: 'hey', user: User.second)

# rails db:seed
```


## Add Actual Messages from Table

```ruby
# chatroom controller
class ChatroomController < ApplicationController
  def index
    @messages = Message.all
  end
end
```

```erb
<!-- views/chatroom/index.html -->
<!-- ... -->
<div class="ui feed">
  <% @messages.each do |message| %>
    <div class="event">
      <div class="content">
        <div class="summary">
          <em><%= message.user.username %></em>: <%= message.body %>
        </div>
      </div>
    </div>
  <% end %>
</div>
<!-- ... -->
```





































