const card = [
  "fa-diamond",
  "fa-diamond",
  "fa-paper-plane-o",
  "fa-paper-plane-o",
  "fa-anchor",
  "fa-anchor",
  "fa-bolt",
  "fa-bolt",
  "fa-cube",
  "fa-cube",
  "fa-leaf",
  "fa-leaf",
  "fa-bicycle",
  "fa-bicycle",
  "fa-bomb",
  "fa-bomb",
];
let openCard = [];
let openedCard = [];

const movesCounter = document.querySelector(".moves");
const restart = document.querySelector(".restart");
let timerWidget = document.querySelector(".timer");
let moves = 0;
let cardMatched = 7;
let firstClick = false;
let interval;
let sec = 0;
let min = 0;

function generateCard(card) {
  return `<li class="card" data-card=${card}><i class="fa ${card}"></i></li>`;
}

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function initGame() {
  const deck = document.querySelector(".deck");
  cardTemplate = shuffle(card).map((card) => generateCard(card));
  movesCounter.innerText = moves;
  deck.innerHTML = cardTemplate.join("");
}

function timer() {
  interval = setInterval(function () {
    timerWidget.innerHTML = `0:${min}:${sec}`;
    sec++;
    if (sec == 60) {
      min++;
      sec = 0;
    }
  }, 1000);

  restart.addEventListener("click", function (e) {
    clearInterval(interval);
    timerWidget.innerHTML = "0:0:0";
    cards.forEach((card) => {
      card.classList.remove("open", "show", "match");
    });
    firstClick = false;
    moves = 0;
    min = 0;
    sec = 0;
    openedCard = [];
    movesCounter.innerText = moves;
  });
}

initGame();

const cards = document.querySelectorAll(".card");
cards.forEach((card) => {
  card.addEventListener("click", function (e) {
    if (firstClick == false) {
      timer();
      firstClick = true;
    }
    if (
      !card.classList.contains("open") &&
      !card.classList.contains("show") &&
      !card.classList.contains("match")
    ) {
      openCard.push(card);
      if (openCard.length < 3) {
        card.classList.add("open", "show");

        if (openCard.length == 2) {
          if (openCard[0].dataset.card == openCard[1].dataset.card) {
            cardMatched += 1;
            openCard.forEach((element) => {
              element.classList.add("open", "show", "match");
            });
            openedCard.push(openCard[0]);
            openedCard.push(openCard[1]);
            openCard = [];
          } else {
            setTimeout(() => {
              openCard.forEach((element) => {
                element.classList.remove("open", "show");
              });
              openCard = [];
            }, 500);
          }
          moves++;
          movesCounter.innerText = moves;
        }
      }
    }
    if (openedCard.length >= 16) {
      clearInterval(interval);
      firstClick = false;
      const message = `Booooooyyyyyyaaaaaa, The monster end the game with ${moves} moves in time ${min}:${sec}`;
      window.alert(message);
    }
  });
});
