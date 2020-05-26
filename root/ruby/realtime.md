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












































