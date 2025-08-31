// ====== Elements ======
const entryModal = document.getElementById('entryModal');
const enterSiteBtn = document.getElementById('enterSiteBtn');

const song = document.getElementById('song');
const playSongBtn = document.getElementById('playSongBtn');
const confettiBtn = document.getElementById('confettiBtn');
const popupWishBtn = document.getElementById('popupWishBtn');
const themeToggleBtn = document.getElementById('themeToggleBtn');

const nameForm = document.getElementById('nameForm');
const friendNameInput = document.getElementById('friendName');
const personalGreeting = document.getElementById('personalGreeting');

const toastBtn = document.getElementById('toastBtn');
const surpriseBtn = document.getElementById('surpriseBtn');

const startGameBtn = document.getElementById('startGameBtn');
const resetGameBtn = document.getElementById('resetGameBtn');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const gameArea = document.getElementById('gameArea');

const typerTarget = document.getElementById('typerTarget');
const typerInput = document.getElementById('typerInput');
const typerResult = document.getElementById('typerResult');

const wishForm = document.getElementById('wishForm');
const wishInput = document.getElementById('wishInput');
const wishesList = document.getElementById('wishesList');

const wishDialog = document.getElementById('wishDialog');
const wishDialogText = document.getElementById('wishDialogText');

// ====== On Load: show modal ======
window.addEventListener('load', () => {
  entryModal.classList.remove('hidden');
  entryModal.setAttribute('aria-hidden', 'false');
});

// ====== Enter site ======
enterSiteBtn.addEventListener('click', () => {
  entryModal.classList.add('hidden');
  entryModal.setAttribute('aria-hidden', 'true');
  // gentle confetti
  burstConfetti(80);
});

// ====== Theme toggle ======
themeToggleBtn.addEventListener('click', () => {
  const isLight = document.body.classList.toggle('light');
  themeToggleBtn.setAttribute('aria-pressed', String(isLight));
});

// ====== Audio controls ======
let isPlaying = false;
playSongBtn.addEventListener('click', async () => {
  try {
    if (!isPlaying) {
      await song.play();
      isPlaying = true;
      playSongBtn.textContent = '⏸ Pause Song';
    } else {
      song.pause();
      isPlaying = false;
      playSongBtn.textContent = '▶ Play Song';
    }
  } catch (e) {
    alert('Add your song at assets/song.mp3 or interact with the page first to allow audio.');
  }
});

// ====== Confetti ======
confettiBtn.addEventListener('click', () => burstConfetti(150));

function burstConfetti(amount = 120) {
  for (let i = 0; i < amount; i++) {
    const c = document.createElement('div');
    c.className = 'confetti';
    c.style.position = 'fixed';
    c.style.top = '-10px';
    c.style.left = Math.random() * 100 + 'vw';
    c.style.width = '8px';
    c.style.height = '14px';
    c.style.background = pick(['#B51A2B','#541A2E','#FFA586','#384358','#242F49','#161E2F']);
    c.style.transform = `rotate(${Math.random()*360}deg)`;
    c.style.opacity = 0.9;
    c.style.zIndex = 999;
    c.style.borderRadius = '2px';
    c.style.pointerEvents = 'none';
    document.body.appendChild(c);

    const fall = c.animate(
      [
        { transform: `translateY(0) rotate(0deg)` },
        { transform: `translateY(${window.innerHeight+40}px) rotate(${Math.random()*720}deg)` }
      ],
      { duration: 1500 + Math.random()*1200, easing: 'cubic-bezier(.2,.7,.2,1)', fill: 'forwards' }
    );
    fall.onfinish = () => c.remove();
  }
}
function pick(arr){ return arr[Math.floor(Math.random()*arr.length)]; }

// ====== Popup Wish ======
const randomWishes = [
  "More tea dates, more inside jokes. ☕💬",
  "May your playlists stay elite & your eyeliner sharp. 🎧✨",
  "Soft mornings, loud laughs, zero stress. 🌅💖",
  "This year? You win. At everything. 🏆",
  "Protected, adored, unstoppable — that’s you. 💫"
];
popupWishBtn.addEventListener('click', () => {
  wishDialogText.textContent = pick(randomWishes);
  try { wishDialog.showModal(); } catch { alert(wishDialogText.textContent); }
});

