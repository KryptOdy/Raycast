function distanceBetweenPoints(x1, y1, x2, y2) {
	return Math.sqrt((x2-x1)*(x2-x1) + (y2-y1)*(y2-y1));
}

//Keep value between 0 and 2pi
function normalizeAngle(angle) {
	angle = angle % (2 * Math.PI);
	if (angle < 0) {
		angle = (2 * Math.PI) + angle;
	}
	return angle;
}

function drawCircle(scaleFactor, x, y, radius, color) {
  noStroke();
  fill(color);
  circle(
    scaleFactor * x,
    scaleFactor * y,
    scaleFactor * radius);
}

function drawLine(scaleFactor, x1, y1, x2, y2, strokeColor) {
  stroke(strokeColor);
  line(
    scaleFactor * x1,
    scaleFactor * y1,
    scaleFactor * x2,
    scaleFactor * y2
  );
}

function drawTiles(scaleFactor, x, y, strokeColor, tileColor) {
  stroke(strokeColor);
  fill(tileColor);
  rect(
    scaleFactor * x,
    scaleFactor * y,
    scaleFactor * TILE_SIZE,
    scaleFactor * TILE_SIZE);
}

function drawWall(index, depthColor, wallColor, wallStripHeight) {
  fill(`rgba(${wallColor}, ${wallColor}, ${wallColor}, ${depthColor})`);
  noStroke();
  rect(
    index * WALL_STRIP_WIDTH,
    (WINDOW_HEIGHT / 2) - (wallStripHeight / 2),
    WALL_STRIP_WIDTH,
    wallStripHeight
  );
}
