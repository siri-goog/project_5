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

$(document).ready(function(){
  if ($( "#movie_id" ).text()) {
    getDetails($( "#movie_id" ).text())
  }
});
  
  
