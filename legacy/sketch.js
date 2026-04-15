let boardSize = 600;
let cols, rows;
let tileWidth, tileHeight;
let grid = [];
let playerScore = 0;
let highScores = [];
let currentRow = 0;
let pressedTiles = [];
let leftMargin = 60;
let rowNumberWidth = 25;
let availableTiles = [];
let maxScore = 0;
let minScore = Infinity;
let currentLevel = 0;
let gameState = "LEVEL_SELECT";
let levels = [];
let levelGroups = [];
let currentGroup = 0;

function setup() {
  createCanvas(720, 1280);
  initializeLevels();
}

function initializeLevels() {
  // Group 1: 2 columns, 3-9 rows
  let group1 = [];
  for (let i = 3; i <= 9; i++) {
    group1.push({ cols: 2, rows: i, highScore: 0, stars: 0, unlocked: i === 3 });
  }
  levelGroups.push(group1);

  // Group 2: 3 columns, 4-9 rows
  let group2 = [];
  for (let i = 4; i <= 9; i++) {
    group2.push({ cols: 3, rows: i, highScore: 0, stars: 0, unlocked: i === 4 });
  }
  levelGroups.push(group2);

  // Group 3: 4 columns, 5-9 rows
  let group3 = [];
  for (let i = 5; i <= 9; i++) {
    group3.push({ cols: 4, rows: i, highScore: 0, stars: 0, unlocked: i === 5 });
  }
  levelGroups.push(group3);

  // New Group 4: 5 columns, 6-9 rows
  let group4 = [];
  for (let i = 6; i <= 9; i++) {
    group4.push({ cols: 5, rows: i, highScore: 0, stars: 0, unlocked: i === 6 });
  }
  levelGroups.push(group4);

  // Updated Group 5 (previously 4): 6 columns, 7-9 rows
  let group5 = [];
  for (let i = 7; i <= 9; i++) {
    group5.push({ cols: 6, rows: i, highScore: 0, stars: 0, unlocked: i === 7 });
  }
  levelGroups.push(group5);

  // Updated Group 6 (previously 5): 7 columns, 8-9 rows
  let group6 = [];
  for (let i = 8; i <= 9; i++) {
    group6.push({ cols: 7, rows: i, highScore: 0, stars: 0, unlocked: i === 8 });
  }
  levelGroups.push(group6);

  // Updated Group 7 (previously 6): 8 columns, 9 rows
  let group7 = [{ cols: 8, rows: 9, highScore: 0, stars: 0, unlocked: true }];
  levelGroups.push(group7);

  // Updated Group 8 (previously 7): 9 columns, 9 rows
  let group8 = [{ cols: 9, rows: 9, highScore: 0, stars: 0, unlocked: true }];
  levelGroups.push(group8);

  // Flatten the groups into a single array
  levels = levelGroups.flat();

  // Unlock the first level of each group
  for (let i = 0; i < levelGroups.length; i++) {
    levelGroups[i][0].unlocked = true;
  }
}

function initializeGrid() {
  cols = levels[currentLevel].cols;
  rows = levels[currentLevel].rows;
  tileWidth = boardSize / cols;
  tileHeight = boardSize / rows;

  grid = [];
  for (let i = 0; i < cols; i++) {
    grid[i] = [];
    for (let j = 0; j < rows; j++) {
      grid[i][j] = floor(random(1, 10));
    }
  }
  resetLevel();
  calculatePathScores();
}

function resetLevel() {
  currentRow = 0;
  pressedTiles = [];
  availableTiles = Array.from({ length: cols }, (_, i) => ({ col: i, row: rows - 1 }));
  playerScore = 0;
}

function calculatePathScores() {
  maxScore = 0;
  minScore = Infinity;
  for (let i = 0; i < cols; i++) {
    let score = calculatePathScore(i, rows - 1, 0);
    maxScore = max(maxScore, score);
    minScore = min(minScore, score);
  }
}

function calculatePathScore(col, row, currentScore) {
  if (row < 0) return currentScore;
  let score = currentScore + grid[col][row];
  let scores = [score];
  if (col > 0) scores.push(calculatePathScore(col - 1, row - 1, score));
  if (col < cols - 1) scores.push(calculatePathScore(col + 1, row - 1, score));
  scores.push(calculatePathScore(col, row - 1, score));
  return max(scores);
}

function draw() {
  background(240);

  if (gameState === "LEVEL_SELECT") {
    drawLevelSelect();
  } else if (gameState === "PLAYING") {
    drawGame();
  } else if (gameState === "LEVEL_COMPLETE") {
    drawLevelComplete();
  }
}

