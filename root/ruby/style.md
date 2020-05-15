# Styling our Rails Application

## Bootstrap, Asset Pipeline, JS, Webpack, Rails 6 vs 5
Installing Bootstrap for Rails 6:

```cli
yarn add bootstrap jquery popper.js
```
In the application.css manifest file, paste:

```css
/* ...
*= require bootstrap
*/
```
For JS, paste:

```js
// config/webpack/environment.js
const { environment } = require('@rails/webpacker')
const webpack = require('webpack')

environment.plugins.append('Provide', new webpack.ProvidePlugin({
  $: 'jquery',
  jQuery: 'jquery',
  Popper: ['popper.js', 'default']
}))

module.exports = environment


// app/javascripts/packs/application.js
import 'bootstrap'
```
At this point, its just a matter of copy and pasting.


Really, the rest of this section is css. No need to review (else, go to advanced-css-course). The following will just be a couple notes that are more relevant to ruby/rails rather than actual css styling.

```erb
<%= link_to 'Articles', article_path, class: 'nav-link' %>
<!-- adds class to embedded ruby code -->

<%= link_to 'Phil Chan', "http://phil-chan.ca", class: 'nav-link' %>
<!-- link to defined url -->
```