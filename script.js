// Popup behavior
window.onload = function() {
  let popup = document.getElementById("popup");
  let span = document.getElementsByClassName("close")[0];

  // Show popup after 2s
  setTimeout(() => {
    popup.style.display = "block";
  }, 2000);

  // Close popup
  span.onclick = function() {
    popup.style.display = "none";
  };

  // Close popup on Enter key
  document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      popup.style.display = "none";
    }
  });
};
