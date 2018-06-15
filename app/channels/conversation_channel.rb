class ConversationChannel < ApplicationCable::Channel
  def subscribed
    stream_from  "conversations-#{current_user.id}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
    stop_all_streams
  end

  def speak(data)
    # binding.pry
    message_params = data['message'].each_with_object({}) do |el, hash|
      hash[el.values.first] = el.values.last
    end

    Message.create(message_params)

    # ActionCable.server.broadcast(
    #   "conversations-#{current_user.id}",
    #   message: message_params
    # )
  end
end
