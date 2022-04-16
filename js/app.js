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

const movesCounter = document.querySelector(".moves");
let openCard = [];

// initGame();

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
  deck.innerHTML = cardTemplate.join("");
}
initGame();
var cards = document.querySelectorAll(".card");
cards.forEach((card) => {
  card.addEventListener("click", function (e) {
    console.log("asdsad");
    // if (openCard.length < 3) {
    //   card.classList.add("open", "show");
    // }
    if (
      !card.classList.contains("open") &&
      !card.classList.contains("show") &&
      !card.classList.contains("match")
    ) {
      openCard.push(card);
      card.classList.add("open", "show");

      if (openCard.length == 2) {
        if (openCard[0].dataset.card == openCard[1].dataset.card) {
          openCard.forEach((element) => {
            element.classList.add("open", "show", "match");
          });
          openCard = [];
        } else {
          setTimeout(() => {
            openCard.forEach((element) => {
              element.classList.remove("open", "show");
            });
            openCard = [];
          }, 500);
        }
      }
    }
  });
});
