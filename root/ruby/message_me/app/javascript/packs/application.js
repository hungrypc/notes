// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

require("@rails/ujs").start()
import('turbolinks').then(t => {
  console.log('start')
  t.start()
})
require("@rails/activestorage").start()
require("channels")
// require("jquery")
import('jquery')
import('semantic-ui-sass')
// require("semantic-ui-sass")

// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)

// import $ from 'jquery';
// window.jQuery = $;
// window.$ = $;

function scroll_bottom() {
  if ($('#messages').length > 0) {
    $('#messages').scrollTop($('#messages')[0].scrollHeight)
  }
}

function submitMessage() {
  $('#message_body').on('keydown', function(e) {
    if (e.keyCode == 13) {
      $('button').click()
      $('#message_body').val("")
    }
  })
}

$(document).ready(function () {
  //   console.log('ready')

  scroll_bottom();
  submitMessage();
  
  $(document).on('turbolinks:load', function () {
    console.log('hit')
    $('.ui.dropdown')
      .dropdown()
    $('.message .close')
      .on('click', function () {
        $(this)
          .closest('.message')
          .transition('fade')
          ;
      });
  })
  $('.close')
    .on('click', function () {
      console.log('close')
      // setTimeout(() => {
      $('.message').hide()
      // }, 1000)
    });
})
