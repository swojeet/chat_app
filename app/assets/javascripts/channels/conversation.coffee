App.conversation = App.cable.subscriptions.create("ConversationChannel",
  connected: ->
    # Called when the subscription is ready for use on the server

  disconnected: ->
    # Called when the subscription has been terminated by the server

  received: (data) ->
    # Called when there's incoming data on the websocket for this channel
    console.log(data['message'])
  speak: ->
    @perform 'speak', message: message
)
$(document).on('submit','.new_message', (e) ->
  e.preventDefault()
  values = $(this).serializeArray()
  App.conversation.speak values
  $(this).trigger 'reset'
  return
