class Player {
	constructor() {
		this.x = WINDOW_WIDTH / 2;
		this.y = WINDOW_HEIGHT / 2;
		this.radius = 3; //3 pixels
		this.turnDirection = 0; //-1 if left or +1 if right
		this.walkDirection = 0; //-1 if back or +1 if front
		this.rotationAngle = Math.PI/2; // What direction is player facing
		this.moveSpeed = 3.0; //3 pixels per frame
		this.rotationSpeed = 3 * (Math.PI / 180); //2 degrees per frame in radians
    this.rays = []; //List of rays you need to cast
	}

	update() {
		//Update player position based on turnDirection and walkDirection
		this.rotationAngle += this.turnDirection * this.rotationSpeed;
		let moveStep = this.walkDirection * this.moveSpeed; //how much each of frames
		let newPlayerX = this.x + Math.cos(this.rotationAngle) * moveStep;
		let newPlayerY = this.y + Math.sin(this.rotationAngle) * moveStep;

		if (!grid.hasWallAt(newPlayerX, newPlayerY)) {
			this.x = newPlayerX;
			this.y = newPlayerY;
		}
    this.castAllRays();
	}

    castAllRays() {
  	//find first ray by subtracting half of field of view
  	let rayAngle = player.rotationAngle - (FOV_ANGLE / 2);
  	this.rays = [];
  	for (let i = 0; i < NUM_RAYS; i++) {
  		let currentRay = new Ray(rayAngle);
  		currentRay.cast();
  		this.rays.push(currentRay);
  		rayAngle += FOV_ANGLE / NUM_RAYS;
  	}
  }

	renderMiniMapPlayer() {
    drawCircle(MINIMAP_SCALE_FACTOR, this.x, this.y, this.radius, "blue");

		stroke("blue");
		line(
			MINIMAP_SCALE_FACTOR * this.x,
			MINIMAP_SCALE_FACTOR * this.y,
			MINIMAP_SCALE_FACTOR * (this.x + Math.cos(this.rotationAngle) * 30),
			MINIMAP_SCALE_FACTOR * (this.y + Math.sin(this.rotationAngle) * 30));
	}

  renderMiniMapRays() {
    for (let ray of this.rays) {
      ray.render();
    }
  }

  render3DWalls() {
  	//loop through every ray in rays array
  	for (let i = 0; i < NUM_RAYS; i++) {
  		let ray = this.rays[i];
  		let rayDistance = ray.wallDistance;
  		let correctDistance = rayDistance * Math.cos(ray.rayAngle - player.rotationAngle); //Use to fix fishbowl effect

  		//calculate distance to the projection plane
  		let distanceProjectionPlane = (WINDOW_WIDTH / 2) / Math.tan(FOV_ANGLE / 2);
  		//Projected wall height
  		let wallStripHeight = (TILE_SIZE / correctDistance) * distanceProjectionPlane
  		let depthColor = 100 / correctDistance;
  		let color = ray.wasHitVertical ? 255 : 180; //Used for shadow effect

      drawWall(i, depthColor, color, wallStripHeight);
  	}
  }

  keyPressed() {
  	switch(keyCode) {
      case KEYPRESS['W']:
  		case UP_ARROW  :
  			this.walkDirection = 1;
  		break;

      case KEYPRESS['S']:
  		case DOWN_ARROW:
  			this.walkDirection = -1;
  		break;

      case KEYPRESS['D']:
  		case RIGHT_ARROW:
  			this.turnDirection = 1;
  		break;

      case KEYPRESS['A']:
  		case LEFT_ARROW:
  			this.turnDirection = -1;
  		break;
  	}
  }

   keyReleased() {
  	switch(keyCode) {
      case KEYPRESS['W']:
  		case UP_ARROW:
  			this.walkDirection = 0;
  		break;

      case KEYPRESS['S']:
  		case DOWN_ARROW:
  			this.walkDirection = 0;
  		break;

      case KEYPRESS['D']:
  		case RIGHT_ARROW:
  			this.turnDirection = 0;
  		break;

      case KEYPRESS['A']:
  		case LEFT_ARROW:
  			this.turnDirection = 0;
  		break;
  	}
  }
}
