// Global variables that will store the toolbox colour palette
// and the helper functions.
let toolbox;
let colourP;
let helpers;
let canvasContainer;
let c;
let currentStep = -1;
let history = [];
let zoom = 1;

function setup() {
  // create a canvas to fill the content div from index.html
  canvasContainer = select('#content');
  c = createCanvas(canvasContainer.size().width, canvasContainer.size().height);
  c.parent("content");
  canvasContainer.elt.focus(); // set focus on the canvas element

  // create helper functions and the colour palette
  helpers = new HelperFunctions();
  colourP = new ColourPalette();

  // create a toolbox for storing the tools
  toolbox = new Toolbox();

  // add some tools to the toolbox
  const mySprayCan = new SprayCanTool("My Spray Can", "assets/sprayCan.jpg", 10, 5);
  toolbox.addTool(new FreehandTool());
  toolbox.addTool(new LineToTool());
  toolbox.addTool(mySprayCan);
  toolbox.addTool(new mirrorDrawTool());

  // set the initial background color
  background(255);

  // enable keyboard shortcuts for undo and redo
  canvasContainer.elt.tabIndex = 0;
  canvasContainer.elt.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.key === 'z') { // Ctrl + Z
      undo();
    } else if (e.ctrlKey && e.key === 'y') { // Ctrl + Y
      redo();
    }
  });
}

function draw() {
  if (toolbox.selectedTool.hasOwnProperty("draw")) {
    // if the selected tool has a draw method, call it
    toolbox.selectedTool.draw();

    // save the current canvas state to the history array
    if (Array.isArray(history)) {
      currentStep++;
      history.splice(currentStep, history.length - currentStep, c.get());
      scale(zoom); // apply zoom factor
    }
  } else {
    alert("it doesn't look like your tool has a draw method!");
  }
}

function undo() {
  // move one step back in the history array and redraw the canvas
  if (currentStep > 0) {
    currentStep--;
    c.background(255);
    c.image(history[currentStep], 0, 0);
  }
}

function redo() {
  // move one step forward in the history array and redraw the canvas
  if (currentStep < history.length - 1) {
    currentStep++;
    c.background(255);
    c.image(history[currentStep], 0, 0);
  }
}

function mouseWheel(event) {
  // adjust the zoom based on the mouse wheel delta
  zoom += event.delta * 0.001;
  
  // constrain the zoom to reasonable limits
  zoom = constrain(zoom, 0.5, 5);

  // prevent the page from scrolling
  return false;
}