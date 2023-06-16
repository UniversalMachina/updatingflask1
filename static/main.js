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
    $(".user-action-form").submit(function(e) {
        e.preventDefault();  // Prevent the default form submission action

        var form = $(this);
        var action = form.data('action');  // Get the action type
        var formData = form.serialize();  // Serialize the form data

        $.ajax({
            type: 'POST',
            url: '/',
            data: formData,
            success: function(response) {
                // Handle the response from the server
                // Update the page content based on the response
                // Supposing response is something like {users: [...], current_user: 'user', message: '...'}

                // Update user list
                let userContainer = $(".user-container");
                userContainer.empty();  // Clear the current list
                response.users.forEach(function(user) {
                    // Create new user button for each user and append to the container
                    let userButton = `<div class="user-button">${user}</div>`;
                    userContainer.append(userButton);
                });

                // Update current user display
                $(".current-user-title").text('Current User: ' + response.current_user);

                // Show a message about the action
                alert(response.message);
            }
        });
    });
});