// ====== Personalize greeting ======
nameForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = friendNameInput.value.trim();
  if (!name) return;
  personalGreeting.textContent = `HBD, ${name}! 💖`;
  burstConfetti(70);
});

// ====== Buttons in hero ======
toastBtn.addEventListener('click', () => {
  wishDialogText.textContent = "To more tea together ☕ — clink! 🥂";
  try { wishDialog.showModal(); } catch { alert(wishDialogText.textContent); }
});
surpriseBtn.addEventListener('click', () => {
  burstConfetti(120);
  pulse(gameArea, 600);
});

// ====== Balloon Pop Game ======
let gameTimer = null;
let spawnLoop = null;
let timeLeft = 30;
let score = 0;
let running = false;

startGameBtn.addEventListener('click', startGame);
resetGameBtn.addEventListener('click', resetGame);
gameArea.addEventListener('click', (e) => {
  // Clicking empty area could create a sparkle or ignore; no-op
});

function startGame(){
  if (running) return;
  running = true;
  score = 0; timeLeft = 30;
  scoreEl.textContent = score;
  timeEl.textContent = timeLeft;
  gameArea.innerHTML = '';

  spawnLoop = setInterval(spawnBalloon, 550);
  gameTimer = setInterval(() => {
    timeLeft--;
    timeEl.textContent = timeLeft;
    if (timeLeft <= 0) endGame();
  }, 1000);
}

function resetGame(){
  running = false;
  clearInterval(spawnLoop); clearInterval(gameTimer);
  spawnLoop = null; gameTimer = null;
  score = 0; timeLeft = 30;
  scoreEl.textContent = score;
  timeEl.textContent = timeLeft;
  gameArea.innerHTML = '';
}

function endGame(){
  running = false;
  clearInterval(spawnLoop); clearInterval(gameTimer);
  spawnLoop = null; gameTimer = null;
  setTimeout(() => {
    wishDialogText.innerHTML = `Time! You scored <strong>${score}</strong> 🎯<br/>HBD BBG — you popped that.`;
    try { wishDialog.showModal(); } catch { alert(`Score: ${score}`); }
  }, 100);
}

function spawnBalloon(){
  if (!running) return;
  const b = document.createElement('div');
  b.className = 'balloon';
  const colors = ['#FFA586','#B51A2B','#541A2E','#384358','#242F49','#161E2F'];
  b.style.background = pick(colors);

  const size = 36 + Math.random()*26;
  b.style.width = size + 'px';
  b.style.height = size * 1.25 + 'px';
  const left = Math.random()* (gameArea.clientWidth - size);
  b.style.left = left + 'px';

  // animation duration based on size (bigger -> slower)
  const dur = 3000 + Math.random()*2000 + (size*8);
  b.style.animationDuration = dur + 'ms';

  b.addEventListener('click', (e) => {
    e.stopPropagation();
    score++;
    scoreEl.textContent = score;
    // pop animation
    b.animate([{ transform: 'scale(1)', opacity: 1 }, { transform: 'scale(1.3)', opacity: 0 }], { duration: 120, easing: 'ease-out' }).onfinish = () => b.remove();
  });

  // remove if finished floating
  setTimeout(() => b.remove(), dur + 100);

  gameArea.appendChild(b);
}

// ====== Type-the-Wish Mini Game ======
typerInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    const input = typerInput.value.trim();
    const target = typerTarget.textContent.trim();
    if (!input) return;
    if (input.toLowerCase() === target.toLowerCase()) {
      typerResult.textContent = 'Perfect! Your wish is delivered 🎯';
      burstConfetti(60);
    } else {
      typerResult.textContent = 'Close! Try again 🫶';
      pulse(typerInput, 400);
    }
  }
});

// ====== Wishes Board (client-side only) ======
wishForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = wishInput.value.trim();
  if (!text) return;
  const li = document.createElement('li');
  li.textContent = text;
  wishesList.prepend(li);
  wishInput.value = '';
});

// ====== Micro helper ======
function pulse(el, ms=400){
  el.animate(
    [{ transform:'scale(1)' }, { transform:'scale(1.03)' }, { transform:'scale(1)' }],
    { duration: ms, easing:'ease-in-out' }
  );
}
