class ChatroomController < ApplicationController
  before_action :require_user 

  def index
    @message = Message.new
    @messages = Message.custom_display
    ActionCable.server.broadcast "chatroom_channel", online_user: current_user
  end

  private

  def user_render(user)
    render(partial: 'sessions/onlineUsers', locals: { user: user })
  end
end
