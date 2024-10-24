const RANDOM_QUOTE_API_URL = "http://api.quotable.io/random";
const quoteDisplayElement = document.getElementById("quoteDisplay");
const quoteInputElement = document.getElementById("quoteInput");
const timerElement = document.getElementById("timer");
const newQuoteButtonElement = document.getElementById("newQuoteButton");

let startTime;
let timerInterval;

function getRandomQuote() {
    return fetch(RANDOM_QUOTE_API_URL)
        .then(response => response.json())
        .then(data => data.content);
};

function startTimer() {
    timerElement.innerText = 0;
    startTime = new Date();
    timerInterval = setInterval(() => {
        timerElement.innerText = getTimerTime();
    }, 1000);
};

function getTimerTime() {
    return Math.floor((new Date() - startTime) / 1000);
};

async function renderNewQuote() {
    const randomQuote = await getRandomQuote();
    quoteDisplayElement.innerHTML = "";
    quoteInputElement.value = null;
    quoteInputElement.focus();
    newQuoteButtonElement.classList.add("quote-button-hidden");
    newQuoteButtonElement.classList.remove("quote-button-visible");

    // Splitting randomQuote into single characters to apply styles to each letter.
    randomQuote.split('').forEach(character => {
        const characterSpan = document.createElement('span');
        characterSpan.innerText = character;
        quoteDisplayElement.append(characterSpan);
    });
    startTimer();
}

quoteInputElement.addEventListener('input', (event) => {
    const arrayQuote = quoteDisplayElement.querySelectorAll("span");
    const arrayValue = quoteInputElement.value.split('');
    let correct = true;

    arrayQuote.forEach((characterSpan, index) => {
        const character = arrayValue[index];

        if (character == null) {
            characterSpan.classList.remove('correct');
            characterSpan.classList.remove('incorrect');
            correct = false;
        } else if (character === characterSpan.innerText) {
            characterSpan.classList.add('correct');
            characterSpan.classList.remove('incorrect');
        } else {
            characterSpan.classList.add('incorrect');
            characterSpan.classList.remove('correct');
            correct = false;
        }
    });

    if (correct && timerInterval) {
        newQuoteButtonElement.classList.add("quote-button-visible");
        newQuoteButtonElement.classList.remove("quote-button-hidden");
        clearInterval(timerInterval);
        timerInterval = null;
    }
});

renderNewQuote();