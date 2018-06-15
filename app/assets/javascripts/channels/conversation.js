// App.conversation = App.cable.subscriptions.create("ConversationChannel",
//   connected: ->
//     # Called when the subscription is ready for use on the server
//
//   disconnected: ->
//     # Called when the subscription has been terminated by the server
//
//   received: (data) ->
//     # Called when there's incoming data on the websocket for this channel
//     console.log(data['message'])
//   speak: ->
//     @perform 'speak', message: message
// )
//
// $(document).on('submit','.new_message', (e) ->
//   e.preventDefault()
//   values = $(this).serializeArray()
//   App.conversation.speak values
//   $(this).trigger 'reset'
//   return
// )

App.conversation = App.cable.subscriptions.create("ConversationChannel", {
  connected: function() {},
  disconnected: function() {},
  received: function(data) {
    console.log(data["message"]);
    // alert("inside received");
    var conversation = $("#conversations-list").find(
      "[data-conversation-id= '" + data["conversation_id"] + "']"
    );
    conversation
      .find(".messages-list")
      .find("ul")
      .append(data["message"]);

    var messages_list = conversation.find(".messages-list");
    var height = messages_list[0].scrollHeight;
    messages_list.scrollTop(height);
  },
  speak: function(message) {
    // alert("hi");
    return this.perform("speak", {
      message: message
    });
  }
});

$(document).on("submit", ".new_message", function(e) {
  e.preventDefault();
  var values = $(this).serializeArray();
  App.conversation.speak(values);
  $(this).trigger("reset");
});
