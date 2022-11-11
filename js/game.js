class Game {
  constructor () {
    // this.level = level;
  }

  init () {
    const level = parseInt(document.getElementById('level').textContent); 
    this.generateLevel(level);
  }

  showPopup (popup) {
    document.querySelectorAll('.overlay').forEach(function (elm) {
      elm.style.display = 'none';
    });
  
    if (popup == 'win') {
      document.querySelector('#win').style.display = 'flex';
    } else if (popup == 'lose') {
      document.querySelector('#lose').style.display = 'flex';
    } else if (popup == 'start') {
      document.querySelector('#instructions').style.display = 'flex';
    }
  }
  
  hidePopup (popup) {
    if (popup == 'win') {
      document.querySelector('#win').style.display = 'none';
    } else if (popup == 'lose') {
      document.querySelector('#lose').style.display = 'none';
    } else if (popup == 'start') {
      document.querySelector('#instructions').style.display = 'none';
    }
    else if (popup == '') {
      document.querySelectorAll('.overlay').forEach(function (elm) {
        elm.style.display = 'none';
      });
    }
  }
  
  playMusic () {
  
  }
  
  stopMusic () {
  
  }
  
  generateLevel (level) {
    this.hidePopup('');
    const boardElement = document.getElementById('game-content');
    const levelElement = document.getElementById('level');
    levelElement.innerText = level;
    let numberOfCards = [8, 12, 16, 20, 24, 28, 32, 36, 40, 44];
    let levelTime = [20, 40, 60, 100, 140, 180, 220, 260, 300, 360]
    this.showLevel(boardElement, numberOfCards[level-1], levelTime[level-1]);
  }
  
  showLevel (boardElement, numberOfCards, levelTime) {
    let cardsHTML = '';
    const cardsToMatch = numberOfCards/2;
    let matchesFound = 0;
    document.getElementById('total').innerText = cardsToMatch;
    this.keepScore(matchesFound);

    for (let i = 0; i < numberOfCards; i++) {
      cardsHTML +=
        '<div class="card">\n' +
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
      this.setColor(element, color);
    }

    let timer;
    let timerElement = document.getElementById('timer'); 
    let timeLeft = levelTime; // seconds
    let timeLeftText = '';
    const mainClass = this;
    timer = setInterval(function () {
      timeLeft = timeLeft - 1;
      if(timeLeft >= 0) {
        timeLeftText = mainClass.setClock(timeLeft);
        timerElement.innerText = timeLeftText; 
      }
      else {
        clearInterval(timer);
        mainClass.showPopup('lose');
      }
    }, 1000);

    this.onCardClick(matchesFound, cardsToMatch, timer);

  }

  setColor(element,color) {
    const showFaceElement = element.getElementsByClassName('show-face')[0];
    showFaceElement.classList.add(color);
  }

  generateColorPairs(numberOfCards) {
    const colorPairs = [];
    const numberOfPairs = numberOfCards/2;
    if (colorPairs.length <= 0) {
      for (let i = 0; i < numberOfPairs; i++) {
        colorPairs.push('color-' + i);
        colorPairs.push('color-' + i);
      }
    }
    return colorPairs;

  }

  shuffleColors (numberOfCards) {
    const colorPairs = this.generateColorPairs(numberOfCards)
    return shuffle(colorPairs);
  }
  
  setClock (timeLeft) {
    let min = ((timeLeft / 60) < 10 ? '0' : '')  + parseInt(timeLeft / 60);
    let sec = ((timeLeft % 60) < 10 ? '0' : '')  + timeLeft % 60;
    return min + ':' + sec; 
    
  }
  
  keepScore (matchesFound) {
    document.getElementById('score').innerText = matchesFound;
  }

  flipCard (card, flipElements, timer) {
    card.classList.add('flipped');

    if (!flipElements.hasFlippedCard) {
      flipElements.hasFlippedCard = true;
      flipElements.firstCard = card;
      return flipElements;
    }
   
    flipElements.secondCard = card;
    flipElements.hasFlippedCard = false;

    flipElements = this.checkForMatch(flipElements, timer);
    
    return flipElements;
  }

  checkForMatch (flipElements, timer) {
    if (this.getColor(flipElements.firstCard) === this.getColor(flipElements.secondCard)) {
      flipElements.matchesFound+=1;
      this.keepScore(flipElements.matchesFound);
      this.checkGameStatus(flipElements.matchesFound, flipElements.cardsToMatch, timer);
    } else {
      flipElements = this.unflipCards(flipElements); 
    }
    flipElements = this.disableCards(flipElements);
    return flipElements;
  }

  getColor (card) {
    const showFaceElement = card.getElementsByClassName('show-face')[0];
    return showFaceElement.classList[1];
  }

  disableCards (flipElements) {
    flipElements.firstCard = null;
    flipElements.secondCard = null;
    return flipElements;
  }

  unflipCards (flipElements) {
    const a = flipElements.firstCard;
    const b = flipElements.secondCard;
    setTimeout(function() {
      a.classList.remove('flipped');;
      b.classList.remove('flipped');;
    }, 400);
    return flipElements;
  }

  onCardClick (matchesFound, cardsToMatch, timer) {
    let boardCards = [];
    boardCards = document.querySelectorAll('.card');
    var firstCard, secondCard;
    let flipElements = {
      currentLevel: parseInt(document.getElementById('level').textContent),
      hasFlippedCard: false, 
      firstCard: firstCard, 
      secondCard: secondCard,
      matchesFound: matchesFound,
      cardsToMatch: cardsToMatch
    };
    var myListener;
    const mainClass = this;

    boardCards.forEach((card) => { 
      myListener = function() {
        flipElements = mainClass.flipCard(this, flipElements, timer);
      };
      card.addEventListener('click', myListener)
    });
  }
  
  checkGameStatus (matchesFound, cardsToMatch, timer) {
    if (matchesFound == cardsToMatch) {
      this.showPopup('win');
      clearInterval(timer);
    }
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