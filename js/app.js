// refresher for the game show app
// some test code can be put here
let game;
document.getElementById("btn__reset").addEventListener("click", () => {
  game = new Game();

  let phraseUl = document.getElementById("phrase").firstElementChild;
  let wrongElements = document.querySelectorAll(".wrong");
  let chosenElements = document.querySelectorAll(".chosen");

  while (phraseUl.children.length > 0) {
    let firstLi = phraseUl.firstElementChild;
    firstLi.parentNode.removeChild(firstLi);
  }

  wrongElements.forEach(element => {
    element.classList.remove("wrong");
    element.disabled = false;
  });

  chosenElements.forEach(element => {
    element.classList.remove("chosen");
    element.disabled = false;
  });

  let images = [...document.querySelectorAll("img")];

  for (let i = 0; i < images.length; i++) {
    if (images[i].src.includes("images/lostHeart.png")) {
      images[i].src = "images/liveHeart.png";
    }
  }

  game.startGame();
});
// requires input to be a letter from alphabet
document.addEventListener("keyup", event => {
  console.log(event);
  game.handleInteraction(event);
});
// my event listener for keyboard input
document.getElementById("qwerty").addEventListener("click", event => {
  if (event.target.nodeName === "BUTTON") {
    game.handleInteraction(event.target);
  }
});