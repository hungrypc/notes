import consumer from "./consumer"

function scroll_bottom() {
  if ($('#messages').length > 0) {
    $('#messages').scrollTop($('#messages')[0].scrollHeight)
  }
}

consumer.subscriptions.create("ChatroomChannel", {
  connected() {
    // Called when the subscription is ready for use on the server
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
    // Called when there's incoming data on the websocket for this channel
    if (data.mod_message) {
      $("#message-container").append(data.mod_message)
      scroll_bottom()
    }

    if (data.online_user) {
      console.log('user has logged in')
      $("#online-users").append(data.online_user.username)
      // console.log(data.online_user)
    }
  }
});
