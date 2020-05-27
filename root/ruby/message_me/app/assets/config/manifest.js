//= link_tree ../images
//= link_directory ../stylesheets .css
//= require jquery
//= require semantic-ui
//= require rails-ujs
//= require activestorage
//= require turbolinks
//= require_self
//= require_tree 

$(document).on('turbolinks:load', function() {
  console.log('hit')
  $('.ui.dropdown')
  .dropdown()
})