const canvas = document.getElementById("jsCanvas");
const colors = document.getElementsByClassName("jsColor");
const ctx = canvas.getContext("2d");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const reset = document.getElementById("jsReset");

ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 1;

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

let painting = false;
let filling = false;

function startPainting() {
  painting = true;
}

function stopPainting(event) {
  painting = false;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
}

//colors control

function handleColor(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
}

Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColor)
);

//range controller

function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

if (range) {
  range.addEventListener("input", handleRangeChange);
}

//mode Change Controller

function handleMode(e) {
  if (filling === true) {
    filling = false;
    mode.innerText = "FILL";
  } else {
    filling = true;
    mode.innerText = "DRAW";
  }
}

if (mode) {
  mode.addEventListener("click", handleMode);
}
