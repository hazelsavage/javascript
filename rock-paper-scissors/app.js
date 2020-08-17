const game = () => {
  let pScore = 0;
  let cScore = 0;

  //start the game: when the 'play' button pressed,
  //hides the 'intro screen' elements and unhides the 'playing a match' elements.
  const startGame = () => {
    const playBtn = document.querySelector(".intro button");
    const introScreen = document.querySelector(".intro");
    const match = document.querySelector(".match");

    playBtn.addEventListener("click", () => {
      introScreen.classList.add("fadeOut");
      match.classList.add("fadeIn");
    });
  };

  //Play a match
  const playMatch = () => {
    const options = document.querySelectorAll(".options button");
    const playerHand = document.querySelector(".player-hand");
    const computerHand = document.querySelector(".computer-hand");
    const hands = document.querySelectorAll(".hands img");

    hands.forEach((hand) => {
      hand.addEventListener("animationend", function () {
        this.style.animation = null;
      });
    });

    //Computer makes a random choice
    const computerOptions = ["rock", "paper", "scissors"];

    options.forEach((option) => {
      option.addEventListener("click", function () {
        const computerNumber = Math.floor(Math.random() * 3);
        const computerChoice = computerOptions[computerNumber];

        //Animation
        playerHand.src = "./assets/rock.png";
        computerHand.src = "./assets/rock.png";
        playerHand.style.animation = "shakePlayer 2s ease";
        computerHand.style.animation = "shakeComputer 2s ease";

        setTimeout(() => {
          //Call 'compare hands' to compare player choice to computer choice
          const whoWon = compareHands(this.textContent, computerChoice);

          //Update the images to match what was chosen
          playerHand.src = `./assets/${this.textContent}.png`;
          computerHand.src = `./assets/${computerChoice}.png`;

          winState(whoWon);
        }, 2000);
      });
    });
  };

  //a function to update the score text
  //It's called from within 'win state' as it needs to be done after those things
  const updateScore = () => {
    const playerScore = document.querySelector(".player-score p");
    const computerScore = document.querySelector(".computer-score p");
    playerScore.textContent = pScore;
    computerScore.textContent = cScore;
  };

  //We get who won from 'compare hands' and use it
  //to update the win text and score variables.
  const winState = (whoWon) => {
    const winner = document.querySelector(".winner");
    winner.textContent = `${whoWon} Wins!`;

    if (whoWon === "Player") {
      pScore++;
    } else if (whoWon === "Computer") {
      cScore++;
    } else {
      //Add a bit more text to the 'winner' string.
      winner.textContent += " It's a tie.";
    }

    updateScore();
  };

  //A function to compare the choices and see who wins the round
  const compareHands = (playerChoice, computerChoice) => {
    //I changed this section to reduce the code duplication a bit!

    let whoWon = null;

    if (playerChoice === computerChoice) {
      whoWon = "Nobody";
    } else if (playerChoice === "rock") {
      if (computerChoice === "scissors") {
        whoWon = "Player";
      } else {
        whoWon = "Computer";
      }
    } else if (playerChoice === "paper") {
      if (computerChoice === "scissors") {
        whoWon = "Computer";
      } else {
        whoWon = "Player";
      }
    } else {
      //if we got to here, player must've chosen scissors.
      if (computerChoice == "rock") {
        whoWon = "Computer";
      } else {
        whoWon = "Player";
      }
    }
    return whoWon;
  };

  //call all the inner functions
  startGame();
  playMatch();
};

//call the game function
game();
