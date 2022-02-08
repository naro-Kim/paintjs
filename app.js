const canvas = document.getElementById("jsCanvas");
const colors = document.getElementsByClassName("jsColor");
const ctx = canvas.getContext("2d");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const reset = document.getElementById("jsReset");
const save = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";

setCanvas();

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 1;

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

let painting = false;
let filling = false;

function setCanvas() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.height, canvas.width);
}

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

//colors control

function handleColor(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
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

function handleCanvasClick(e) {
  if (filling) {
    ctx.fillRect(0, 0, canvas.height, canvas.width);
  }
}

function handleMode(e) {
  if (filling === true) {
    filling = false;
    mode.innerText = "DRAW";
  } else {
    filling = true;
    mode.innerText = "FILL";
  }
}

function handleCM(event) {
  event.preventDefault();
}

function handleSave(event) {
  const image = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = image;
  link.download = "image.png";
  link.click();
  console.log(link);
}

if (mode) {
  mode.addEventListener("click", handleMode);
}

if (reset) {
  reset.addEventListener("click", setCanvas);
}

if (save) {
  save.addEventListener("click", handleSave);
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}
