async function deleteItem(urlId) {
  // Perform the DELETE request using fetch API
  await fetch("/api/shorten/" + urlId, {
    method: "DELETE",
  });
};