const BLACK = '#000000'
const WHITE = '#ffffff'
const COLOUR_MODE = 'colour'
const RANDOM_MODE = 'random'
const HOLD_INPUT = 'hold'
const HOVER_INPUT = 'hover'

const colourPick = document.getElementById('colourpick');
const colourBtn = document.getElementById('colour');
const randomBtn = document.getElementById('random');
const eraserBtn = document.getElementById('eraser');
const clearBtn = document.getElementById('clear');
const grid = document.getElementById('grid');
const holdBtn = document.getElementById('hold');
const hoverBtn = document.getElementById('hover');
const toggleBtn = document.getElementById('toggle');
const pixelSld = document.getElementById('pixel');
const sizeOutput = document.getElementById('grid-size');

let colour = BLACK
let mode = COLOUR_MODE
let input = HOLD_INPUT
let isDrag = false
let gridLines = true
let size = pixelSld.value

const createPixel = () => {
    const pixel = document.createElement('div');
    pixel.addEventListener('mousedown', () => {isDrag = true})
    pixel.addEventListener('mouseup', () => {isDrag = false})
    pixel.addEventListener('mouseover', fillColour)
    if (gridLines == true) {
        pixel.classList.add('pixel');
    }
    grid.appendChild(pixel);
};

const setGrid = () => {
    grid.innerHTML = '';
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (i = 0; i < size; i++) {
        for (j = 0; j < size; j++) {
            createPixel();
        }
    }
};

const fillColour = (e) => {
    if (mode == COLOUR_MODE) {
        if (input == HOLD_INPUT && isDrag == true) {
            e.target.style.backgroundColor = colour;
        }  else if (input == HOVER_INPUT) {
            e.target.style.backgroundColor = colour;
        }
    } else if (mode == RANDOM_MODE) {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        if (input == HOLD_INPUT && isDrag == true) {
            e.target.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
        }  else if (input == HOVER_INPUT) {
            e.target.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
        }
    }
};

const setColour = (rgb) => {
    colour = rgb;
};

const setMode = (button) => {
    mode = button;
};

const setInput = (button) => {
    input = button
}

const setSize = () => {
    size = pixelSld.value;
    sizeOutput.innerHTML = `${size} x ${size}`;
};

const init = () => {
    setSize();
    setGrid();
};

colourPick.oninput = () => {
    setColour(colourPick.value);
};

colourBtn.onclick = () => {
    setMode(COLOUR_MODE);
    setColour(colourPick.value);
}

randomBtn.onclick = () => {
    setMode(RANDOM_MODE);
};

eraserBtn.onclick = () => {
    setMode(COLOUR_MODE);
    setColour(WHITE);
};

holdBtn.onclick = () => {
    setInput(HOLD_INPUT);
};

hoverBtn.onclick = () => {
    setInput(HOVER_INPUT);
};

toggleBtn.onclick = () => {
    children = grid.children;
    Array.from(children).forEach(pixel => {
        if (gridLines) {
            pixel.classList.remove('pixel');
        } else {
            pixel.classList.add('pixel');
        }
    });
    gridLines = !gridLines;
}

clearBtn.onclick = setGrid;
pixelSld.oninput = setSize;
pixelSld.onmouseup = setGrid;




