const startBtn = document.getElementById("startBtn");
const cd = document.getElementById("countdown");
const wish = document.getElementById("wish");
const gifts = document.getElementById("gifts");
const reveal = document.getElementById("reveal");
const photo = document.getElementById("photo");
const text = document.getElementById("text");
const music = document.getElementById("music");
const finalMessage = document.getElementById("final-message");

const slides = [
  { photo: "photo1.jpg", text: "You are amazing 💖" },
  { photo: "photo2.jpg", text: "Keep smiling always 😊" },
  { photo: "photo3.jpg", text: "This year is yours ✨" }
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
    if (i >= slides.length) return;

    const gift = giftEls[i];

    setTimeout(() => {
      gift.classList.add("open");

      photo.src = slides[i].photo;
      text.textContent = slides[i].text;
      reveal.classList.remove("hidden");
      reveal.classList.remove("hide");

      setTimeout(() => {
        reveal.classList.add("hide");

        if (i === slides.length - 1) {
          // After 3rd gift
          setTimeout(() => {
            finalMessage.classList.remove("hidden");
          }, 1000);
        } else {
          setTimeout(() => openGift(i + 1), 1000);
        }

      }, 3000);

    }, 800);
  }

  openGift(0);
}

// ❤️ Static heart
function startFireworks() {
  const c = document.getElementById("fireworks");
  const ctx = c.getContext("2d");
  c.width = innerWidth;
  c.height = innerHeight;

  ctx.clearRect(0,0,c.width,c.height);

  function heart(t) {
    return {
      x: 16 * Math.pow(Math.sin(t), 3),
      y: -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t))
    };
  }

  ctx.beginPath();
  for (let t = 0; t <= Math.PI * 2; t += 0.01) {
    const h = heart(t);
    const x = c.width / 2 + h.x * 15;
    const y = c.height / 2 + h.y * 15;
    if (t === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.strokeStyle = "hotpink";
  ctx.lineWidth = 3;
  ctx.stroke();
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
