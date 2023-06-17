$(document).ready(function(){
  // Define current platform and chatLogs
  let currentPlatform = 'linkedin';
  const chatLogs = {
    linkedin: [],
    ziprecruiter: []
  };
  const platformButtons = $('.platform-button:not(.status-button)');


  const chatLogIds = ['linkedin-chat-text', 'ziprecruiter-chat-text'];
  const socket = io.connect(location.origin);

  // Event handler for the status message button
  $("#status-btn").click(function() {
    $.getJSON('/status', function(data) {
      $("#status-r").text('R Status: ' + data.r);
      $("#status-c").text('C Status: ' + data.c);
    });
    $("#chat-container").hide();
    $("#status-messages").show();
  });

  // Handle platform button clicks
  platformButtons.on('click', function(event) {
    event.preventDefault();

    let chatLogId = $(this).attr('data-chat-log');
    let chatLogText = '#' + chatLogId;
    currentPlatform = $(this).attr('data-platform');

    // Show the chat container and hide the status messages
    $("#chat-container").show();
    $("#status-messages").hide();

    // Update chat log visibility
    chatLogIds.forEach(logId => {
      $(`#${logId}`).css('display', logId === chatLogId ? 'block' : 'none');
    });
  });

  // Handle display-r-btn and display-c-btn click
$("#display-r-btn, #display-c-btn").click(function() {
  let isR = $(this).attr('id') === 'display-r-btn';
  let element = isR ? '#r-content' : '#c-content';

  $.getJSON('/get_user_files', function(data) {
    $(element).val(isR ? data.r : data.c);
  });
});


  // Handle save-btn click
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

  // Listen to 'new_message' event from the server
  socket.on('new_message', function(data) {
    chatLogs[data.platform].push(data.message);

    let chat_textarea = $('#' + data.platform + '-chat-text');
    chat_textarea.val(chatLogs[data.platform].join('\n'));
    chat_textarea.scrollTop(chat_textarea[0].scrollHeight);
  });
});




$(document).ready(function() {
  $('.user-creation form').on('submit', function(event) {
    event.preventDefault(); // Prevent form submission and page reload

    // Serialize form data for AJAX request
    var formData = $(this).serialize();

    // Make AJAX request
    $.ajax({
      type: 'POST',
      url: '/ajax', // Update this if your form should submit somewhere else
      data: formData,
      success: function(response) {
        // Update the UI based on the response
        if (response.success) {
            var newUserHtml = `
                <div class="user-button">
                    <span class="user-name">${response.newUser}</span>
                    <div class="button-container">
                        <form method="post" style="display:inline">
                            <input type="hidden" name="action" value="switch">
                            <input type="hidden" name="username" value="${response.newUser}">
                            <input type="submit" value="Switch" class="switch-button">
                        </form>
                        <form method="post" style="display:inline">
                            <input type="hidden" name="action" value="delete">
                            <input type="hidden" name="username" value="${response.newUser}">
                            <input type="submit" value="X" class="close-button">
                        </form>
                    </div>
                </div>`;

            $('.users').append(newUserHtml);
        }
      },
      error: function(error) {
        // Handle error
        console.log(error);
      }
    });
  });
});


$(document).ready(function() {
  $('.user-button form').on('submit', function(event) {
    event.preventDefault(); // Prevent form submission and page reload

    // Serialize form data for AJAX request
    var formData = $(this).serialize();

    // Make AJAX request
    $.ajax({
      type: 'POST',
      url: '/switch_user',
      data: formData,
      success: function(response) {
        // Update the UI based on the response
        if (response.success) {
          // Show switched user (you may want to reflect this change on the UI)
          alert('Switched to user: ' + response.switchedUser);
        }
        else {
          // Show the error message
          alert(response.message);
        }
      },
      error: function(error) {
        // Handle error
        console.log(error);
      }
    });
  });
});
