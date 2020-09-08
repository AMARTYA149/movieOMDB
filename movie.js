
const movieContainer = document.querySelector('#movie_container');


// getting from url
function getQueryParameter(param){
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}


//fetching individual movie through id
async function fetchMovie(id){
  // console.log("Amar");
  let searchQuery = url + '&i=' + id;
  const response = await fetch(searchQuery).catch(error => console.log(error) );
  let data = await response.json();
  console.log(data);
  return data;
}

// making movie display
function makeMovieCard(movie){

    let image = movie.Poster;
    if (image === 'N/A'){
      image = "https://sainfoinc.com/wp-content/uploads/2018/02/image-not-available.jpg"
    }
    movieContainer.innerHTML = `
    <div id="movie_disp">
      <div id="movie_poster">
        <img src=${image} alt=${movie.Title}>
      </div>
      <div id="about_movie">
        <div id="details">

          <div class="sub_sec">
            <span class="field">TITLE </span>
            <span class="value">${movie.Title}</span>
            <i class="far fa-heart" data-id = ""></i>
          </div>

          <div class="sub_sec">
            <span class="field">Year </span>
            <span class="value">${movie.Year}</span>
          </div>

          <div class="sub_sec">
            <span class="field">Genre </span>
            <span class="value">${movie.Genre}</span>
          </div>

          <div class="sub_sec">
            <span class="field">Director </span>
            <span class="value">${movie.Director}</span>
          </div>

          <div class="sub_sec">
            <span class="field">Actors </span>
            <span class="value">${movie.Actors}</span>
          </div>

          <div class="sub_sec">
            <span class="field">Rating </span>
            <span class="value">${movie.imdbRating}</span>
          </div>
        </div>
      </div>
    </div>
    `
}

async function start(){
  const movieId = getQueryParameter('id');
  const movieData = await fetchMovie(movieId);
  console.log("moviedata", movieData);
  makeMovieCard(movieData);
  // console.log("title", movieData.Title);
}

start();