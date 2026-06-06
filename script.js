const API_KEY = "2dca580c2a14b55200e784d157207b4d";

const movieContainer = document.getElementById("movies");
const searchInput = document.getElementById("searchInput");

async function loadMovies() {
    const url =
    `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`;

    const res = await fetch(url);
    const data = await res.json();

    showMovies(data.results);
}

function showMovies(movies) {

    movieContainer.innerHTML = "";

    movies.forEach(movie => {

        const poster =
        "https://image.tmdb.org/t/p/w500" +
        movie.poster_path;

        const plexLink =
        `https://watch.plex.tv/search?q=${encodeURIComponent(movie.title)}`;

        movieContainer.innerHTML += `
        <div class="movie-card">

            <img src="${poster}" alt="${movie.title}">

            <div class="movie-info">
                <h3>${movie.title}</h3>

                <p>
                ⭐ ${movie.vote_average.toFixed(1)}
                </p>

                <a
                class="watch-btn"
                href="${plexLink}"
                target="_blank">
                Watch Now
                </a>

            </div>

        </div>
        `;
    });

}

searchInput.addEventListener("keyup", async () => {

    const query = searchInput.value.trim();

    if(query.length < 2){
        loadMovies();
        return;
    }

    const url =
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`;

    const res = await fetch(url);

    const data = await res.json();

    showMovies(data.results);

});

loadMovies();
