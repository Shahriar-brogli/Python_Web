
function displaySVG(fileName) {
    const contentDisplayArea = document.getElementById('content-display-area');
    contentDisplayArea.src = fileName;
}
//function openContent(page) {
  //  document.getElementById('contentFrame').data = page;
//}

function toggleSubChapters(chapterId) {
    var subChapters = document.getElementById(chapterId);
    if (subChapters.style.display === "block") {
        subChapters.style.display = "none";
    } else {
        subChapters.style.display = "block";
    }
}






// script.js
// script.js
const canvas = document.getElementById('whiteboard');
const ctx = canvas.getContext('2d');
const clearBtn = document.getElementById('clearBtn');
const eraseBtn = document.getElementById('eraseBtn');
const drawBtn = document.getElementById('drawBtn');
const colorPicker = document.getElementById('colorPicker');
const lineWidth = document.getElementById('lineWidth');
const boardColorPicker = document.getElementById('boardColorPicker');
const opacitySlider = document.getElementById('opacitySlider');
const opacityMain = document.getElementById('opacityMain');
const openWhiteboardBtn = document.getElementById('openWhiteboardBtn');
const closeBtn = document.getElementById('closeBtn');
const whiteboardContainer = document.getElementById('whiteboard-container');

let isDrawing = false;
let isErasing = false;

// Set canvas size
canvas.width = window.innerWidth * 0.8;
canvas.height = window.innerHeight * 0.8;

// Set initial brush properties
ctx.lineWidth = 5;
ctx.lineCap = 'round';
ctx.strokeStyle = '#000000';

function startDrawing(e) {
    isDrawing = true;
    draw(e);
}

function stopDrawing() {
    isDrawing = false;
    ctx.beginPath();
}

function draw(e) {
    if (!isDrawing) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function toggleEraser() {
    isErasing = !isErasing;
    if (isErasing) {
        ctx.strokeStyle = boardColorPicker.value;
        eraseBtn.textContent = 'Draw';
    } else {
        ctx.strokeStyle = colorPicker.value;
        eraseBtn.textContent = 'Erase';
    }
}

function updateBoardColor() {
    canvas.style.backgroundColor = boardColorPicker.value;
}

function updateOpacity() {
    whiteboardContainer.style.backgroundColor = `rgba(255, 255, 255, ${opacitySlider.value / 100})`;
}

function updateOpacityBoard() {
    canvas.style.backgroundColor = `rgba(255, 255, 255, ${opacityMain.value / 100})`;
}

function openWhiteboard() {
    whiteboardContainer.classList.remove('hidden');
    updateBoardColor();
    updateOpacity();
    updateOpacityBoard()
}

function closeWhiteboard() {
    whiteboardContainer.classList.add('hidden');
}

// Event listeners
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

clearBtn.addEventListener('click', clearCanvas);
eraseBtn.addEventListener('click', toggleEraser);
drawBtn.addEventListener('click', () => {
    isErasing = false;
    ctx.strokeStyle = colorPicker.value;
    eraseBtn.textContent = 'Erase';
});

colorPicker.addEventListener('input', () => {
    if (!isErasing) {
        ctx.strokeStyle = colorPicker.value;
    }
});

lineWidth.addEventListener('input', () => {
    ctx.lineWidth = lineWidth.value;
});

boardColorPicker.addEventListener('input', updateBoardColor);
opacitySlider.addEventListener('input', updateOpacity);
opacityMain.addEventListener('input', updateOpacityBoard); //Myaddopacityboard

openWhiteboardBtn.addEventListener('click', openWhiteboard);
closeBtn.addEventListener('click', closeWhiteboard);

// Resize canvas when window is resized
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerHeight * 0.8;
});







// Convert touch events to draw on the canvas
canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();  // Prevent scrolling
    const touch = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    isDrawing = true;
    ctx.beginPath();
    ctx.moveTo(x, y);
});

canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();  // Prevent scrolling
    if (!isDrawing) return;

    const touch = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
});

canvas.addEventListener('touchend', () => {
    isDrawing = false;
    ctx.beginPath();  // Reset the path
});



