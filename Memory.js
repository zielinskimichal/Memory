let name;
let numberOfPairs;
let cardPosition = [];
let idsToCheck = [];
let flagCardOne = false;
let flagCardTwo = false;
let movesCounter = 0;

function initMemory() {
  document.querySelector(".nextStep").addEventListener("click", e => {
    e.preventDefault();
    name = document.querySelector(".name").value;
    numberOfPairs = document.querySelector(".pairs").value;
    let temp = document.querySelector("form");
    temp.parentNode.removeChild(temp);
    temp = document.querySelector("body");
    let newCardRow = document.createElement("div");
    newCardRow.classList.add("cardRow");
    temp.appendChild(newCardRow);
    for (let i = 0; i < 2 * numberOfPairs; i++) {
      let newCard = document.createElement("div");
      newCard.classList.add("oneCard");
      newCardRow.appendChild(newCard);
      let newFront = document.createElement("div");
      newFront.classList.add("front");
      newCard.appendChild(newFront);
      let newBack = document.createElement("div");
      newBack.classList.add("back");
      newBack.id = i + 1;
      newCard.appendChild(newBack);
    }
    let newWrapper = document.createElement("div");
    newWrapper.classList.add("wrapper");
    document.querySelector("body").appendChild(newWrapper);
    let newMovesInfo = document.createElement("div");
    newMovesInfo.classList.add("movesCounterName");
    newMovesInfo.innerHTML = "Liczba ruchów:";
    newWrapper.appendChild(newMovesInfo);
    let newElement = document.createElement("div");
    newElement.classList.add("movesCounter");
    newWrapper.appendChild(newElement);
    newElement.innerHTML = movesCounter;
    setClicksOnCards();
    getPictures();
  });
}

function getPictures() {
  let dogUrl = "https://dog.ceo/api/breeds/image/random/";
  dogUrl += numberOfPairs;
  fetch(dogUrl)
    .then(response => {
      return response.json();
    })
    .then(data => {
      for (let i = 0; i < numberOfPairs; i++) {
        cardPosition.push(data.message[i]);
        cardPosition.push(data.message[i]);
      }
    })
    .then(() => {
      putPictures();
    });
}

function putPictures() {
  cardPosition.sort(() => Math.random() - 0.5);
  for (let i = 1; i < numberOfPairs * 2 + 1; i++) {
    document.getElementById(i).style.background = `url(${cardPosition[i - 1]})`;
    document.getElementById(i).style.backgroundRepeat = "no-repeat";
    document.getElementById(i).style.backgroundSize = "250px 250px";
  }
}

function handleTwoFlipped() {
  movesCounter++;
  refreshMovesCounter();
  let flippedCards = document.querySelectorAll(".flipped");
  let flag = false;
  if (
    cardPosition[parseInt(idsToCheck[0]) - 1] ==
    cardPosition[parseInt(idsToCheck[1]) - 1]
  ) {
    flag = true;
  }
  if (flag === false) {
    setTimeout(() => {
      flippedCards.forEach(element => element.classList.remove("flipped"));
      flagCardOne = false;
      flagCardTwo = false;
    }, 1250);
    idsToCheck = [];
  } else if (flag === true) {
    flagCardOne = false;
    flagCardTwo = false;
    idsToCheck.forEach(e => {
      document.getElementById(e).parentElement.classList.add("flippedForever");
    });
    if (
      document.querySelectorAll(".flippedForever").length ==
      numberOfPairs * 2
    ) {
      setTimeout(() => {
        gameOver();
      }, 1250);
    }
    idsToCheck = [];
  }
}

function setClicksOnCards() {
  let cards = document.querySelectorAll(".oneCard");
  cards.forEach(element =>
    element.addEventListener("click", e => {
      if ((flagCardOne == true && flagCardTwo == true) == false) {
        idsToCheck.push(e.target.nextElementSibling.id);
        e.target.parentElement.classList.add("flipped");
        if (flagCardOne == false) flagCardOne = true;
        else if (flagCardOne == true) {
          flagCardTwo = true;
          if (idsToCheck[0] == idsToCheck[1]) {
            flagCardTwo = false;
            idsToCheck.pop();
          }
          if (flagCardTwo) handleTwoFlipped();
        }
      }
    })
  );
}

function refreshMovesCounter() {
  document.querySelector(".movesCounter").innerHTML = movesCounter;
}

function gameOver() {
  let temp = document.querySelector(".cardRow");
  temp.parentNode.removeChild(temp);
  temp = document.querySelector(".wrapper");
  temp.parentNode.removeChild(temp);
  temp = document.createElement("div");
  temp.classList.add("finishedGame");
  temp.innerHTML = `Brawo ${name}! Udało Ci się wygrać w ${movesCounter} ruchach! Aby zagrać jeszcze raz odśwież stronę.`;
  document.querySelector("body").appendChild(temp);
}

initMemory();