function drawLevelSelect() {
  textSize(32);
  fill(0);
  textAlign(CENTER, TOP);
  text("Select Level - Group " + (currentGroup + 1), width / 2, 30);

  // Add navigation buttons for groups above the levels
  drawButton(width / 2 - 150, 70, 140, 60, "Previous Group");
  drawButton(width / 2 + 10, 70, 140, 60, "Next Group");

  let startY = 150; // Adjusted to make room for buttons
  let levelHeight = 60;

  let group = levelGroups[currentGroup];

  for (let levelIndex = 0; levelIndex < group.length; levelIndex++) {
    let level = group[levelIndex];
    let y = startY + levelIndex * levelHeight;

    fill(level.unlocked ? 200 : 100);
    rect(width / 2 - 150, y, 300, levelHeight - 5, 10);

    fill(0);
    textSize(18);
    textAlign(LEFT, CENTER);
    text("Level " + (currentGroup + 1) + "-" + (levelIndex + 1) + " (" + level.cols + "x" + level.rows + ")", width / 2 - 140, y + levelHeight / 2);

    // Draw stars on the right
    drawStars(width / 2 + 100, y + levelHeight / 2, level.stars);
  }
}

function drawGame() {
  // Draw game board
  fill(200);
  rect(leftMargin, 60, boardSize, boardSize);

  // Draw vertical lines
  stroke(0);
  strokeWeight(2);
  line(leftMargin - rowNumberWidth, 60, leftMargin - rowNumberWidth, 60 + boardSize);
  line(leftMargin - 1, 60, leftMargin - 1, 60 + boardSize);
  line(leftMargin + boardSize + 20, 60, leftMargin + boardSize + 20, 60 + boardSize);

  // Reset stroke settings
  noStroke();

  // Draw row numbers
  textSize(18);
  fill(0);
  textAlign(RIGHT, CENTER);
  for (let j = 0; j < rows; j++) {
    text(rows - j, leftMargin - 5, 60 + j * tileHeight + tileHeight / 2);
  }

  // Draw grid with random numbers and color pressed and available tiles
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (pressedTiles.some(tile => tile.col === i && tile.row === j)) {
        fill(100, 200, 100); // Green color for pressed tiles
      } else if (availableTiles.some(tile => tile.col === i && tile.row === j)) {
        fill(255, 255, 150); // Light yellow for available tiles
      } else {
        fill(255);
      }
      rect(leftMargin + i * tileWidth, 60 + j * tileHeight, tileWidth, tileHeight);
      fill(0);
      textSize(24);
      textAlign(CENTER, CENTER);
      text(grid[i][j], leftMargin + i * tileWidth + tileWidth / 2, 60 + j * tileHeight + tileHeight / 2);
    }
  }

  // Draw transparent bar with frame over the current row
  if (currentRow < rows) {
    fill(255, 255, 0, 100);
    rect(leftMargin - rowNumberWidth, 60 + boardSize - (currentRow + 1) * tileHeight, boardSize + rowNumberWidth + 20, tileHeight);
    noFill();
    stroke(200, 200, 0);
    strokeWeight(2);
    rect(leftMargin - rowNumberWidth, 60 + boardSize - (currentRow + 1) * tileHeight, boardSize + rowNumberWidth + 20, tileHeight);
    noStroke();
  }

  // Draw caret characters below each column
  textSize(32);
  fill(0);
  for (let i = 0; i < cols; i++) {
    text("^", leftMargin + i * tileWidth + tileWidth / 2, 60 + boardSize + 30);
  }

  // Draw UI elements
  drawButton(leftMargin, 700, 200, 60, "Retry");
  drawButton(leftMargin + 400, 700, 200, 60, "Cancel");

  // Draw player info
  fill(0);
  textSize(24);
  textAlign(LEFT, TOP);
  text("Level " + (currentLevel + 1), leftMargin, 800);
  text("Score: " + playerScore, leftMargin, 830);
}

function drawLevelComplete() {
  textSize(32);
  fill(0);
  textAlign(CENTER, TOP);
  text("Level " + (currentLevel + 1) + " Complete!", width / 2, 50);

  let performancePercentage = ((playerScore - minScore) / (maxScore - minScore)) * 100;
  let stars = Math.min(3, Math.floor(performancePercentage / 50) + 1);

  // Update the stars for the current level
  levels[currentLevel].stars = max(levels[currentLevel].stars, stars);

  drawStars(width / 2 - 75, 150, stars);

  textSize(24);
  text("Score: " + playerScore, width / 2, 250);

  // Offer retry if 0 or 1 star
  if (stars <= 1) {
    drawButton(width / 2 - 150, 350, 300, 60, "Retry Level");
  }

  // Offer continue if 2 or 3 stars
  if (stars >= 2 && currentLevel < levels.length - 1) {
    drawButton(width / 2 - 150, 350, 300, 60, "Continue to Next Level");
  }

  drawButton(width / 2 - 150, 450, 300, 60, "Level Select");
}

