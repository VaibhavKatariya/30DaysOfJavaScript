const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const newQuoteBtn = document.getElementById('new-quote');
const tweetQuoteBtn = document.getElementById('tweet-quote');

function getRandomQuote() {
  fetch('https://api.quotable.io/random')
    .then(response => response.json())
    .then(data => {
      const randomIndex = Math.floor(Math.random() * data.length);
      const randomQuote = data[randomIndex];
      quoteText.textContent = `"${randomQuote.text}"`;
      authorText.textContent = randomQuote.author ? `- ${randomQuote.author}` : '- Unknown';
      changeBackgroundColor();
    });
}

function tweetQuote() {
  const quote = quoteText.textContent;
  const author = authorText.textContent;
  const tweetUrl = `https://twitter.com/intent/tweet?text=${quote} ${author}`;
  window.open(tweetUrl, '_blank');
}

function changeBackgroundColor() {
  const randomColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;
  document.body.style.backgroundColor = randomColor;
}

newQuoteBtn.addEventListener('click', getRandomQuote);
tweetQuoteBtn.addEventListener('click', tweetQuote);

// Fetch the initial quote when page loads
getRandomQuote();
