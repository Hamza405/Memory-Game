// define Cards Icons
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

// define Dom elements
const movesCounter = document.querySelector(".moves");
const restart = document.querySelector(".restart");
let timerWidget = document.querySelector(".timer");
let stars = document.querySelectorAll(".stars");

// define game variables
let moves = 0;
let cardMatched = 0;
let firstClick = false;
let interval;
let sec = 0;
let min = 0;
let openCard = [];
let openedCard = [];

// create one card with here data
function generateCard(card) {
  return `<li class="card" data-card=${card}><i class="fa ${card}"></i></li>`;
}

// shuffle function from stackoverflow
// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array/
function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

// define game timer
function timer() {
  interval = setInterval(function () {
    timerWidget.innerHTML = `0:${min}:${sec}`;
    sec++;
    if (sec == 60) {
      min++;
      sec = 0;
    }
  }, 1000);

  // restart the game and play again
  restart.addEventListener("click", function (e) {
    stars.forEach((star) => star.classList.remove("fill-star"));
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

// Preparing the game to play
function initGame() {
  const deck = document.querySelector(".deck");
  cardTemplate = shuffle(card).map((card) => generateCard(card));
  movesCounter.innerText = moves;
  deck.innerHTML = cardTemplate.join("");
}
initGame();

// draw the cards on browser window
const cards = document.querySelectorAll(".card");
cards.forEach((card) => {
  // click card event
  card.addEventListener("click", function (e) {
    // check if the game has started
    if (firstClick == false) {
      timer();
      firstClick = true;
    }

    // check from card status
    if (
      !card.classList.contains("open") &&
      !card.classList.contains("show") &&
      !card.classList.contains("match")
    ) {
      openCard.push(card);

      //open just 2 cards
      if (openCard.length < 3) {
        card.classList.add("open", "show");

        if (openCard.length == 2) {
          // open the Similar cards
          if (openCard[0].dataset.card == openCard[1].dataset.card) {
            cardMatched += 1;
            openCard.forEach((element) => {
              element.classList.add("open", "show", "match");
            });
            openCard = [];
          } else {
            // close the difference card
            setTimeout(() => {
              openCard.forEach((element) => {
                element.classList.remove("open", "show");
              });
              openCard = [];
            }, 500);
          }

          // refresh counter moves
          moves++;
          movesCounter.innerText = moves;
        }
      }
    }
    // if game has finished
    if (cardMatched >= 8) {
      // stop game and timer
      clearInterval(interval);
      firstClick = false;

      // draw winner stars
      if (min == 0 && sec <= 30) {
        stars.forEach(function (e) {
          e.classList.add("fill-star");
        });
      } else if (min <= 1) {
        stars[0].classList.add("fill-star");
        stars[1].classList.add("fill-star");
      } else {
        stars[0].classList.add("fill-star");
      }

      // winner message
      const message = `Booooooyyyyyyaaaaaa, The monster end the game with ${moves} moves in time ${min}:${sec}`;
      window.alert(message);
    }
  });
});
