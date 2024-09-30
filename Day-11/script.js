const searchForm = document.querySelector('#search-form');
const movieInput = document.querySelector('#movie-input');
const movieDetails = document.querySelector('#movie-details');

searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const movieTitle = movieInput.value.trim();

    if (movieTitle === '') {
        movieDetails.innerHTML = `<p class="error-message">Please enter a movie title.</p>`;
        return;
    }

    try {
        const response = await fetch(`https://www.omdbapi.com/?t=${movieTitle}&apikey=49127ce`);
        const data = await response.json();

        if (data.Response === "False") {
            movieDetails.innerHTML = `<p class="error-message">${data.Error}</p>`;
        } else {
            movieDetails.innerHTML = `
                <img src="${data.Poster !== 'N/A' ? data.Poster : 'no-poster.png'}" alt="${data.Title}">
                <div class="movie-info">
                    <h2>${data.Title} (${data.Year})</h2>
                    <p><strong>Plot:</strong> ${data.Plot}</p>
                    <p><strong>Genre:</strong> ${data.Genre}</p>
                </div>
            `;
        }
    } catch (error) {
        movieDetails.innerHTML = `<p class="error-message">Something went wrong. Please try again later.</p>`;
    }
});
