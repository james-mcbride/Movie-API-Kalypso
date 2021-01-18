"use strict"
const movieSearch = document.getElementById('movieSearchButton')
const movieTitle = document. getElementById('addMovieTitle')
const movieYear = document.getElementById('addMovieYear')
const movieGenre = document.getElementById('addMovieGenre')
const submitMovie = document.getElementById('submitMovie')
const searchDropdown = document.getElementById("searchResults")
const newMovieInput = document.getElementById("newMovieInput")
let movieID="";
function createCard(movieTitle, poster){
    const allRow = document.getElementById('allRow')
    const card = document.createElement('div')
    card.setAttribute('class','card m-3 col-3 w-auto')
    const image = document.createElement('img')
    image.setAttribute('src',`${poster}`)//add json property here
    image.setAttribute('class','card-img-top')
    const cardBody = document.createElement('div')
    cardBody.setAttribute('class','card-body text-center')
    const title = document.createElement('h5');
    title.setAttribute('class','card-title')
    title.innerText = `${movieTitle}` //add Jason object property here
    // const anchor = document.createElement('a')
    // anchor.innerText = 'View Profile'
    // anchor.setAttribute('href','#')
    // anchor.setAttribute('class','btn btn-primary')
    // anchor.setAttribute('data-micromodal-trigger','modal-2')
    const button = document.createElement('button')
    button.setAttribute('type','button')
    button.setAttribute('class','btn btn-primary')
    button.setAttribute('data-toggle','modal')
    button.setAttribute('data-target','#modal2')
    cardBody.appendChild(title)
    cardBody.appendChild(button)
    // cardBody.appendChild(anchor)
    card.appendChild(image)
    card.append(cardBody)
    allRow.appendChild(card)
}
MicroModal.init()

//This function takes a text input, and plugs it into the OMDB API. The OMDB API only returns information for full words. If the API detects a full word,
//it pushes all of the movies that it detects containing that word onto an array. This function is grabbing all of those returned movies from the API, and returning them
//as an array.
function autoFillModal(){
    // movieGenre.placeholder = 'test'
    // movieTitle.placeholder = 'test'
    // movieYear.placeholder = 'test'
    let movieSearch=document.getElementById("newMovieInput").value
    movieSearch.replace(' ', "+")
    retrieveSearchedMovies(movieSearch)



    // movieTitle.placeholder = jsonObj.Search[0].Title
    // movieYear.placeholder = jsonObj.Search[0].Year
}

function retrieveSearchedMoviesGenre(){
    // this commented out promise takes the movies provided by the OMDB API,. accesses the TMDB API, and grabs each movies genre.

    fetch(`https://api.themoviedb.org/3/movie/${movieID}?api_key=${TMDB_TOKEN}&language=en-US`)
        .then(response => response.json())
        .then(image => {
            let genre = image.genres
            let genreString = ""
            genre.forEach(element=>genreString+=element.name+" ")
            movieGenre.placeholder = genreString
        })
        .catch(error => console.log(error))

    /* review was created successfully */
}

//this function will grab the top movie match from the add movies search bar, when the search bar is hit.
function retrieveSearchedMovies(movie) {
    var movieInfo=[]
    fetch(`http://www.omdbapi.com/?s=${movie}&apikey=${OMDB_TOKEN}`)
        .then(response => response.json())
        .then(data => {
            if (data.Response==="True") {
                for (let i = 0; i < data.Search.length; i++) {
                    movieInfo.push(data.Search[i])
                }
            }
            if (movieInfo.length>0){
                movieTitle.placeholder = movieInfo[0].Title
                movieYear.placeholder = movieInfo[0].Year
                movieID = movieInfo[0].imdbID
            }
        })
        .then(data=> retrieveSearchedMoviesGenre())


        .catch(error => console.error(error)); /* handle errors */
    return movieInfo
}

//this function will be run as the search input is typed. It will add add a dropdown suggestion list.
function searchMoviesDropdown(movie) {
     let movieInfo=[]
    fetch(`http://www.omdbapi.com/?s=${movie}&apikey=${OMDB_TOKEN}`)
        .then(response => response.json())
        .then(data => {
            if (data.Response==="True") {
                console.log(data)
                for (let i = 0; i < data.Search.length; i++) {
                    movieInfo.push(data.Search[i])
                }
            }
            if (movieInfo.length>0){
                console.log(movieInfo)
                let dropdownHTML=""
                movieInfo.forEach((element, index) => dropdownHTML+=`<div> ${element.Title}</div>`)
                searchDropdown.innerHTML = dropdownHTML

            }
            console.log(movieID)
        })


        .catch(error => console.error(error)); /* handle errors */
    return movieInfo
}




const getOptions = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
    // body: JSON.stringify(reviewObj),
};

//This promise loads the movies from glitch, and makes a card for each movie in the JSON file.
fetch("https://apple-veil-game.glitch.me/movies", getOptions)
    .then( response => response.json() )
    .then(data => {
        for (let i=0; i<data.length; i++) {
            createCard(data[i].title, data[i].poster)
        }
        //This hides the loading div, which was running up until all of the cards were generated.
        $("#loading").hide()
    })
    /* review was created successfully */
    .catch( error => console.error(error) ); /* handle errors */

//This event listener is waiting for the add movies search bar to be typed in, and will suggest movies as the titles are typed by the user.
newMovieInput.addEventListener("keyup",() =>{
    let movieSearchValue=document.getElementById("newMovieInput").value
    movieSearchValue.replace(' ', "+")
   searchMoviesDropdown(movieSearchValue)

})

// console.log(movieOption)
movieSearch.addEventListener('click',()=>{
    console.log('testing')
    autoFillModal()

})

