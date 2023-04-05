// Global variables that will store the toolbox colour palette
// and the helper functions.
var toolbox = null;
var colourP = null;
var helpers = null;
var c;
var currentStep = -1;
let history = [];

function setup() {

	//create a canvas to fill the content div from index.html
	canvasContainer = select('#content');
	c = createCanvas(canvasContainer.size().width, canvasContainer.size().height);
	c.parent("content");

	//create helper functions and the colour palette
    helpers = new HelperFunctions();
	colourP = new ColourPalette();

	//create a toolbox for storing the tools
	toolbox = new Toolbox();

	const mySprayCan = new SprayCanTool("My Spray Can", "assets/sprayCan.jpg", 10, 5);

	//add the tools to the toolbox.
	toolbox.addTool(new FreehandTool());
	toolbox.addTool(new LineToTool());
	toolbox.addTool(mySprayCan);
	toolbox.addTool(new mirrorDrawTool());
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
		toolbox.selectedTool.draw();
		if (Array.isArray(history)) {
			currentStep++;
			history.splice(currentStep, history.length - currentStep, c.get());
		}
	} else {
		alert("it doesn't look like your tool has a draw method!");
	}
}

function undo() {
	if (currentStep > 0) {
		currentStep--;
		c.background(255);
		c.image(history[currentStep], 0, 0);
	}
}

function redo() {
	if (currentStep < history.length - 1) {
		currentStep++;
		c.background(255);
		c.image(history[currentStep], 0, 0);
	}
}