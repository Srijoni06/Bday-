window.onload = function() {
  // Background Music Fix
  const bgMusic = document.getElementById("bg-music");
  function playMusic() {
    bgMusic.play().catch(()=>{});
    document.removeEventListener("click", playMusic);
    document.removeEventListener("keydown", playMusic);
  }
  document.addEventListener("click", playMusic);
  document.addEventListener("keydown", playMusic);

  // Popup
  let popup = document.getElementById("popup");
  let span = document.getElementsByClassName("close")[0];
  setTimeout(() => popup.classList.add("show"), 2000);
  span.onclick = function() { popup.classList.remove("show"); setTimeout(()=>popup.style.display="none",500); };
  document.addEventListener("keydown", e => { if(e.key==="Enter"){ popup.classList.remove("show"); setTimeout(()=>popup.style.display="none",500); } });

  // Wizard Game
  const canvas = document.getElementById("wizardGame");
  const ctx = canvas.getContext("2d");
  let wizard = { x:270,y:350,width:60,height:40,color:"#7f00ff" }, stars=[], score=0;
  function drawWizard(){ ctx.fillStyle=wizard.color; ctx.fillRect(wizard.x,wizard.y,wizard.width,wizard.height); }
  function drawStars(){ ctx.fillStyle="#f5c518"; stars.forEach(s=>ctx.fillRect(s.x,s.y,15,15)); }
  function updateStars(){ stars.forEach(s=>s.y+=2); stars=stars.filter(s=>s.y<canvas.height); }
  function checkCollision(){ stars.forEach((s,i)=>{ if(s.x<wizard.x+wizard.width&&s.x+15>wizard.x&&s.y<wizard.y+wizard.height&&s.y+15>wizard.y){ stars.splice(i,1); score++; } }); }
  function drawScore(){ ctx.fillStyle="#fff"; ctx.font="16px Arial"; ctx.fillText("Score: "+score,10,20); }
  function gameLoop(){ ctx.clearRect(0,0,canvas.width,canvas.height); drawWizard(); drawStars(); drawScore(); updateStars(); checkCollision(); requestAnimationFrame(gameLoop); }
  setInterval(()=>stars.push({ x:Math.random()*(canvas.width-15), y:0 }), 1500);
  document.addEventListener("keydown", e=>{ if(e.key==="ArrowLeft"&&wizard.x>0)wizard.x-=20; if(e.key==="ArrowRight"&&wizard.x+wizard.width<canvas.width)wizard.x+=20; });
  gameLoop();

  // Background Canvas for animated stars & asteroids
  const bgCanvas = document.getElementById("backgroundCanvas");
  const bgCtx = bgCanvas.getContext("2d");
  bgCanvas.width = window.innerWidth; bgCanvas.height = window.innerHeight;
  let starsBG=[], asteroids=[];
  for(let i=0;i<150;i++) starsBG.push({x:Math.random()*bgCanvas.width, y:Math.random()*bgCanvas.height, size:Math.random()*2, speed:Math.random()*0.5+0.1});
  function createAsteroid(){ asteroids.push({ x: Math.random()*bgCanvas.width, y:0, size:Math.random()*4+2, speed:Math.random()*2+1 }); }
  setInterval(createAsteroid, 500);
  function drawBG(){
    bgCtx.fillStyle="#0d0d0d"; bgCtx.fillRect(0,0,bgCanvas.width,bgCanvas.height);
    bgCtx.fillStyle="#fff";
    starsBG.forEach(s=>{ bgCtx.globalAlpha=Math.random(); bgCtx.fillRect(s.x,s.y,s.size,s.size); s.y+=s.speed; if(s.y>bgCanvas.height)s.y=0; });
    bgCtx.globalAlpha=1;
    bgCtx.fillStyle="#888";
    asteroids.forEach((a,i)=>{ bgCtx.beginPath(); bgCtx.arc(a.x,a.y,a.size,0,Math.PI*2); bgCtx.fill(); a.y+=a.speed; if(a.y>bgCanvas.height)asteroids.splice(i,1); });
    requestAnimationFrame(drawBG);
  }
  drawBG();

  // Hats floating
  const hatsContainer = document.querySelector(".hats");
  function createHat(){
    const hat = document.createElement("div");
    hat.classList.add("hat");
    hat.textContent="🎩";
    hat.style.left=Math.random()*window.innerWidth+"px";
    hat.style.fontSize=(Math.random()*1.5+1.5)+"rem";
    hat.style.animationDuration=(4+Math.random()*4)+"s";
    hatsContainer.appendChild(hat);
    setTimeout(()=>hat.remove(), parseFloat(hat.style.animationDuration)*1000);
  }
  setInterval(createHat, 600);
};
