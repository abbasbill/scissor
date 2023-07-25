function sendDeleteRequest() {
  var form = document.getElementById("deleteForm");
  var id = form.elements["id"].value;

  // Perform the DELETE request using fetch API
  fetch("/api/shorten/" + id, {
    method: "DELETE",
  });
}
