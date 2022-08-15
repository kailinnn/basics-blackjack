// project 3 black jack

var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

var shuffleCards = function (cardDeck) {
  // Loop over the card deck array once
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    // Select a random index in the deck
    var randomIndex = getRandomIndex(cardDeck.length);
    // Select the card that corresponds to randomIndex
    var randomCard = cardDeck[randomIndex];
    // Select the card that corresponds to currentIndex
    var currentCard = cardDeck[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    // Increment currentIndex
    currentIndex = currentIndex + 1;
  }
  // Return the shuffled deck
  return cardDeck;
}; // Shuffle the elements in the cardDeck array

var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["hearts", "diamonds", "clubs", "spades"];

  // Loop over the suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    var rankCounter = 1;
    while (rankCounter <= 13) {
      // By default, the card name is the same as rankCounter
      var cardName = rankCounter;
      var cardRank = rankCounter;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "ace";
        cardRank = 11;
      } else if (cardName == 11) {
        cardName = "jack";
        cardRank = 10;
      } else if (cardName == 12) {
        cardName = "queen";
        cardRank = 10;
      } else if (cardName == 13) {
        cardName = "king";
        cardRank = 10;
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: cardRank,
      };

      // Add the new card to the deck
      cardDeck.push(card);

      // Increment rankCounter to iterate over the next rank
      rankCounter += 1;
    }

    // Increment the suit index to iterate over the next suit
    suitIndex += 1;
  }

  return cardDeck;
}; // Return the completed card deck

var newDeck = makeDeck();
var cardDeck = shuffleCards(newDeck);
var playerHands = [];
var compHands = [];
var output = "";
var playerCards = "Player has:";
var compCards = "Computer has:";
var playAgainMsg = " Please refresh to play again.";

var checkWinner = function (handsPlayer, handsComp) {
  var playerTotal = 0;
  var compTotal = 0;
  // calculate the sum of ranks
  for (var i = 0; i < handsPlayer.length; i += 1) {
    playerTotal += handsPlayer[i].rank;
    playerCards =
      playerCards + ` ${handsPlayer[i].name} of ${handsPlayer[i].suit}`;
  }
  playerCards = playerCards + ` with sum ${playerTotal}.`;
  for (var i = 0; i < handsComp.length; i += 1) {
    compTotal += handsComp[i].rank;
    compCards = compCards + ` ${handsComp[i].name} of ${handsComp[i].suit}`;
  }
  compCards = compCards + ` with sum ${compTotal}.`;

  if (playerTotal == compTotal) {
    output = "A tie between computer and player!" + playAgainMsg;
  } else if (playerTotal == 21) {
    output = "Player wins Blackjack!" + playAgainMsg;
  } else if (compTotal == 21) {
    output = "Computer wins Blackjack!" + playAgainMsg;
  } else if (playerTotal > compTotal) {
    output = "Player wins with higher hand total!" + playAgainMsg;
  } else if (compTotal > playerTotal) {
    output = "Computer wins with higher hand total!" + playAgainMsg;
  }
}; //Calculate the hands total and generate a summary of cards. Check the winner and edit output with corresponding result.

var main = function (input) {
  compHands[0] = cardDeck.pop();
  playerHands[0] = cardDeck.pop();
  compHands[1] = cardDeck.pop();
  playerHands[1] = cardDeck.pop();
  checkWinner(playerHands, compHands);
  return playerCards + "<br>" + compCards + "<br><br>" + output;
};
