  const displaySection = document.getElementById('display_section');
  const notFound = document.getElementById('notfound');
  
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
      <a href="#">${name}</a>  
      </div>
      <div class="heart">
        <i class="far fa-heart" data-id = "${id}"></i>
      </div>
    </div>
    `
  displaySection.appendChild(card);
  // console.log(card);
  }
  
  
  function addCardsToDisplaySection(data){
    displaySection.innerHTML = "";

        for(const item of data.Search){
          // console.log(item);
          // console.log(item.Title);
          // console.log(item.Poster);
          makeCards(item.Poster, item.Title, item.imdbID);
        }
  }
  
  
  async function fetchRequest(url){
    // console.log("Amar");
    const response = await fetch(url).catch(error => console.log(error) );
    // console.log(response);
    data = await response.json();
    return data;
  }
  
  function displayNotFoundActive(){
    // console.log('called');
    notFound.style["display"] = "flex";
  }

  function displayNotFoundInactive(){
    notFound.style["display"] = "none";
  }
  
  document.getElementById('search-bar').addEventListener('keyup',async function(e){
    var data;
    if(this.value.length >= 3 || e.keyCode == 13){
  
    searchMovie = document.getElementById('search-bar').value;
    searchQuery = url + '&s=' + searchMovie;
    let data = await fetchRequest(searchQuery);
   
        if(data.Response === 'False')
        {
          displayNotFoundActive();          
          return;
        } 
        if(typeof data.Search !== 'undefined'){
          addCardsToDisplaySection(data);
        } 
    } 
    else if(this.value.length < 2){
      displayNotFoundInactive();
      displaySection.innerHTML = "";
    }
  });
  
  