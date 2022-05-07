const mainDiv = document.querySelector('#results')

function renderMovies(movies) {
    movieHtmlArray = movies.map(function(currentMovie) {
        return `
        <div class="movie card col-2 ms-4 p-0 mb-3 mx-auto">
        <img src="${currentMovie.Poster}" alt="movie poster">
            <div class="card-body bg-dark text-white text-center">
                <h5 class="card-title">${currentMovie.Title}</h5>
                <h6 class="text-white">${currentMovie.Year}</h6>
                <button class="bg-info add-button" data-imdbid="${currentMovie.imdbID}" type="submit">Add</button>
            </div>
        </div>`
    })
    mainDiv.innerHTML = movieHtmlArray.join('')
}

const myForm = document.querySelector('#search-form')
myForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const searchString = document.querySelector('.search-bar').value
    const urlEncodedSearchString = encodeURIComponent(searchString)
    fetch(`http://www.omdbapi.com/?apikey=59354c85&s=${urlEncodedSearchString}`)
        .then(res => res.json())
        .then(data => {
            renderMovies(data.Search)
            movieData = data.Search
        })
    myForm.reset()
})

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-button')) {
        const movieID = e.target.dataset.imdbid
        saveToWatchList(movieID)
    }
})

function saveToWatchList(movieID) {
    const movie = movieData.find((currentMovie) => {
        return currentMovie.imdbID == movieID
    })
    let watchlistJSON = localStorage.getItem('watchlist')
    let watchlist = JSON.parse(watchlistJSON)

    if (watchlist == null) {
        watchlist = []
    }

    watchlist.push(movie)
    watchlistJSON = JSON.stringify(watchlist)
    localStorage.setItem('watchlist', watchlistJSON)
}