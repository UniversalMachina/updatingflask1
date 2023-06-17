//$(document).ready(function(){
//  // Define current platform
//  var currentPlatform = 'linkedin';
//
//  // Event handler for the status message button
//  $("#status-btn").click(function() {
//    // Hide the chat container
//    $("#chat-container").hide();
//    // Show the status messages
//    $("#status-messages").show();
//  });
//
//  // Attach the click event listener to all platform-button class elements
//  const platformButtons = document.querySelectorAll('.platform-button');
//  platformButtons.forEach(button => {
//    button.addEventListener('click', function(event) {
//      event.preventDefault();  // prevent the default link click action
//      fetch(event.target.href)  // make a request to the linked URL
//        .then(response => response.json())  // parse the response as JSON
//        .then(data => {
//          // get the id of the chat log to update from the data-chat-log attribute
//          const chatLogId = event.target.getAttribute('data-chat-log');
//          // update the appropriate chat log
//          document.querySelector('#' + chatLogId).textContent = data.chat_log;
//
//          // Show the chat container
//          $("#chat-container").show();
//          // Hide the status messages
//          $("#status-messages").hide();
//
//          // chat logs list
//          const chatLogs = ['linkedin-chat-text', 'ziprecruiter-chat-text'];
//
//          // loop through chat logs and toggle visibility
//          chatLogs.forEach(logId => {
//            if (logId === chatLogId) {
//              // If this is the active chat log, set display to block
//              document.querySelector('#' + logId).style.display = 'block';
//            } else {
//              // Otherwise, set display to none
//              document.querySelector('#' + logId).style.display = 'none';
//            }
//          });
//        });
//
//      currentPlatform = event.target.getAttribute('data-platform');
//    });
//  });
//
//  // Handle status-btn click
//  $("#status-btn").click(function() {
//    $.getJSON('/status', function(data) {
//      $("#status-r").text('R Status: ' + data.r);
//      $("#status-c").text('C Status: ' + data.c);
//    });
//  });
//
//  // Handle display-r-btn and display-c-btn click
//  $("#display-r-btn").click(function() {
//    $.getJSON('/get_user_files', function(data) {
//      $("#r-content").val(data.r);
//    });
//  });
//
//  $("#display-c-btn").click(function() {
//    $.getJSON('/get_user_files', function(data) {
//      $("#c-content").val(data.c);
//    });
//  });
//
//  // Handle save-btn click
//  $("#save-btn").click(function() {
//    $.ajax({
//      url: '/save_user_files',
//      type: 'POST',
//      contentType: 'application/json',
//      data: JSON.stringify({
//        r: $("#r-content").val(),
//        c: $("#c-content").val()
//      }),
//      success: function(response) {
//        alert("Files saved successfully.");
//      }
//    });
//  });
//
//  // Listen to 'new_message' event from the server
//  socket.on('new_message', function(data) {
//    var chat_textarea = document.getElementById(data.platform + '-chat-text');
//    chat_textarea.value += '\n' + data.message;
//  });
//});












//$(document).ready(function(){
//  // Define current platform
//  var currentPlatform = 'linkedin';
//
//  // Attach the click event listener to all platform-button class elements
//  const platformButtons = document.querySelectorAll('.platform-button');
//  platformButtons.forEach(button => {
//    button.addEventListener('click', function(event) {
//      event.preventDefault();  // prevent the default link click action
//      fetch(event.target.href)  // make a request to the linked URL
//        .then(response => response.json())  // parse the response as JSON
//        .then(data => {
//          // get the id of the chat log to update from the data-chat-log attribute
//          const chatLogId = event.target.getAttribute('data-chat-log');
//          // update the appropriate chat log
//          document.querySelector('#' + chatLogId).textContent = data.chat_log;
//
//          // Show the chat container
//          $("#chat-container").show();
//
//          // chat logs list
//          const chatLogs = ['linkedin-chat-text', 'ziprecruiter-chat-text'];
//
//          // loop through chat logs and toggle visibility
//          chatLogs.forEach(logId => {
//            if (logId === chatLogId) {
//              // If this is the active chat log, set display to block
//              document.querySelector('#' + logId).style.display = 'block';
//            } else {
//              // Otherwise, set display to none
//              document.querySelector('#' + logId).style.display = 'none';
//            }
//          });
//        });
//
//      currentPlatform = event.target.getAttribute('data-platform');
//    });
//  });
//
//  // Listen to 'new_message' event from the server
//// Listen to 'new_message' event from the server
//socket.on('new_message', function(data) {
//  var chat_textarea = document.getElementById(data.platform + '-chat-text');
//  chat_textarea.value += '\n' + data.message;
//
//  // Auto scroll to bottom when new message is received
//  chat_textarea.scrollTop = chat_textarea.scrollHeight;
//
//  // Call click event to refresh chat log content
//  document.querySelector(`a[data-platform="${data.platform}"]`).click();
//});
//
//});





$(document).ready(function(){
  // Define current platform
  var currentPlatform = 'linkedin';

  // Define chatLogs object
  var chatLogs = {
    linkedin: [],
    ziprecruiter: []
  }

  // Attach the click event listener to all platform-button class elements
  const platformButtons = document.querySelectorAll('.platform-button');
  platformButtons.forEach(button => {
    button.addEventListener('click', function(event) {
      event.preventDefault();  // prevent the default link click action

      // get the id of the chat log to update from the data-chat-log attribute
      const chatLogId = event.target.getAttribute('data-chat-log');

      // update the appropriate chat log
      document.querySelector('#' + chatLogId).value = chatLogs[event.target.getAttribute('data-platform')].join('\n');

      // Show the chat container
      $("#chat-container").show();

      // chat logs list
      const chatLogIds = ['linkedin-chat-text', 'ziprecruiter-chat-text'];

      // loop through chat logs and toggle visibility
      chatLogIds.forEach(logId => {
        if (logId === chatLogId) {
          // If this is the active chat log, set display to block
          document.querySelector('#' + logId).style.display = 'block';
        } else {
          // Otherwise, set display to none
          document.querySelector('#' + logId).style.display = 'none';
        }
      });

      currentPlatform = event.target.getAttribute('data-platform');
    });
  });

  // Listen to 'new_message' event from the server
  var socket = io.connect(location.origin);
  socket.on('new_message', function(data) {
    console.log('Received new_message event:', data);

    chatLogs[data.platform].push(data.message);

    var chat_textarea = document.getElementById(data.platform + '-chat-text');
    chat_textarea.value = chatLogs[data.platform].join('\n');
    chat_textarea.scrollTop = chat_textarea.scrollHeight;
  });
});
