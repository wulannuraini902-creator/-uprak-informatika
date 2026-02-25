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
let timer;

const itemElement = document.getElementById("item");
const scoreElement = document.getElementById("score");
const timeElement = document.getElementById("time");
const boxes = document.querySelectorAll(".box");

function randomItem() {
  const randomIndex = Math.floor(Math.random() * items.length);
  currentItem = items[randomIndex];
  itemElement.textContent = currentItem.emoji;
  itemElement.style.top = "0px";
}

function startGame() {
  score = 0;
  timeLeft = 60;
  scoreElement.textContent = score;
  timeElement.textContent = timeLeft;

  randomItem();

  timer = setInterval(() => {
    timeLeft--;
    timeElement.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timer);
      alert("Game Over! Skor kamu: " + score);
    }
  }, 1000);
}

itemElement.addEventListener("dragstart", (e) => {
  e.dataTransfer.setData("text/plain", currentItem.category);
});

boxes.forEach(box => {
  box.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  box.addEventListener("drop", (e) => {
    e.preventDefault();
    const droppedCategory = e.dataTransfer.getData("text/plain");
    const boxCategory = box.getAttribute("data-category");

    if (droppedCategory === boxCategory) {
      score += 10;
    } else {
      score -= 5;
    }

    scoreElement.textContent = score;
    randomItem();
  });
});
