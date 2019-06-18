/*
 * Create a list that holds all of your cards
 */

// get cards data from html as node list
const staticCards = document.querySelectorAll('.card');
// assgin staticCards data to array
let shuffledCards = [...staticCards];
//testing 
// console.log("staticCards", staticCards); //nodelist 
// console.log("shuffledCards", shuffledCards); //array

//HTML parnt of cards
let deck = document.querySelector('.deck');

let openCards = [];
let matchingCards = [];

let counterMoves = document.querySelector('.moves');
let moves = 0;
let stars = document.querySelectorAll('.fa-star');

const restartButton = document.querySelector('.restart');

let modelDiv = document.getElementById('modaldiv');
let modelTitle = document.getElementById('modaltitle');
let modleMsg = document.getElementById('modalmsg');
let modalBtn = document.getElementById('modalbtn');

let timer = document.querySelector('.timer');
let hours = 0;
let minutes = 0;
let seconds = 0;
let interval;
let playingTimeTotal;

//Call startGame function when refresh or open page 
document.body.onload = startGame();

//Call resetgame function when press reset button
restartButton.addEventListener('click', function(event) {
    resetgame();
});

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

/**
 * To Shuffle Cards
 * @param {array} array
 * @returns {array} array
 */
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

/**
 * To Start The Game and shuffle cards then append to deck obj
 * @param 
 * @returns 
 */
function startGame() {
    shuffledCards = shuffle(shuffledCards);
    for (let i = 0; i < shuffledCards.length; i++) {
        deck.appendChild(shuffledCards[i]);
    }
    quickViewCards();

    shuffledCards.forEach(function(card) {
        card.addEventListener('click', function(event) {
            if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
                openCards.push(card);
                card.classList.add('open');
                card.classList.add('show');
                if (openCards.length == 2) {
                    if (openCards[0].firstElementChild.className == openCards[1].firstElementChild.className) {
                        matching();
                    } else {
                        notMatching();
                    }
                }
            }
        });
    });
}

/**
 * To Quick view for cards
 * @param 
 * @returns 
 */
function quickViewCards() {
    setTimeout(function() {
        shuffledCards.forEach(function(card) {
            card.classList.add('open');
            card.classList.add('show');
        });
    }, 500);

    setTimeout(function() {
        shuffledCards.forEach(function(card) {
            card.classList.remove('open');
            card.classList.remove('show');
        });
    }, 2000);

    Timer();
}

/**
 * To calculate/start playing Time
 * @param 
 * @returns 
 */
function Timer() {
    interval = setInterval(function() {
        timer.innerHTML = minutes + ':' + seconds;
        seconds++;
        if (seconds == 60) {
            seconds = 0;
            minutes++;
        }
        if (minutes == 60) {
            minutes = 0;
            hours++;
        }
    }, 1000);
}
/**
 * To do changing on cards after notMatching
 * @param 
 * @returns 
 */
function notMatching() {
    setTimeout(function() {
        openCards.forEach(function(card) {
            card.classList.remove('open');
            card.classList.remove('show');
        });
        openCards = [];
    }, 250);
    moveCounter();
}

/**
 * To do changing on cards after matching
 * @param 
 * @returns 
 */
function matching() {
    openCards[0].classList.add('open');
    openCards[0].classList.add('show');
    openCards[0].classList.add('match');

    openCards[1].classList.add('open');
    openCards[1].classList.add('show');
    openCards[1].classList.add('match');

    openCards = [];
    matchingCards.push(openCards);
    moveCounter();
    // 8 pairs of cards
    if (matchingCards.length == 8) {
        winsGame();
    }
}

/**
 * To calculate playing round
 * @param 
 * @returns 
 */
function moveCounter() {
    moves++;
    counterMoves.innerHTML = moves;
    switch (moves) {
        case 6:
            // stars[0].style.color = '#e6e027';
            stars[0].className = 'fa fa-star-o';
            break;
        case 9:
            stars[1].className = 'fa fa-star-o';
            break;
        case 16:
            stars[2].className = 'fa fa-star-o';
            break;
        default:
            break;
    }
}

/**
 * To Start The Game
 * @param 
 * @returns 
 */
function resetgame() {
    openCards = [];
    matchingCards = [];
    moves = 0, hours = 0, minutes = 0, seconds = 0;
    counterMoves.innerHTML = moves;
    stars.forEach(function(star) {
        star.className = 'fa fa-star';
    });

    shuffledCards.forEach(function(card) {
        card.classList.remove('open');
        card.classList.remove('show');
        card.classList.remove('match');
    });

    modelTitle.innerHTML = '<strong>Reset Game</strong>';
    modleMsg.innerHTML = 'Done';
    $('#modaldiv').modal('show');

    clearInterval(interval);
    playingTimeTotal = '';
    startGame();
}

/**
 * To show wins msg
 * @param 
 * @returns 
 */
function winsGame() {
    playingTimeTotal = hours + ':' + minutes + ':' + seconds + 'h/m/s';
    let starsTotal = '';
    if (moves < 6) {
        starsTotal = '<i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i>';
    } else if (moves <= 8 && moves >= 6) {
        starsTotal = '<i class="fa fa-star"></i><i class="fa fa-star"></i>';
    } else if (moves <= 15 && moves >= 9) {
        starsTotal = '</i><i class="fa fa-star"></i>';
    } else if (moves >= 16) {
        starsTotal = '<i class="fa fa-star-o"></i><i class="fa fa-star-o"></i><i class="fa fa-star-o"></i>';
    } else {
        starsTotal = '<i class="fa fa-star-o"></i><i class="fa fa-star-o"></i><i class="fa fa-star-o"></i>';
    }
    modelTitle.innerHTML = '<strong>Congratulations </strong>';
    modleMsg.innerHTML = 'Your are winner' +
        '<br>The Total of time  : ' + playingTimeTotal +
        '<br>The Total of Move  : ' + moves +
        '<br>The Total of stars : ' + starsTotal;
    modalBtn.innerHTML = 'play again';
    modalBtn.addEventListener('click', resetgame);
    $('#modaldiv').modal('show');
}