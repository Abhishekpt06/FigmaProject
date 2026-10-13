const cols = [
  ["#2c3e55", "#4a6a8a"],
  ["#1f2f3d", "#3b5a74"],
  ["#8a5a2b", "#c58a4a"],
  ["#4a5fa8", "#6e86d6"],
  ["#243445", "#456080"],
  ["#1c2b38", "#4a6a80"]
];

const projectImages = [
  "image1.jpg",
  "image2.jpg",
  "image.jpg",
  "image4.jpg",
  "image5.jpg",
  "imahe3.jpg"
];

const g = document.getElementById("grid");

cols.forEach((c, i) => {
  const img = projectImages[i % projectImages.length];
  g.insertAdjacentHTML(
    "beforeend",
    `<article class="card">
      <div class="thumb" style="background:linear-gradient(135deg,${c[0]},${c[1]})">
        <img src="image/${img}" alt="Project preview ${i + 1}">
      </div>
      <div class="body">
        <h3>How To Make Flyer Design</h3>
        <p>Lorem Ipsum Dolor Sit Amet, Consec Adipiscing Elit Awd And Lorem Ipsum...</p>
        <div class="tags">
          ${["Typescript", "ReactJs", "NextJs", "CSS", "HTML", "MongoDB"]
            .map(t => `<span>${t}</span>`)
            .join("")}
        </div>
      </div>
    </article>`
  );
});

const R = [
  ["Great Quality!", "James Gouse", "Graphic Designer", "#555"],
  ["Amazing Work!", "Tiana Philips", "Photographer", "#2f5a4a"],
  ["Great Quality!", "Talan Westervelt", "Business Man", "#7a5a40"],
  ["Great Quality!", "Aria Novak", "Designer", "#4a4f8a"],
  ["Amazing Work!", "Leo Marsh", "Developer", "#8a4a4a"]
];

const tr = document.getElementById("track");
const dt = document.getElementById("dots");
let idx = 2;
let timer;

R.forEach((r, i) => {
  tr.insertAdjacentHTML(
    "beforeend",
    `<div class="t">
      <div class="stars">★★★★★</div>
      <h4>${r[0]}</h4>
      <p>Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Vitae Nulla Diam In Ac Dictum A Urna Viverra Morbi. Morbi Donec Amet....</p>
      <div class="who">
        <div class="av" style="background:${r[3]}">${r[1][0]}</div>
        <div>
          <b>${r[1]}</b>
          <small>${r[2]}</small>
        </div>
      </div>
    </div>`
  );

  const b = document.createElement("button");
  b.setAttribute("aria-label", "Slide " + (i + 1));
  b.onclick = () => {
    go(i);
    restart();
  };
  dt.appendChild(b);
});

function per() {
  const w = innerWidth;
  return w <= 560 ? 1 : w <= 860 ? 2 : 3;
}

function go(i) {
  const max = R.length - per();
  idx = Math.max(0, Math.min(i, R.length - 1));
  const shift = Math.min(idx, max);
  const first = tr.children[0];
  tr.style.transform = `translateX(-${shift * (first.offsetWidth + 16)}px)`;
  [...dt.children].forEach((d, k) => d.classList.toggle("on", k === idx));
}

function restart() {
  clearInterval(timer);
  timer = setInterval(() => go((idx + 1) % R.length), 3500);
}

addEventListener("resize", () => go(idx));
go(idx);
restart();

const links = [...document.querySelectorAll("nav a")];

document.getElementById("menu").onclick = () =>
  document.getElementById("nav").classList.toggle("open");

links.forEach(a =>
  a.onclick = () => document.getElementById("nav").classList.remove("open")
);

const secs = ["home", "projects", "rec", "contact"];

addEventListener(
  "scroll",
  () => {
    let cur = "home";
    secs.forEach(s => {
      if (document.getElementById(s).getBoundingClientRect().top < 140) cur = s;
    });
    links.forEach(a =>
      a.classList.toggle(
        "on",
        a.getAttribute("href") === "#" + cur ||
          (cur === "home" && a.getAttribute("href") === "#home")
      )
    );
  },
  { passive: true }
);

document.getElementById("form").onsubmit = e => {
  e.preventDefault();
  const n = document.getElementById("n");
  const m = document.getElementById("e");
  const o = document.getElementById("msg");
  const okN = n.value.trim().length > 0;
  const okE = /^\S+@\S+\.\S+$/.test(m.value);
  n.classList.toggle("bad", !okN);
  m.classList.toggle("bad", !okE);
  if (!okN || !okE) {
    o.textContent = "Enter your name and a valid email.";
    return;
  }
  o.textContent = "Message sent. Thank you!";
  e.target.reset();
};