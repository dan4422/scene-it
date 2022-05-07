data = JSON.parse(localStorage.getItem('watchlist'))
const mainDiv = document.querySelector('#results')

function renderMovies(movies) {
    movieHtmlArray = movies.map(function(currentMovie) {
        return `
        <div class="movie card col-2 ms-4 p-0 mb-3 mx-auto">
        <img src="${currentMovie.Poster}" alt="movie poster">
            <div class="card-body bg-dark text-white text-center">
                <h5 class="card-title">${currentMovie.Title}</h5>
                <h6 class="text-white">${currentMovie.Year}</h6>
                <button class="bg-info remove-button" data-imdbid="${currentMovie.imdbID}" type="submit">Remove</button>
            </div>
        </div>`
    })
    mainDiv.innerHTML = movieHtmlArray.join('')
}

function removeMovie(movieID) {
    let watchlistJSON = localStorage.getItem('watchlist')
    let watchlist = JSON.parse(watchlistJSON)
    const movie = watchlist.find((currentMovie) => {
        return currentMovie.imdbID == movieID
    })

    if (watchlist == null) {
        watchlist = []
    }

    const newWatchlist = watchlist.filter(data => data.imdbID != movieID)
    watchlistJSON = JSON.stringify(newWatchlist)
    localStorage.setItem('watchlist', watchlistJSON)
    renderMovies(newWatchlist)
}

renderMovies(data)

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-button')) {
        const movieID = e.target.dataset.imdbid
        removeMovie(movieID)
        // e.target.parentElement.parentElement.remove()
    }
})