class ConversationsChannel < ApplicationCable::Channel
  def subscribed
    stream_from "ConversationsChannel:#{params[:conversation_id]}"
  end

  def unsubscribed
    stop_all_streams
  end
end