function drawStars(x, y, stars) {
  const starSpacing = 50; // Adjust the spacing between stars
  for (let i = 0; i < 3; i++) {
    if (i < stars) {
      fill(255, 215, 0); // Gold color for filled stars
    } else {
      fill(200); // Gray color for empty stars
    }
    star(x + i * starSpacing, y, 15, 30, 5);
  }
}

function star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function drawButton(x, y, w, h, label) {
  fill(100);
  rect(x, y, w, h, 10);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(20);
  text(label, x + w/2, y + h/2);
}

function mousePressed() {
  if (gameState === "LEVEL_SELECT") {
    // Check for group navigation button clicks
    if (mouseY > 70 && mouseY < 130) {
      if (mouseX > width / 2 - 150 && mouseX < width / 2 - 10) {
        currentGroup = max(0, currentGroup - 1);
        return;
      } else if (mouseX > width / 2 + 10 && mouseX < width / 2 + 150) {
        currentGroup = min(levelGroups.length - 1, currentGroup + 1);
        return;
      }
    }

    let startY = 150; // Adjusted to match new level start position
    let levelHeight = 60;

    let group = levelGroups[currentGroup];
    for (let levelIndex = 0; levelIndex < group.length; levelIndex++) {
      let y = startY + levelIndex * levelHeight;
      if (mouseX > width / 2 - 150 && mouseX < width / 2 + 150 &&
          mouseY > y && mouseY < y + levelHeight - 5 && group[levelIndex].unlocked) {
        currentLevel = levelGroups.slice(0, currentGroup).reduce((acc, g) => acc + g.length, 0) + levelIndex;
        // No need to update currentGroup here as it's already correct
        gameState = "PLAYING";
        initializeGrid();
        return;
      }
    }
  } else if (gameState === "PLAYING") {
    if (mouseX >= leftMargin && mouseX <= leftMargin + boardSize && mouseY >= 60 && mouseY <= 60 + boardSize) {
      let col = floor((mouseX - leftMargin) / tileWidth);
      let row = floor((mouseY - 60) / tileHeight);

      if (availableTiles.some(tile => tile.col === col && tile.row === row)) {
        playerScore += grid[col][row];
        pressedTiles.push({col: col, row: row});
        currentRow++;

        if (currentRow === rows) {
          gameState = "LEVEL_COMPLETE";
          let performancePercentage = ((playerScore - minScore) / (maxScore - minScore)) * 100;
          let stars = Math.min(3, Math.floor(performancePercentage / 50) + 1);
          levels[currentLevel].stars = max(levels[currentLevel].stars, stars);
          levels[currentLevel].highScore = max(levels[currentLevel].highScore, playerScore);
          if (currentLevel < levels.length - 1) {
            levels[currentLevel + 1].unlocked = true;
          }
        } else {
          // Update available tiles for the next move
          availableTiles = [];
          if (row > 0) {
            availableTiles.push({col: col, row: row - 1}); // Tile directly above
            if (col > 0) availableTiles.push({col: col - 1, row: row - 1}); // Tile above and to the left
            if (col < cols - 1) availableTiles.push({col: col + 1, row: row - 1}); // Tile above and to the right
          }
        }
      }
    }

    if (mouseX >= leftMargin && mouseX <= leftMargin + 200 && mouseY >= 700 && mouseY <= 760) {
      resetLevel();
    }

    // Handle the cancel button
    if (mouseX >= leftMargin + 400 && mouseX <= leftMargin + 600 && mouseY >= 700 && mouseY <= 760) {
      gameState = "LEVEL_SELECT";
      // Update currentGroup based on currentLevel
      currentGroup = 0;
      let levelCount = 0;
      for (let i = 0; i < levelGroups.length; i++) {
        if (currentLevel >= levelCount && currentLevel < levelCount + levelGroups[i].length) {
          currentGroup = i;
          break;
        }
        levelCount += levelGroups[i].length;
      }
    }
  } else if (gameState === "LEVEL_COMPLETE") {
    let performancePercentage = ((playerScore - minScore) / (maxScore - minScore)) * 100;
    let stars = Math.min(3, Math.floor(performancePercentage / 50) + 1);

    // Retry Level (for 0 or 1 star)
    if (stars <= 1 &&
        mouseX > width / 2 - 150 && mouseX < width / 2 + 150 &&
        mouseY > 350 && mouseY < 410) {
      resetLevel();
      gameState = "PLAYING";
    }

    // Continue to Next Level (for 2 or 3 stars)
    if (stars >= 2 && currentLevel < levels.length - 1 &&
        mouseX > width / 2 - 150 && mouseX < width / 2 + 150 &&
        mouseY > 350 && mouseY < 410) {
      currentLevel++;
      gameState = "PLAYING";
      initializeGrid();
    }

    // Level Select
    if (mouseX > width / 2 - 150 && mouseX < width / 2 + 150 &&
        mouseY > 450 && mouseY < 510) {
      gameState = "LEVEL_SELECT";
    }
  }
}
