let boxes = document.querySelectorAll(".box");
let resetButton = document.querySelector("#rst-btn");
let newBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; // Player O starts
const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Function to reset the game
const resetGame = () => {
  turnO = true;
  enableBoxes();
  msgContainer.classList.add("hide");
};

// Function to disable all boxes after game ends
const disableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = true;
  });
};

// Function to enable all boxes when reset
const enableBoxes = () => {
  boxes.forEach((box) => {
    box.innerText = "";
    box.disabled = false;
  });
};

// Show winner message
const showWinner = (winner) => {
  msg.innerText = `Congratulations! Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

// Show draw message
const showDraw = () => {
  msg.innerText = "It's a Draw!";
  msgContainer.classList.remove("hide");
  disableBoxes();
};

// Check winner or draw
const checkWinner = () => {
  let isWinner = false;

  for (let pattern of winPatterns) {
    let pos1 = boxes[pattern[0]].innerText;
    let pos2 = boxes[pattern[1]].innerText;
    let pos3 = boxes[pattern[2]].innerText;

    if (pos1 !== "" && pos1 === pos2 && pos2 === pos3) {
      showWinner(pos1);
      isWinner = true;
      return;
    }
  }

  // Check for draw if no winner
  let filledBoxes = Array.from(boxes).every((box) => box.innerText !== "");
  if (!isWinner && filledBoxes) {
    showDraw();
  }
};

// Add click listeners to boxes
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      turnO = false;
    } else {
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;
    checkWinner();
  });
});

// Button listeners
resetButton.addEventListener("click", resetGame);
newBtn.addEventListener("click", resetGame);
