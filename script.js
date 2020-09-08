  const displaySection = document.getElementById('display_section');
  const notFound = document.getElementById('notfound');
  

  // making movie cards
  function makeCards(image, name, id){
    var card = document.createElement("div");
    card.setAttribute("class", "char_card");
    if (image === 'N/A'){
      image = "https://sainfoinc.com/wp-content/uploads/2018/02/image-not-available.jpg"
    }
    card.innerHTML = `
    <div class="photo_section">
      <img src=${image} alt="">
    </div>
    <div class="intro">
      <div class="movie_name">
      <a href="movie.html?id=${id}">${name}</a>  
      </div>
      <div class="heart">
        <i class="far fa-heart" data-id = "${id}"></i>
      </div>
    </div>
    `
  displaySection.appendChild(card);
  // console.log(card);
  }
  
  // adding movie card to display section
  function addCardsToDisplaySection(data){
    displaySection.innerHTML = "";

        for(const item of data.Search){
          // console.log(item);
          // console.log(item.Title);
          // console.log(item.Poster);
          makeCards(item.Poster, item.Title, item.imdbID);
        }
  }
  
  
  // fetching movies
  async function fetchRequest(url){
    // console.log("Amar");
    const response = await fetch(url).catch(error => console.log(error) );
    // console.log(response);
    data = await response.json();
    return data;
  }
  

  //handling found/not found
  function displayNotFoundActive(){
    // console.log('called');
    notFound.style["display"] = "flex";
  }
  function displayNotFoundInactive(){
    notFound.style["display"] = "none";
  }
  

  // searching and passing movie data to fetch request
  document.getElementById('search-bar').addEventListener('keyup',async function(e){
    var data;
    if(this.value.length >= 3 || e.keyCode == 13){
  
    searchMovie = document.getElementById('search-bar').value;
    searchQuery = url + '&s=' + searchMovie;
    let data = await fetchRequest(searchQuery);
        // console.log(data);
        // console.log(data.Error);
        if(data.Error === 'Movie not found!' && displaySection !== "")
        {
          notFound.style["display"] = "flex"; 
          displaySection.innerHTML = "";
          // console.log(displaySection);
          return;
        } else if(typeof data.Search !== 'undefined'){
          displaySection.innerHTML = "";
          notFound.style["display"] = "none";
          addCardsToDisplaySection(data);
        } 
    } 
    else if(this.value.length < 2){
      // console.log("section checkl");
      displaySection.innerHTML = "";
      notFound.style["display"] = "none";
    }
  });
  
  