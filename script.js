const startBtn = document.getElementById("startBtn");
const cd = document.getElementById("countdown");
const wish = document.getElementById("wish");
const gifts = document.getElementById("gifts");
const reveal = document.getElementById("reveal");
const photo = document.getElementById("photo");
const text = document.getElementById("text");
const music = document.getElementById("music");

const slides = [
  { photo: "photo1.jpg", text: "You are amazing 💖" },
  { photo: "photo2.jpg", text: "Keep smiling always 😊" },
  { photo: "photo3.jpg", text: "This year is ours ✨" }
];

let count = 10;

startBtn.onclick = () => {
  startBtn.style.display = "none";
  music.play().catch(()=>{});
  startCalmIntro();
};

function startCalmIntro() {
  startShapes();
  startRoses();
  setTimeout(() => {
    cd.classList.remove("hidden");
    startCountdown();
  }, 3000);
}

function startCountdown() {
  const timer = setInterval(() => {
    cd.textContent = count;
    count--;

    if (count < 0) {
      clearInterval(timer);
      cd.style.display = "none";
      wish.classList.remove("hidden");

      startFireworks();

      setTimeout(() => {
        gifts.classList.remove("hidden");
        startGiftsSequential();
      }, 2000);
    }
  }, 1000);
}

function startGiftsSequential() {
  const giftEls = document.querySelectorAll(".gift");

  function openGift(i) {
    if (i >= slides.length) {
      setTimeout(() => {
        document.getElementById("final-message").classList.remove("hidden");
      }, 1500);
      return;
    }

    const gift = giftEls[i];

    setTimeout(() => {
      gift.classList.add("open");

      photo.src = slides[i].photo;
      text.textContent = slides[i].text;
      reveal.classList.remove("hidden");
      reveal.classList.remove("hide");

      setTimeout(() => {
        reveal.classList.add("hide");
        setTimeout(() => openGift(i + 1), 1000);
      }, 3000);

    }, 800);
  }

  openGift(0);
}

// 🎆 Heart fireworks
function startFireworks() {
  const c = document.getElementById("fireworks");
  const ctx = c.getContext("2d");
  c.width = innerWidth;
  c.height = innerHeight;

  let particles = [];

  function heart(t) {
    return {
      x: 16 * Math.pow(Math.sin(t), 3),
      y: -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t))
    };
  }

  function burst() {
    for (let i = 0; i < 200; i++) {
      const t = Math.random() * Math.PI * 2;
      const h = heart(t);
      particles.push({
        x: c.width / 2 + h.x * 15,
        y: c.height / 2 + h.y * 15,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        life: 120
      });
    }
  }

  (function anim() {
    ctx.clearRect(0,0,c.width,c.height);
    particles.forEach((p,i)=>{
      ctx.fillStyle = "hotpink";
      ctx.fillRect(p.x,p.y,3,3);
      p.x += p.vx;
      p.y += p.vy;
      p.life--;
      if(p.life<=0) particles.splice(i,1);
    });
    if(particles.length < 300) burst();
    requestAnimationFrame(anim);
  })();
}

// 🌹 Roses
function startRoses() {
  const container = document.getElementById("roses");
  setInterval(()=>{
    const r=document.createElement("span");
    r.textContent="🌹";
    r.style.left=Math.random()*100+"vw";
    r.style.animationDuration=5+Math.random()*5+"s";
    container.appendChild(r);
    setTimeout(()=>r.remove(),10000);
  },500);
}

// Floating shapes
function startShapes() {
  const cont = document.getElementById("shapes");
  setInterval(()=>{
    const d=document.createElement("div");
    const size=20+Math.random()*40;
    d.style.width=d.style.height=size+"px";
    d.style.left=Math.random()*100+"vw";
    d.style.background=`hsl(${Math.random()*360},100%,60%)`;
    d.style.animationDuration=10+Math.random()*10+"s";
    cont.appendChild(d);
    setTimeout(()=>d.remove(),20000);
  },400);
}
