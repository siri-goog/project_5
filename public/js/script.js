let base_url = ""
let poster_size = ""

function apiConnection() {
  // API Connection
  $.getJSON('https://api.themoviedb.org/3/configuration?api_key=fccb47b5258e28ee874723f58bb8cdc1')
  .then(result => {
    base_url = result.images.base_url
    poster_size = result.images.poster_sizes[2]
  })
  .catch(err => {
    // display error
    console.log("Errer: API connection")
  })
}

function getGenres() {
  $.getJSON('https://api.themoviedb.org/3/genre/movie/list?api_key=fccb47b5258e28ee874723f58bb8cdc1&language=en-US')
  .then(result => {
    const genreSelect = $('body').find('#genre')
    for(var i = 0; i < result.genres.length; i++) {
      const genreOption = $('<option>')
      genreOption.prop('value', result.genres[i].id)
      genreOption.text(result.genres[i].name)
      genreSelect.append(genreOption)
    }
  })
  .catch(err => {
    // display error
    console.log("Error: API [Get genres]")
  })
}

function getMovies() {
  apiConnection()

  $.getJSON('https://api.themoviedb.org/3/movie/popular?api_key=fccb47b5258e28ee874723f58bb8cdc1&language=en-US&page=1')
  .then(result => {
    const movieRow = $('body').find('.row')
    for(var i = 0; i < result.results.length; i++) {
      const movieColumn = $('<div>')
      movieColumn.addClass('column')
      movieRow.append(movieColumn)

      const movieCard = $('<div>')
      movieCard.addClass('card')
      movieColumn.append(movieCard)

      const moviePoster = $('<img>')
      const posterPath = base_url + poster_size + "/" + result.results[i].poster_path
      moviePoster.prop('src', posterPath)
      movieCard.append(moviePoster)

      const br = $('<br>')
      movieCard.append(br)

      const movieTitle = $('<a>')
      movieTitle.prop('id', result.results[i].id)
      movieTitle.prop('href', "/movie/" + result.results[i].id)
      movieTitle.text(result.results[i].title)
      movieCard.append(movieTitle)
    }
  })
  .catch(err => {
    // display error
    console.log("Error: API [Get movies]")
  })
}

function getDetails(movie_id) {
  apiConnection()

  var url = 'https://api.themoviedb.org/3/movie/'+ movie_id +'?api_key=fccb47b5258e28ee874723f58bb8cdc1&language=en-US'
  $.getJSON(url)
  .then(result => {
    console.log(result)
    const movieDetails = $('body').find('#movieDetails')

    const moviePoster = $('<img>')
    const posterPath = base_url + poster_size + "/" + result.poster_path
    moviePoster.prop('src', posterPath)
    movieDetails.append(moviePoster)

    const movieTitle = $('<h2>')
    movieTitle.text(result.original_title)
    movieDetails.append(movieTitle)

    const movieYear = $('<p>')
    movieYear.text(result.release_date)
    movieDetails.append(movieYear)

    const movieSynopsis = $('<p>')
    movieSynopsis.text(result.overview)
    movieDetails.append(movieSynopsis)
  })
  .catch(err => {
    // display error
    console.log("Error: API [Get movie details]")
  })
}

function searchMovies(title) {
  apiConnection()

  const endpoint = 'https://api.themoviedb.org/3/search/movie?query='+ title +'&api_key=fccb47b5258e28ee874723f58bb8cdc1'
  $.getJSON(endpoint)
  .then(result => {
    console.log(result.results)
    const movieRow = $('body').find('.row')
    for(var i = 0; i < result.results.length; i++) {
      const movieColumn = $('<div>')
      movieColumn.addClass('column')
      movieRow.append(movieColumn)

      const movieCard = $('<div>')
      movieCard.addClass('card')
      movieColumn.append(movieCard)

      if (result.results[i].poster_path != null) {
        const moviePoster = $('<img>')
        const posterPath = base_url + poster_size + "/" + result.results[i].poster_path
        moviePoster.prop('src', posterPath)
        movieCard.append(moviePoster)
      }

      const br = $('<br>')
      movieCard.append(br)

      const movieTitle = $('<a>')
      movieTitle.prop('id', result.results[i].id)
      movieTitle.prop('href', "/movie/" + result.results[i].id)
      movieTitle.text(result.results[i].title)
      movieCard.append(movieTitle)
    }
  })
  .catch(err => {
    // display error
    console.log("Error: API [Search movies]")
  })
}

$(document).ready(function(){
  $("#searchBtn").click(function(){
    var searchTitle = $( "input[type=text][name=searchTitle]" ).val()
    searchMovies(searchTitle)
  });
  getGenres()
  getMovies()
  if ($( "#movie_id" ).text()) {
    getDetails($( "#movie_id" ).text())
  }
});
  
  
