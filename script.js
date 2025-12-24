const startBtn = document.getElementById("startBtn");
const countdown = document.getElementById("countdown");
const wish = document.getElementById("wish");
const slideshow = document.getElementById("slideshow");
const slide = document.getElementById("slide");
const caption = document.getElementById("caption");
const music = document.getElementById("music");

let count = 10;
let index = 0;

const slides = [
  { photo: "photo1.jpg", text: "You are amazing 💖" },
  { photo: "photo2.jpg", text: "Keep smiling always 😊" },
  { photo: "photo3.jpg", text: "This year is ours ✨" }
];

startBtn.onclick = () => {
  startBtn.style.display = "none";
  music.play().catch(()=>{});
  startCountdown();
};

function startCountdown() {
  const timer = setInterval(() => {
    countdown.textContent = count;
    count--;

    if (count < 0) {
      clearInterval(timer);
      countdown.classList.add("hidden");
      wish.classList.remove("hidden");
      slideshow.classList.remove("hidden");
      startSlideshow();
      startFireworks();
      startRoses();   // 🌹 ADD HERE
    }
  }, 1000);
}

function startSlideshow() {
  slide.src = slides[0].photo;
  caption.textContent = slides[0].text;

  setInterval(() => {
    index = (index + 1) % slides.length;
    slide.style.animation = "none";
    slide.offsetHeight;
    slide.style.animation = "slideUp 1s ease forwards";
    slide.src = slides[index].photo;
    caption.textContent = slides[index].text;
  }, 5000);
}

// 🎆 Fireworks
function startFireworks() {
  const c = document.getElementById("fireworks");
  const ctx = c.getContext("2d");
  c.width = innerWidth;
  c.height = innerHeight;
  let p = [];

  function burst() {
    for (let i = 0; i < 120; i++) {
      p.push({
        x: Math.random() * c.width,
        y: Math.random() * c.height / 2,
        vx: (Math.random() - 0.5) * 6,
        vy: (Math.random() - 0.5) * 6,
        life: 100
      });
    }
  }

  (function anim() {
    ctx.clearRect(0, 0, c.width, c.height);
    p.forEach((o, i) => {
      ctx.fillStyle = "gold";
      ctx.fillRect(o.x, o.y, 3, 3);
      o.x += o.vx;
      o.y += o.vy;
      o.life--;
      if (o.life <= 0) p.splice(i, 1);
    });
    if (p.length < 200) burst();
    requestAnimationFrame(anim);
  })();
}

// 🌹 Rose Rain
function startRoses() {
  const body = document.body;

  setInterval(() => {
    const rose = document.createElement("div");
    rose.textContent = "🌹";
    rose.style.position = "absolute";
    rose.style.left = Math.random() * 100 + "vw";
    rose.style.top = "-40px";
    rose.style.fontSize = "30px";
    rose.style.animation = "fall 8s linear forwards";
    body.appendChild(rose);

    setTimeout(() => rose.remove(), 8000);
  }, 500);
}
