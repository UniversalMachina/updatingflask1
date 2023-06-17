  $(document).ready(function(){
    $(".user-name").each(function() {
      var len = $(this).text().length;
      if (len > 10) {
        $(this).css('font-size', '0.8em'); // or whatever smaller size you want
      }
    });

    // Event handler for the status message button
    $("#status-btn").click(function() {
      // Hide the chat container
      $("#chat-container").hide();

      // Show the status messages
      $("#status-messages").show();
    });

    // Attach the click event listener to all platform-button class elements
    const platformButtons = document.querySelectorAll('.platform-button');
    platformButtons.forEach(button => {
      button.addEventListener('click', function(event) {
        event.preventDefault();  // prevent the default link click action
        fetch(event.target.href)  // make a request to the linked URL
          .then(response => response.json())  // parse the response as JSON
          .then(data => {
            document.querySelector('#chat-text').textContent = data.chat_log;  // update the chat log
            // Show the chat container
            $("#chat-container").show();
            // Hide the status messages
            $("#status-messages").hide();
          });
      });
    });
  });

$(document).ready(function() {
  $("#status-btn").click(function() {
    $.getJSON('/status', function(data) {
      // assuming you have two <p> tags to show the status
      // and they have ids "status-r" and "status-c"
      $("#status-r").text('R Status: ' + data.r);
      $("#status-c").text('C Status: ' + data.c);
    });
  });
});


$(document).ready(function() {
  var username = 'your_username';  // Replace this with the actual username

  $("#display-r-btn").click(function() {
    $.getJSON('/get_user_files', function(data) {
      $("#r-content").val(data.r);
    });
  });

  $("#display-c-btn").click(function() {
    $.getJSON('/get_user_files', function(data) {
      $("#c-content").val(data.c);
    });
  });

  $("#save-btn").click(function() {
    $.ajax({
      url: '/save_user_files',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        r: $("#r-content").val(),
        c: $("#c-content").val()
      }),
      success: function(response) {
        alert("Files saved successfully.");
      }
    });
  });
});


//var socket = io.connect('http://localhost:5000');
//
//
//socket.on('new_message', function(msg) {
//    console.log('New message:', msg);
//    // get the chat textarea and append the new message to its content
//    var chat_textarea = document.getElementById('chat-text');
//    chat_textarea.value += '\n' + msg;
//});


var currentPlatform = 'linkedin';

document.querySelector('[data-platform="linkedin"]').addEventListener('click', function() {
    document.getElementById(currentPlatform + '-chat-text').style.display = 'none';
    currentPlatform = 'linkedin';
    document.getElementById(currentPlatform + '-chat-text').style.display = 'block';
});

document.querySelector('[data-platform="ziprecruiter"]').addEventListener('click', function() {
    document.getElementById(currentPlatform + '-chat-text').style.display = 'none';
    currentPlatform = 'ziprecruiter';
    document.getElementById(currentPlatform + '-chat-text').style.display = 'block';
});

socket.on('new_message', function(data) {
    var chat_textarea = document.getElementById(data.platform + '-chat-text');
    chat_textarea.value += '\n' + data.message;
});