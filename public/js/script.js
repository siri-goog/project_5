function getMovieDetails() {
    $.getJSON('https://api.themoviedb.org/3/movie/popular?api_key=fccb47b5258e28ee874723f58bb8cdc1&language=en-US&page=1')
    .then(result => {
      console.log(result)
      $('.results').show()
      $('.main-content').text(result.original_title)
    })
    .catch(err => {
      // display error
    })
  }
  
  getMovieDetails()
  
  
  