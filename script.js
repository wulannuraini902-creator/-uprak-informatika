const items = [
  { emoji: "🍎", category: "buah" },
  { emoji: "🍌", category: "buah" },
  { emoji: "🥦", category: "sayur" },
  { emoji: "🥕", category: "sayur" },
  { emoji: "📱", category: "elektronik" },
  { emoji: "💻", category: "elektronik" }
];

let currentItem = null;
let score = 0;
let timeLeft = 60;
let timer = null;
let gameActive = false;

const itemElement = document.getElementById("item");
const scoreElement = document.getElementById("score");
const timeElement = document.getElementById("time");
const boxes = document.querySelectorAll(".box");

// ================= RANDOM ITEM =================
function randomItem() {
  const randomIndex = Math.floor(Math.random() * items.length);
  currentItem = items[randomIndex];
  itemElement.textContent = currentItem.emoji;

  // animasi muncul
  itemElement.style.transform = "scale(0)";
  setTimeout(() => {
    itemElement.style.transform = "scale(1)";
  }, 100);
}

// ================= START GAME =================
function startGame() {
  clearInterval(timer);

  score = 0;
  timeLeft = 60;
  gameActive = true;

  scoreElement.textContent = score;
  timeElement.textContent = timeLeft;

  randomItem();

  timer = setInterval(() => {
    timeLeft--;
    timeElement.textContent = timeLeft;

    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);
}

// ================= END GAME =================
function endGame() {
  clearInterval(timer);
  gameActive = false;

  // popup custom
  const popup = document.createElement("div");
  popup.classList.add("gameover-popup");
  popup.innerHTML = `
    <div class="popup-content">
      <h2>🎉 Game Over</h2>
      <p>Skor kamu: <strong>${score}</strong></p>
      <button onclick="this.parentElement.parentElement.remove()">Tutup</button>
    </div>
  `;

  document.body.appendChild(popup);
}

// ================= DRAG =================
itemElement.addEventListener("dragstart", (e) => {
  if (!gameActive) {
    e.preventDefault();
    return;
  }
  e.dataTransfer.setData("text/plain", currentItem.category);
});

// ================= DROP =================
boxes.forEach(box => {
  box.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  box.addEventListener("drop", (e) => {
    e.preventDefault();
    if (!gameActive) return;

    const droppedCategory = e.dataTransfer.getData("text/plain");
    const boxCategory = box.getAttribute("data-category");

    if (droppedCategory === boxCategory) {
      score += 10;
      box.style.background = "#00ffae";
    } else {
      score -= 5;
      box.style.background = "#ff4e50";
    }

    scoreElement.textContent = score;

    setTimeout(() => {
      box.style.background = "";
    }, 300);

    randomItem();
  });
});
