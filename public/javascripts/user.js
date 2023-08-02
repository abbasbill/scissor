async function sendDeleteRequest() {
  var form = document.getElementById("deleteForm");
  var id = form.elements["id"].value;

  // Perform the DELETE request using fetch API
   await fetch("/api/shorten/" + id, {
    method: "DELETE",
  })
  };

 const button = document.getElementById("deleteButton");
 // Click Event Listener
    button.addEventListener('click', function() {
      sendDeleteRequest();
    });

    // Touch Event Listeners
    button.addEventListener('touchstart', function(event) {
      event.preventDefault();
      sendDeleteRequest();
    });

    button.addEventListener('touchend', function(event) {
      event.preventDefault();
      sendDeleteRequest();
    });