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
  { photo: "photo3.jpg", text: "This year is yours ✨" }
];

let count = 10;

startBtn.onclick = () => {
  startBtn.style.display = "none";
  cd.classList.remove("hidden");
  music.play().catch(()=>{});
  startCountdown();
};

function startCountdown() {
  const timer = setInterval(() => {
    cd.textContent = count;
    count--;

    if (count < 0) {
      clearInterval(timer);
      cd.style.display = "none";
      wish.classList.remove("hidden");
      gifts.classList.remove("hidden");

      startFireworks();
      startRoses();
      startShapes();
      startGiftsSequential();
    }
  }, 1000);
}

function startGiftsSequential() {
  const giftEls = document.querySelectorAll(".gift");

  function openGift(i) {
    if (i >= slides.length) return;

    const gift = giftEls[i];
    gift.style.display = "block";

    setTimeout(() => {
      gift.classList.add("open");

      photo.src = slides[i].photo;
      text.textContent = slides[i].text;
      reveal.classList.remove("hidden");
      reveal.classList.remove("hide");

      setTimeout(() => {
        reveal.classList.add("hide");

        setTimeout(() => {
          openGift(i + 1);
        }, 1000);

      }, 3000);
    }, 800);
  }

  openGift(0);
}

// 🎆 Fireworks
function startFireworks() {
  const c = document.getElementById("fireworks");
  const ctx = c.getContext("2d");
  c.width = innerWidth;
  c.height = innerHeight;
  let p=[];
  function burst(){for(let i=0;i<120;i++)p.push({x:Math.random()*c.width,y:Math.random()*c.height/2,vx:(Math.random()-0.5)*6,vy:(Math.random()-0.5)*6,l:100});}
  (function anim(){
    ctx.clearRect(0,0,c.width,c.height);
    p.forEach((o,i)=>{ctx.fillStyle="gold";ctx.fillRect(o.x,o.y,3,3);o.x+=o.vx;o.y+=o.vy;o.l--;if(o.l<=0)p.splice(i,1);});
    if(p.length<200) burst();
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

// 🔵🟣🟢 Floating shapes
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

