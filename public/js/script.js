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
  let base_url = ""
  let poster_size = ""
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
  
$(document).ready(function(){
  getGenres()
  getMovies()
  $("#searchBtn").click(function(){
    console.log("test")
  });
});
  
  
