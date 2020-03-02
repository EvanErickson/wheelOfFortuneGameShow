//game file for the game show app
//test code here

class Game {
    constructor() {
      this.missed = 0;
      this.phrases = [
        new Phrase("Bandersnatch is a film on netflix"),
        new Phrase("You can do it if you try"),
        new Phrase("This game is fun"),
        new Phrase("How many burgers are there"),
        new Phrase("Program for life")
      ];
      this.activePhrase = null;
    }
  
    // gets a random phrase for the game to use
    startGame() {
    
      setTimeout(function() {
        document.getElementById("overlay").style.display = "none";
      }, 250);
  
      this.activePhrase = this.getRandomPhrase();
      this.activePhrase.addPhraseToDisplay();
    }
  
    // gets random phrase 
    getRandomPhrase() {
      let randomNum = Math.floor(Math.random() * 5);
      return this.phrases[randomNum];
    }
    // keyboard click function
    handleInteraction(target) {
      const buttons = [...document.querySelectorAll(".key")];
      if (target.type === "keyup") {
        if (target.code.substring(0, 3) === "Key") {
          if (this.activePhrase.checkLetter(target.key)) {
            for (let i = 0; i < buttons.length; i++) {
              if (buttons[i].innerText === target.key) {
                buttons[i].classList.add("chosen");
                buttons[i].disabled = true;
                this.activePhrase.showMatchedLetter(target.key);
                if (this.checkForWin()) {
                  this.gameOver("win");
                }
              }
            }
          } else {
            for (let i = 0; i < buttons.length; i++) {
              if (buttons[i].innerText === target.key) {
                if (buttons[i].classList.contains("wrong")) {
                  return;
                } else {
                  buttons[i].classList.add("wrong");
                  buttons[i].disabled = true;
                  this.removeLife();
                }
              }
            }
          }
        }
      } else {
        target.disabled = true;
        let letter = target.innerText;
  
        if (this.activePhrase.checkLetter(letter)) {
          target.classList.add("chosen");
          this.activePhrase.showMatchedLetter(letter);
          if (this.checkForWin()) {
            this.gameOver("win");
          }
        } else {
          target.classList.add("wrong");
          this.removeLife();
        }
      }
    }
    // changes game heart on user input
    removeLife() {
      if (this.missed < 4) {
        let images = [...document.querySelectorAll("img")];
  
        for (let i = this.missed; i < images.length; i++) {
          if (images[i].src.includes("images/liveHeart.png")) {
            images[i].src = "images/lostHeart.png";
            break;
          }
        }
        this.missed += 1;
      } else {
        this.gameOver("lose");
      }
    }
    // checks user input for victory
    checkForWin() {
      return !document.querySelector(".hide");
    }
    // show a win/loss based on game input
    gameOver(result) {
      document.getElementById("overlay").style.display = "";
      this.missed = 0;
      let h1 = document.getElementById("game-over-message");
      let overlay = document.getElementById("overlay");
      overlay.classList.remove("start");
  
      if (result === "win") {
        overlay.classList.add("win");
        h1.textContent = "Congratulations, you won!";
      } else {
        overlay.classList.add("lose");
        h1.textContent = "You lost.";
      }
    }
  }