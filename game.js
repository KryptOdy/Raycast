const TILE_SIZE = 40; //In number of pixels
const MAP_NUM_ROWS = 11;
const MAP_NUM_COLUMNS = 15;

const WINDOW_WIDTH = MAP_NUM_COLUMNS * TILE_SIZE;//How many columns on map grid x Tile Size (This is size of the canvas)
const WINDOW_HEIGHT = MAP_NUM_ROWS * TILE_SIZE; //How many rows on map grid x Tile Size (This is size of the canvas)

const FOV_ANGLE  = 60 * (Math.PI / 180);
const WALL_STRIP_WIDTH = 5  //In pixels how large do I want how thick.
const NUM_RAYS = WINDOW_WIDTH / WALL_STRIP_WIDTH; //Number of rays depends on how thick columns are
const MINIMAP_SCALE_FACTOR = 0.2;

const KEYPRESS = {
	'W' : 87,
	'A' : 65,
	'S' : 83,
	'D' : 68,
}

let grid = new Map();
let player = new Player();

function reset() {
	grid = new Map();
	player = new Player();
}

//Implemented in p5.js library
function setup() {
	createCanvas(WINDOW_WIDTH, WINDOW_HEIGHT);
	keyPressed = () => player.keyPressed();
	keyReleased = () => player.keyReleased();
}

function update() {
	//TODO: update all game objects before we render the next frame
	player.update();
}

//Implemented in p5.js library, function draws per frame and exceute everthing
//Renders all objects frame by frame
function draw() {
	clear("#212121");
	update();
	player.render3DWalls();

	grid.renderMiniMapGrid(); //Used for minimap
	player.renderMiniMapRays(); //Used for minimap
	player.renderMiniMapPlayer(); //Used for minimap
}
