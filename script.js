// Popup behavior
window.onload = function() {
  let popup = document.getElementById("popup");
  let span = document.getElementsByClassName("close")[0];

  // Show popup after 2s
  setTimeout(() => popup.classList.add("show"), 2000);

  // Close popup
  span.onclick = function() {
    popup.classList.remove("show");
    setTimeout(() => popup.style.display = "none", 500);
  };
  document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      popup.classList.remove("show");
      setTimeout(() => popup.style.display = "none", 500);
    }
  });

  // Wizard Game
  const canvas = document.getElementById("wizardGame");
  const ctx = canvas.getContext("2d");

  let wizard = { x: 270, y: 350, width: 60, height: 40, color: "#7f00ff" };
  let stars = [];
  let score = 0;

  function drawWizard() {
    ctx.fillStyle = wizard.color;
    ctx.fillRect(wizard.x, wizard.y, wizard.width, wizard.height);
  }

  function drawStars() {
    ctx.fillStyle = "#f5c518";
    stars.forEach(s => ctx.fillRect(s.x, s.y, 15, 15));
  }

  function updateStars() {
    stars.forEach(s => s.y += 2);
    stars = stars.filter(s => s.y < canvas.height);
  }

  function checkCollision() {
    stars.forEach((s, i) => {
      if (s.x < wizard.x + wizard.width &&
          s.x + 15 > wizard.x &&
          s.y < wizard.y + wizard.height &&
          s.y + 15 > wizard.y) {
        stars.splice(i, 1);
        score++;
      }
    });
  }

  function drawScore() {
    ctx.fillStyle = "#fff";
    ctx.font = "16px Arial";
    ctx.fillText("Score: " + score, 10, 20);
  }

  function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawWizard();
    drawStars();
    drawScore();
    updateStars();
    checkCollision();
    requestAnimationFrame(gameLoop);
  }

  // Spawn stars randomly
  setInterval(() => {
    let x = Math.random() * (canvas.width - 15);
    stars.push({ x: x, y: 0 });
  }, 1500);

  // Move wizard
  document.addEventListener("keydown", e => {
    if (e.key === "ArrowLeft" && wizard.x > 0) wizard.x -= 20;
    if (e.key === "ArrowRight" && wizard.x + wizard.width < canvas.width) wizard.x += 20;
  });

  gameLoop();
};
