class Map {
	constructor() {
		this.grid = [
		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,1,0,1],
		[1,0,0,0,0,1,1,1,1,0,0,0,1,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,1,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,1,0,0,0,0,0,0,0,1,0,1],
		[1,0,0,0,1,1,1,0,0,0,0,0,1,0,1],
		[1,0,0,0,0,0,1,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,1,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
		];
	}

	hasWallAt(x, y) {
		if (!this.withinGridBounds(x,y)) {
			return true;
		}
		let mapGridX = Math.floor(x / TILE_SIZE);
		let mapGridY = Math.floor(y / TILE_SIZE);

		return this.grid[mapGridY][mapGridX] != 0;
	}

  withinGridBounds(x, y) {
    return x >= 0 && x <= WINDOW_WIDTH && y >= 0 && y <= WINDOW_HEIGHT;
  }

	renderMiniMapGrid() {
		for (var i = 0; i < MAP_NUM_ROWS; i++) {
			for (var j = 0; j < MAP_NUM_COLUMNS; j++) {
				//create new rectangle
				let tileX = j * TILE_SIZE; //Remember j is the x coordinate value
				let tileY = i * TILE_SIZE;
				let tileColor = this.grid[i][j] == 1 ? "#222" : "#fff";
        drawTiles(MINIMAP_SCALE_FACTOR, tileX, tileY, "#222", tileColor);
			}
		}
	}
}
