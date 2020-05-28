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
  <%= render @messages %>
</div>
<!-- ... -->

<!-- create views/messages/_message.html.erb -->
<div class="event">
  <div class="content">
    <div class="summary">
      <em><%= message.user.username %></em>: <%= message.body %>
    </div>
  </div>
</div>
```


## Start Auth System

```erb
<!-- views/sessions/new.html.erb -->
<!-- ... -->
<div class="column">
  <%= form_for(:session, html: {class: "ui form", role: "form"}, url: login_path) do |f| %>
  <div class="field">
    <%= f.label :username, "Username" %>
    <div class="ui left icon input">
      <%= f.text_field :username, placeholder: "Username" %>
      <i class="user icon"></i>
    </div>
  </div>
  <div class="field">
    <%= f.label :password, "Password" %>
    <div class="ui left icon input">
      <%= f.password_field :password, placeholder: "Password" %>
      <i class="lock icon"></i>
    </div>
  </div>
  <%= f.button "Login", class: "ui orange submit button" %>
  <% end %>
</div>
<!-- ... -->
```

```ruby
# application controller
class ApplicationController < ActionController::Base
  helper_method :current_user, :logged_in?

  def current_user
    @current_user ||= User.find(session[:user_id])  if session[:user_id]
  end

  def logged_in?
    !!current_user
  end

  def require_user
    if !logged_in?
      flash[:error] = "You must be logged in to perform that action"
      redirect_to login_path
    end
  end
end
```


## Auth System - Create and Destroy Sessions

```ruby
# routes
Rails.application.routes.draw do
  # ...
  post 'login', to: 'sessions#create'
  delete 'logout', to: 'sessions#destroy'
end

# sessions controller
class SessionsController < ApplicationController
  # ...

  def create
    user = User.find_by(username: params[:session][:username])
    if user && user.authenticate(params[:session][:password])
      session[:user_id] = user.id
      flash[:success] = "Logged in"
      redirect_to root_path
    else
      flash.now[:error] = "There was something wrong with your credentials"
      render 'new'
    end
  end

  def destroy
    session[:user_id] = nil
    flash[:success] = "Logged out"
    redirect_to login_path
  end
end
```

```erb
<!-- _navigation -->
<div class="right menu">
  <% if logged_in? %>
    <%= link_to "Log out" , logout_path, method: :delete, class: "item" %>
  <% else %>
    <%= link_to "Log in", login_path, class: "item" %>
    <div class="item">
      <div class="ui primary button">Sign Up</div>
    </div>
  <% end %>
</div>
```


## Add Flash Messages Display

```erb
<!-- layouts/_messages.html.erb -->
<% flash.each do |type, msg| %>
  <div class="ui <%= type %> transition" >
    <div class="header">
      <%= msg %>
    </div>
  </div>
<% end %>

<!-- application.html.erb -->
<%= render 'layouts/messages' %>
```


## Restrict View at Controller Level

```ruby
# chatroom controller
class ChatroomController < ApplicationController
  before_action :require_user

  def index
    @messages = Message.all
  end
end


# sessions controller
class SessionsController < ApplicationController
  before_action :logged_in_redirect, only: [:new, :create]

  # ...

  private

  def logged_in_redirect
      if logged_in?
        flash[:error] = "You are already logged in"
        redirect_to root_path
      end
    end
end
```


## Add Messages From the UI

```ruby
# routes.rb
Rails.application.routes.draw do
  # ...
  post 'message', to: 'messages#create'
end

# chatroom controller
class ChatroomController < ApplicationController
  before_action :require_user

  def index
    @message = Message.new      # for new messages
    @messages = Message.all
  end
end

# manually create messages controller

class MessagesController < ApplicationController
  before_action :require_user

  def create
    message = current_user.messages.build(message_params)
    if message.save
      redirect_to root_path
    end
  end

  private

  def message_params
    params.require(:message).permit(:body)
  end
end
```

```erb
<!-- views/chatroom/index -->
<%= form_for(@message, html: { class: "ui reply form", role: "form" }, url: message_path) do |f| %>
  <div class="field">
    <div class="ui fluid icon input">
      <%= f.text_field :body %>
      <%= f.button '<i class="bordered inverted orange edit icon"></i>'.html_safe %>
    </div>
  </div>
<% end %>
```


## Implementing Real-time with ActionCable

```ruby
# rails generate channel Chatroom
# chatroom_channel.rb
class ChatroomChannel < ApplicationCable::Channel
  def subscribed
    stream_from "chatroom_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end

# routes.rb
Rails.application.routes.draw do
  # ...

  mount ActionCable.server, at: '/cable'
end

# messages controller
class MessagesController < ApplicationController
  before_action :require_user

  def create
    message = current_user.messages.build(message_params)
    if message.save
      ActionCable.server.broadcast "chatroom_channel", mod_message: message_render(message)
      # this is how we broadcast
    end
  end

  private

  def message_params
    params.require(:message).permit(:body)
  end

  def message_render(message)
    render(partial: 'message', locals: { message: message })
  end
end
```

```js
// javascripts/channels/chatroom_channel.js
import consumer from "./consumer"

consumer.subscriptions.create("ChatroomChannel", {
  connected() {
    // Called when the subscription is ready for use on the server
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
    // Called when there's incoming data on the websocket for this channel
    $("#message-container").append(data.mod_message)
  }
});
```

```erb
<!-- views/chatroom/index.html -->
<!-- ... -->
<div class="ui feed" id="message-container">
  <%= render @messages %>
</div>
<!-- ... -->
<%= form_for(@message, html: { class: "ui reply form", role: "form" }, url: message_path, remote: true) do |f| %>
<!-- ... -->
```


## Add Auto-scrolling to Chat Window

```erb
<!-- views/chatroom/index.html -->
<div class="content" id="messages">
  <div class="ui feed" id="message-container">
    <%= render @messages %>
  </div>
</div>
```

```css
/* custom.css.scss */
/*...*/
#messages {
  height: 15em;
  overflow: auto;
}
```

```js
// application.js
function scroll_bottom() {
  if ($('#messages').length > 0) {
    $('#messages').scrollTop($('#messages')[0].scrollHeight)
  }
}
scroll_bottom()

// javascripts/channels/chatroom_channel.js
consumer.subscriptions.create("ChatroomChannel", {
  // ...

  received(data) {
    // Called when there's incoming data on the websocket for this channel
    $("#message-container").append(data.mod_message)
    scroll_bottom()
  }
});
```


## Beautify Input Box, Functionality, and Create Custom Scope

```js
// application.js
function submitMessage() {
  $('#message_body').on('keydown', function(e) {
    if (e.keyCode == 13) {
      $('button').click()
      $('#message_body').val("")
    }
  })
};
```

```ruby
# chatroom controller
class ChatroomController < ApplicationController
  before_action :require_user

  def index
    @message = Message.new
    @messages = Message.custom_display
  end
end

# message model
class Message < ApplicationRecord
  belongs_to :user
  validates :body, presence: true
  scope :custom_display, -> { order(:created_at).last(20) }
end

```
























