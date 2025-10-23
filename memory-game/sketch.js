// Memory Game 

// Card images
let backImg;
let furiousImg;
let confusedImg;
let boredImg;
let positiveImg;
let xenialImg;
let tiredImg;

// Card objects 
let card1, card2, card3, card4, card5, card6;
let card7, card8, card9, card10, card11, card12;

// Game state variables
let firstCard = null;
let secondCard = null;
let flippedCount = 0;
let matchedPairs = 0;
let canClick = true;

// Card size
let cardWidth = 240;
let cardHeight = 180;

function preload() {
  // Card images 
  backImg = loadImage('images/Back.png');
  furiousImg = loadImage('images/Furious.png');
  confusedImg = loadImage('images/Confused.png');
  boredImg = loadImage('images/Bored.png');
  positiveImg = loadImage('images/Positive.png');
  xenialImg = loadImage('images/Xenial.png');
  tiredImg = loadImage('images/Tired.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // Canvas
  let spacing = 3; 
  let startX = (width - (cardWidth * 4 + spacing * 3)) / 2;
  let startY = 120; 
  
  // Create 12 card objects manually (6 pairs)
  // Row 1
  card1 = createCard(startX, startY, furiousImg, "furious");
  card2 = createCard(startX + cardWidth + spacing, startY, confusedImg, "confused");
  card3 = createCard(startX + (cardWidth + spacing) * 2, startY, boredImg, "bored");
  card4 = createCard(startX + (cardWidth + spacing) * 3, startY, positiveImg, "positive");
  
  // Row 2
  card5 = createCard(startX, startY + cardHeight + spacing, xenialImg, "xenial");
  card6 = createCard(startX + cardWidth + spacing, startY + cardHeight + spacing, tiredImg, "tired");
  card7 = createCard(startX + (cardWidth + spacing) * 2, startY + cardHeight + spacing, furiousImg, "furious");
  card8 = createCard(startX + (cardWidth + spacing) * 3, startY + cardHeight + spacing, confusedImg, "confused");
  
  // Row 3
  card9 = createCard(startX, startY + (cardHeight + spacing) * 2, boredImg, "bored");
  card10 = createCard(startX + cardWidth + spacing, startY + (cardHeight + spacing) * 2, positiveImg, "positive");
  card11 = createCard(startX + (cardWidth + spacing) * 2, startY + (cardHeight + spacing) * 2, xenialImg, "xenial");
  card12 = createCard(startX + (cardWidth + spacing) * 3, startY + (cardHeight + spacing) * 2, tiredImg, "tired");
  
}

function draw() {
  // Background color
  background(40, 40, 60);
  
  // Display title
  fill(255);
  textSize(32);
  textAlign(CENTER);
  text("Memory Game", width / 2, 50);
  
  // Display instructions
  textSize(16);
  text("Click cards to find matching pairs!", width / 2, 85);
  
  // Cards
  displayCard(card1);
  displayCard(card2);
  displayCard(card3);
  displayCard(card4);
  displayCard(card5);
  displayCard(card6);
  displayCard(card7);
  displayCard(card8);
  displayCard(card9);
  displayCard(card10);
  displayCard(card11);
  displayCard(card12);
 
  
  // Check for win condition
  if (matchedPairs === 6) {
    displayWinScreen();
  }
  
  // Match count
  fill(255);
  textSize(18);
  text("Matches: " + matchedPairs + " / 6", width / 2, height - 30);
}

// Card object
function createCard(x, y, faceImg, cardType) {
  let card = {
    x: x,
    y: y,
    w: cardWidth,
    h: cardHeight,
    faceImage: faceImg,
    backImage: backImg,
    type: cardType,
    isFlipped: false,
    isMatched: false,
  };
  return card;
}


function displayCard(card) {
  imageMode(CORNER);
  
  let imgWidth = card.w * 1.5; 
  let imgHeight = card.h * 1.5; 
  let imgX = card.x - (imgWidth - card.w) / 2; 
  let imgY = card.y - (imgHeight - card.h) / 2;
  
  // Conditional
  if (card.isFlipped || card.isMatched) {
    image(card.faceImage, imgX, imgY, imgWidth, imgHeight);
  } else {
    image(card.backImage, imgX, imgY, imgWidth, imgHeight);
  }
  
  noStroke();
}



// Click 
function mousePressed() {
  if (!canClick) {
    return;
  }
  
  // Cards
  checkCardClick(card1);
  checkCardClick(card2);
  checkCardClick(card3);
  checkCardClick(card4);
  checkCardClick(card5);
  checkCardClick(card6);
  checkCardClick(card7);
  checkCardClick(card8);
  checkCardClick(card9);
  checkCardClick(card10);
  checkCardClick(card11);
  checkCardClick(card12);
}

// Click (check on specific card)
function checkCardClick(card) {
  if (mouseX > card.x && mouseX < card.x + card.w &&
      mouseY > card.y && mouseY < card.y + card.h) {
    
    
    if (card.isFlipped || card.isMatched) {
      return;
    }
    
    // Firts card clicked
    if (flippedCount === 0) {
      card.isFlipped = true;
      firstCard = card;
      flippedCount = 1;
      
    } else if (flippedCount === 1) {
      // Second card clicked
      card.isFlipped = true;
      secondCard = card;
      flippedCount = 2;
      canClick = false;
      
      setTimeout(checkMatch, 800);
    }
  }
}

// Cards match
function checkMatch() {
  // Match
  if (firstCard.type === secondCard.type) {
    firstCard.isMatched = true;
    secondCard.isMatched = true;
    matchedPairs = matchedPairs + 1;
    
    // Reset for next turn
    firstCard = null;
    secondCard = null;
    flippedCount = 0;
    canClick = true;
    
  } else {
    // No match 
    setTimeout(resetCards, 1000);
  }
}

// Reset unmatched cards 
function resetCards() {
  if (firstCard !== null) {
    firstCard.isFlipped = false;
  }
  if (secondCard !== null) {
    secondCard.isFlipped = false;
  }
  
  firstCard = null;
  secondCard = null;
  flippedCount = 0;
  canClick = true; 
}

// Win screen
function displayWinScreen() {
  fill(0, 0, 0, 200);
  rect(0, 0, width, height);
  fill(255, 215, 0);
  textSize(64);
  textAlign(CENTER);
  text("YOU WIN!", width / 2, height / 2 - 50);
  fill(255);
  textSize(24);
  text("All cards matched!", width / 2, height / 2 + 20);
  text("Refresh page to play again", width / 2, height / 2 + 60);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}