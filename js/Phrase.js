//one giant class here OOP
class Phrase {
    constructor(phrase) {
      this.phrase = phrase.toLowerCase();
    }
    addPhraseToDisplay() {
      let phraseSec = document.getElementById("phrase");
      let ul = phraseSec.firstElementChild;
  
      this.phrase.split("").forEach(ch => {
         let newElement = document.createElement("li");
         newElement.innerText = ch;
            if (ch === " ") {
          newElement.className = "space";
        } else {
          newElement.classList.add("hide");
          newElement.classList.add("letter");
          newElement.classList.add(ch);
        }
        ul.appendChild(newElement);
      });
    }
    // returns boolean based on user input
    checkLetter(letter) {
      return this.phrase.includes(letter);
    }
    // change classes on a letter 
    showMatchedLetter(letter) {
      let keys = document.querySelectorAll(`li.${letter}`);
      keys.forEach(key => {
        key.classList.remove("hide");
        key.classList.add("alter");
        key.classList.add("show");
        setTimeout(function() {
          key.classList.remove("alter");
        }, 1000);
      });
    }
  }