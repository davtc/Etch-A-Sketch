// Global Constants
const BLACK = '#000000';
const WHITE = '#ffffff';
const COLOUR_MODE = 'colour';
const RANDOM_MODE = 'random';
const ERASER_MODE = 'eraser';
const HOLD_INPUT = 'hold';
const HOVER_INPUT = 'hover';

// Global HTML elements
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

// Initialise global variables
let colour = BLACK;
let mode = COLOUR_MODE;
let input = HOLD_INPUT;
let isDrag = false;
let gridLines = true;
let size = pixelSld.value;

// Create a pixel, add it to the grid and add mouse event listerners.
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

// Create a grid based on the selected grid size.
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

// Fill a pixel with colour based on the drawing mode and input.
const fillColour = (e) => {
    if (mode == COLOUR_MODE || mode == ERASER_MODE) {
        if (input == HOLD_INPUT && isDrag == true) {
            e.target.style.backgroundColor = colour;
        }  else if (input == HOVER_INPUT) {
            e.target.style.backgroundColor = colour;
        }
    } else if (mode == RANDOM_MODE) {
        const randomColor = Math.floor(Math.random()*16777215).toString(16);
        if (input == HOLD_INPUT && isDrag == true) {
            e.target.style.backgroundColor = `#${randomColor}`;
        }  else if (input == HOVER_INPUT) {
            e.target.style.backgroundColor = `#${randomColor}`;
        }
    }
};

// Set the current colour of the pen.
const setColour = (rgb) => {
    colour = rgb;
};

// Set the drawing mode between colour, random, and eraser. 
// Colour: Draw with the chosen colour.
// Random: Draw with a random colour that changes after every drawn pixel.
// Eraser: Draw with white to "erase" other colours.
const setMode = (button, newMode) => {
    if (mode == COLOUR_MODE) {
        colourBtn.classList.remove('active');
    } else if (mode == RANDOM_MODE) {
        randomBtn.classList.remove('active');
    } else if (mode == ERASER_MODE){
        eraserBtn.classList.remove('active');
    }
    mode = newMode;
    button.classList.add('active');
};

// Set the drawing input between hold and hover.
// Hold: Hold down the left mouse button over the pixels to draw.
// Hover: Hover over the pixels to draw.
const setInput = (button, newInput) => {
    if (input == HOLD_INPUT) {
        holdBtn.classList.remove('active');
    } else {
        hoverBtn.classList.remove('active');
    }
    input = newInput
    button.classList.add('active');
};

// Set the size of the grid and display the grid size in HTML.
const setSize = () => {
    size = pixelSld.value;
    sizeOutput.innerHTML = `${size} x ${size}`;
};

// Flash whenever a button is clicked.
const flashButton = async (button) => {
    button.classList.add('active');
    await new Promise(resolve => setTimeout(resolve, 100));
    button.classList.remove('active');
};

// Initialise the web pages.
const init = () => {
    setSize();
    setGrid();
    colourBtn.classList.add('active');
    holdBtn.classList.add('active');
    toggleBtn.classList.add('active');
};

// Functions to handle button click events.
colourPick.oninput = () => {
    setColour(colourPick.value);
};

colourBtn.onclick = () => {
    setMode(colourBtn, COLOUR_MODE);
    setColour(colourPick.value);
}

randomBtn.onclick = () => {
    setMode(randomBtn, RANDOM_MODE);
};

eraserBtn.onclick = () => {
    setMode(eraserBtn, ERASER_MODE);
    setColour(WHITE);
};

clearBtn.onclick = async () => {
    setGrid();
    flashButton(clearBtn);
};

holdBtn.onclick = () => {
    setInput(holdBtn, HOLD_INPUT);
};

hoverBtn.onclick = () => {
    setInput(hoverBtn, HOVER_INPUT);
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
    if (gridLines) {
        toggleBtn.classList.remove('active')
    } else {
        toggleBtn.classList.add('active')
    }
    gridLines = !gridLines;
};

pixelSld.oninput = setSize;
pixelSld.onmouseup = setGrid;




