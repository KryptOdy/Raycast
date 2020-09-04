class Ray {
	constructor(rayAngle) {
		this.rayAngle = normalizeAngle(rayAngle);
		this.wallHitX = 0;
		this.wallHitY = 0;
		this.wallDistance = 0;
		this.wasHitVertical = false;

		this.isRayFacingDown = this.rayAngle > 0 && this.rayAngle < Math.PI;
		this.isRayFacingUp = !this.isRayFacingDown;

		this.isRayFacingRight = this.rayAngle < 0.5 * Math.PI || this.rayAngle > 1.5 * Math.PI;
		this.isRayFacingLeft = !this.isRayFacingRight;
	}

	cast() {
		let horizontalCalc = this.calculateHorizontalIntersection();
		let verticalCalc = this.calculateVerticalIntersection();

		let horizontalDistance = horizontalCalc[0];
		let horizontalXCoordinate = horizontalCalc[1];
		let horizontalYCoordinate = horizontalCalc[2];

		let verticalDistance = verticalCalc[0];
		let verticalXCoordinate = verticalCalc[1];
		let verticalYCoordinate = verticalCalc[2];

		//choose smallest value of horizontal and vertical distances
		this.wallHitX = (horizontalDistance < verticalDistance) ? horizontalXCoordinate : verticalXCoordinate;
		this.wallHitY  = (horizontalDistance < verticalDistance) ? horizontalYCoordinate : verticalYCoordinate;
		this.wallDistance = Math.min(horizontalDistance, verticalDistance);
		this.wasHitVertical = (verticalDistance < horizontalDistance);
	}

	calculateHorizontalIntersection() {
		let xStep, yStep;
		let xIntercept, yIntercept;
		let foundHorzWallHit = 0;
		let horizontalWallHitXCoordinate = 0;
		let horizontalWallHitYCoordinate = 0;

		//Find the y coordinate of closest horizontal grid intersection
		yIntercept = Math.floor(player.y / TILE_SIZE) * TILE_SIZE;
		yIntercept += this.isRayFacingDown ? TILE_SIZE : 0; //y intercept at bottom if facing down

		//Find the x coordinate of closest horizontal grid intersection
		xIntercept = player.x + (yIntercept - player.y) / Math.tan(this.rayAngle);

		//calculate the increment xstep and yStep
		yStep = TILE_SIZE;
		yStep *= this.isRayFacingUp ? -1 : 1;

		xStep = TILE_SIZE / Math.tan(this.rayAngle);
		xStep *= (this.isRayFacingLeft && xStep > 0) ? -1 : 1;
		xStep *= (this.isRayFacingRight && xStep < 0) ? -1 : 1;

		let nextHorizontalX = xIntercept;
		let nextHorizontalY = yIntercept;

	  //nextHorizontalY - (this.isRayFacingUp ? 1 : 0))
    //Have to do this to move one pixel over

		//Increment xstep and ystep until we find a wallHitXCoordinate
		while(grid.withinGridBounds(nextHorizontalX, nextHorizontalY)) {
			if (grid.hasWallAt(nextHorizontalX, nextHorizontalY - (this.isRayFacingUp ? 1 : 0))) {
				//We found a wall hit
				foundHorzWallHit = true;
				horizontalWallHitXCoordinate = nextHorizontalX;
				horizontalWallHitYCoordinate = nextHorizontalY;
				break;
			} else {
				nextHorizontalX += xStep;
				nextHorizontalY += yStep;
			}
		}

		let horizontalHitDistance = (foundHorzWallHit) ?
		distanceBetweenPoints(player.x, player.y, horizontalWallHitXCoordinate, horizontalWallHitYCoordinate) : Number.MAX_VALUE;

		return [horizontalHitDistance, horizontalWallHitXCoordinate, horizontalWallHitYCoordinate];
	}

	calculateVerticalIntersection() {
		let xStep, yStep;
		let xIntercept, yIntercept;
		let foundVertWallHit = 0;
		let verticalWallHitXCoordinate = 0;
		let verticalWallHitYCoordinate = 0;

		//Find the x coordinate of closest vertical grid intersection
		xIntercept = Math.floor(player.x / TILE_SIZE) * TILE_SIZE;
		xIntercept += this.isRayFacingRight ? TILE_SIZE : 0; //y intercept at bottom if facing down

		//Find the y coordinate of closest vertical grid intersection
		yIntercept = player.y + (xIntercept - player.x) * Math.tan(this.rayAngle);

		//calculate the increment xstep and yStep
		xStep = TILE_SIZE;
		xStep *= this.isRayFacingLeft ? -1 : 1;

		yStep = TILE_SIZE * Math.tan(this.rayAngle);
		yStep *= (this.isRayFacingUp && yStep > 0) ? -1 : 1;
		yStep *= (this.isRayFacingDown && yStep < 0) ? -1 : 1;

		let nextVerticalX = xIntercept;
		let nextVerticalY = yIntercept;

		//Increment xstep and ystep until we find a vWallHitX
		while(grid.withinGridBounds(nextVerticalX, nextVerticalY)) {
			if (grid.hasWallAt(nextVerticalX - (this.isRayFacingLeft ? 1 : 0), nextVerticalY)) {
				//We found a wall hit
				foundVertWallHit = true;
				verticalWallHitXCoordinate = nextVerticalX;
				verticalWallHitYCoordinate = nextVerticalY;
				break;
			} else {
				nextVerticalX += xStep;
				nextVerticalY += yStep;
			}
		}

		let verticalHitDistace = (foundVertWallHit) ?
		distanceBetweenPoints(player.x, player.y, verticalWallHitXCoordinate, verticalWallHitYCoordinate) : Number.MAX_VALUE;

		return [verticalHitDistace, verticalWallHitXCoordinate, verticalWallHitYCoordinate];
	}

	render() {
    drawLine(MINIMAP_SCALE_FACTOR, player.x, player.y, this.wallHitX, this.wallHitY, "rgba(255,0,0,0.1)");
	}
}
