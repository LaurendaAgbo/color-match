class Game {
  constructor () {
  }

  init () {
    this.generateLevel(1);
  }

  showPopup () {
  
  }
  
  hidePopup () {
  
  }
  
  playMusic () {
  
  }
  
  stopMusic () {
  
  }
  
  generateLevel (level) {
    const boardElement = document.getElementById('game-content');
    let numberOfCards;
    switch (level) {
      case 1:
        numberOfCards = 8;
        break;
      case 2:
        numberOfCards = 12;
        break;
      case 3:
        numberOfCards = 16;
        break;
      case 4:
        numberOfCards = 20;
        break;
      case 5:
        numberOfCards = 24;
        break;
      case 6:
        numberOfCards = 28;
        break;
      case 7:
        numberOfCards = 32;
        break;
      case 8:
        numberOfCards = 36;
        break;
      case 9:
        numberOfCards = 40;
        break;
      case 10:
        numberOfCards = 44;
        break;
    
      default:
        break;
    }
    this.showLevel(boardElement, numberOfCards);
  }
  
  showLevel (boardElement, numberOfCards) {
    const boardCards = [];
    let cardsHTML = '';

    for (let i = 0; i < numberOfCards; i++) {
      cardsHTML +=
        '<div class="card flipped">\n' +
        '<div class="face-container">\n' +
        '<div class="hide-face"></div>\n' +
        '<div class="middle-face"></div>\n' +
        '<div class="show-face"></div>\n' +
        '</div>\n' +
        '</div>\n';
    }
    boardElement.innerHTML = cardsHTML;

    const randomColorPairs = this.shuffleColors(numberOfCards);

    const cardsElements = document.getElementsByClassName("card");
    for (let i = 0; i < cardsElements.length; i++) {
      const element = cardsElements[i];
      const color = randomColorPairs[i];
      const card = this.setColor(element, color)
  
      boardCards.push(card);
    }


  }

  setColor(element,color) {
    const showFaceElement = element.getElementsByClassName('show-face')[0];
    showFaceElement.classList.add(color);
  }

  generateColorPairs(numberOfCards) {
    const colorPairs = [];
    const numberOfPairs = numberOfCards/2;
    if (colorPairs.length > 0) {
      return colorPairs;
    } 
    else {
      for (let i = 0; i < numberOfPairs; i++) {
        colorPairs.push('color-' + i);
        colorPairs.push('color-' + i);
      }
  
      return colorPairs;
    }
  }

  shuffleColors(numberOfCards) {
    const colorPairs = this.generateColorPairs(numberOfCards)
    return shuffle(colorPairs);
  }
  
  setClock () {
  
  }
  
  keepScore () {
  
  }
  
  onPaireClick () {
  
  }
  
  checkGameStatus () {
  
  }
}

function shuffle(array) {
  let currentIndex = array.length;
  let temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}