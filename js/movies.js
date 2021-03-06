"use strict"
const movieSearch = document.getElementById('movieSearchButton')
const movieTitle = document. getElementById('addMovieTitle')
const movieYear = document.getElementById('addMovieYear')
const movieGenre = document.getElementById('addMovieGenre')
const imdbID = document.getElementById('addImdbID')
const submitMovie = document.getElementById('submit')
const searchDropdown = document.getElementById("searchResults")
const newMovieInput = document.getElementById("newMovieInput")
let movieID="";
let loadedMovies=[]
const title = document.getElementById('title')
const rating = document.getElementById('rating')
const Year = document.getElementById('year')
const Genre = document.getElementById('genre')
const director = document.getElementById('director')
const plot = document.getElementById('plot')
const actors = document.getElementById('actors')
const filterButton=document.getElementById("dropdownMenuButton")
let informationButtonID=""
let currentObj={};
let modalImage = document.getElementById("modalImage")
let micromodalImage=document.getElementById("micromodalImage");
let sortingPage=false;
//  fetch("https://quartz-fancy-fog.glitch.me/movies/4", {method: 'DELETE'}).then(function (response){
//     console.log(response);
//   })
// fetch("https://quartz-fancy-fog.glitch.me/movies/5", {method: 'DELETE'}).then(function (response){
//     console.log(response);
// })
function createCard(movieTitle, poster, genre, movieId, favorites){
    const allRow = document.getElementById('allRow')
    const card = document.createElement('div')
    card.setAttribute('class','card m-3 col-3 w-auto')
    card.setAttribute('id',`${movieId}a`)
    const image = document.createElement('img')
    image.setAttribute('src',`${poster}`)//add json property here
    image.setAttribute('class','card-img-top')
    const cardBody = document.createElement('div')
    cardBody.setAttribute('class','card-body text-center')
    const title = document.createElement('h5');
    title.setAttribute('class','card-title')
    title.innerText = `${movieTitle}`
    const button = document.createElement('button')
    button.setAttribute('type','button')
    button.setAttribute('class','btn btn-primary edit')
    button.setAttribute('data-toggle','modal')
    button.setAttribute('data-target','#modal2')
    button.setAttribute("id", `${movieId}b`)
    button.innerText = 'Information'
    const deleteButton = document.createElement('button')
    deleteButton.setAttribute('type','button')
    deleteButton.setAttribute('class','btn btn-danger delete')
    deleteButton.setAttribute('id', movieId)
    deleteButton.innerText = 'Delete'
    cardBody.appendChild(title)
    cardBody.appendChild(button)
    cardBody.appendChild(deleteButton)
    card.appendChild(image)
    card.append(cardBody)


    // const favoriteButton = document.createElement("div")
    // favoriteButton.setAttribute("class", "click" );
    // favoriteButton.innerHTML="<span class=\"fa fa-star-o\"></span>\n" +
    //     "\t<div class=\"ring\"></div>\n" +
    //     "\t<div class=\"ring2\"></div>\n" +
    //     "\t<p class=\"info\">Added to favourites!</p>"
    const favoriteButton = document.createElement("div")
    if (favorites===true){
        favoriteButton.setAttribute("class", "favorite" );
        favoriteButton.setAttribute("id", `${movieId}c`)
        favoriteButton.innerHTML="<div class=\"click active active-2 active-3\">\n" +
            "\t<span class=\"fa fa-star\" aria-hidden='\"true\"'></span>\n" +
            // "\t<div class=\"ring\"></div>\n" +
            // "\t<div class=\"ring2\"></div>\n" +
            "\t<p class=\"info\">Added to favourites!</p>\n" +
            "</div>"
    } else {
        favoriteButton.setAttribute("class", "favorite");
        favoriteButton.setAttribute("id", `${movieId}c`)
        favoriteButton.innerHTML = "<div class=\"click\">\n" +
            "\t<span class=\"fa fa-star-o\"></span>\n" +
            // "\t<div class=\"ring\"></div>\n" +
            // "\t<div class=\"ring2\"></div>\n" +
            "\t<p class=\"info\">Added to favourites!</p>\n" +
            "</div>"
    }
    card.append(favoriteButton);
    allRow.appendChild(card)
    if (!sortingPage) {
        sortMovieGenre(genre, card)
        addMovieToFavorites(card, favorites);
    }
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
            console.log(image);
            let genre = image.genres
            let posterPath=image.poster_path;
            let genreString = ""
            genre.forEach(element=>genreString+=element.name+" ")
            movieGenre.placeholder = genreString
            movieGenre.value = genreString
            micromodalImage.setAttribute('src',`https://image.tmdb.org/t/p/w500/${posterPath}`)
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
                movieTitle.value = movieInfo[0].Title
                movieYear.placeholder = movieInfo[0].Year
                movieYear.value = movieInfo[0].Year
                movieID = movieInfo[0].imdbID
                imdbID.placeholder = movieID
                imdbID.value = movieID
            }
            return data
        })
        .then(data=> {
            retrieveSearchedMoviesGenre()
        })
        .then(()=>{
            submitMovie.classList.remove("disabled");
        })
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
                movieInfo.forEach((element, index) => {
                    if (index<=2) {
                        dropdownHTML += `<div class="dropDownMovie"> ${element.Title}</div>`
                    }
                })
                searchDropdown.innerHTML = dropdownHTML

            }
            console.log(movieID)
        })
        .then(data=> {
            // let movieSearchValue=document.getElementById("newMovieInput").value
            let dropDownElements=document.getElementsByClassName("dropDownMovie")
            for (let i=0; i<dropDownElements.length; i++){
                dropDownElements[i].addEventListener("click", ()=>{
                    document.getElementById("newMovieInput").value=dropDownElements[i].innerText
                    searchDropdown.innerHTML=""

                })
            }
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

const deleteMethod = {
    method: 'DELETE'
}

//This promise loads the movies from glitch, and makes a card for each movie in the JSON file.
fetch("https://quartz-fancy-fog.glitch.me/movies", getOptions)
    .then( response => response.json() )
    .then(data => {
        console.log ("data from glitch:")
        console.log(data)
        for (let i=0; i<data.length; i++) {
            if ((data[i].favorites)===undefined) {
                createCard(data[i].title, data[i].poster, data[i].genre, data[i].id, "none")
                loadedMovies.push([data[i].title, data[i].poster, data[i].genre, data[i].rating.Value, data[i].id, data[i].year, data[i].director, data[i].plot, data[i].actors, data])
            } else{
                createCard(data[i].title, data[i].poster, data[i].genre, data[i].id, data[i].favorites)
                loadedMovies.push([data[i].title, data[i].poster, data[i].genre, data[i].rating.Value, data[i].id, data[i].year, data[i].director, data[i].plot, data[i].actors, data, data[i].favorites])
            }
        }
        //This hides the loading div, which was running up until all of the cards were generated.
        $("#loading").hide()
        return [...document.getElementsByClassName('delete')]
    }).then(buttons=>{
    buttons.forEach(button=>{
        let id = button.id
        button.addEventListener('click',()=>{
            fetch(`https://quartz-fancy-fog.glitch.me/movies/${id}`, deleteMethod)
                .then(response=>console.log(response))
                .catch(error=>console.log(error))
            let card = document.getElementById(`${id}a`)
            let row = card.parentNode
            row.removeChild(card)
        })
    })
    return [...document.getElementsByClassName('edit')]
}).then(editButtons =>{
    editButtons.forEach(button =>{
        let sibling = button.nextElementSibling
        let id = sibling.id
        button.addEventListener('click',()=>{
            fetch(`https://quartz-fancy-fog.glitch.me/movies/${id}`, getOptions)
                .then(response=>response.json())
                .then(data=>{
                    console.log(data)
                    currentObj=data;
                    modalImage.setAttribute('src',`${data.poster}`)
                    informationButtonID=data.id
                    title.placeholder = data.title
                    title.value = data.title
                    if (typeof data.rating === "object") {
                        rating.placeholder = data.rating.Value
                        rating.value = data.rating.Value
                    } else{
                        rating.placeholder = data.rating
                        rating.value = data.rating
                    }
                    Year.placeholder = data.year
                    Year.value = data.year
                    Genre.placeholder = data.genre
                    Genre.value = data.genre
                    director.placeholder = data.director
                    director.value = data.director
                    plot.placeholder = data.plot
                    plot.value = data.plot
                    actors.placeholder = data.actors
                    actors.value = data.actors
                })
        })
    })
})
    /* review was created successfully */
    .catch( error => console.error(error) ); /* handle errors */

//This event listener is waiting for the add movies search bar to be typed in, and will suggest movies as the titles are typed by the user.
newMovieInput.addEventListener("keyup",() =>{
    let movieSearchValue=document.getElementById("newMovieInput").value
    movieSearchValue.replace(' ', "+")
    if (movieSearchValue.length>5) {
        searchMoviesDropdown(movieSearchValue)

    } else if (movieSearchValue.length===0){
        searchDropdown.innerHTML=""
    }


})

// console.log(movieOption)
movieSearch.addEventListener('click',()=>{
    console.log('testing')
    autoFillModal()

})

submitMovie.addEventListener('click',()=>{
    postToDatabase()
})

function postToDatabase(){
    let movie = imdbID.value
    fetch(`http://www.omdbapi.com/?i=${movie}&apikey=${OMDB_TOKEN}`)
        .then(response => response.json())
        .then(data => {
            let movieObj = {
                title: data.Title,
                rating: data.Ratings[1],
                poster: data.Poster,
                year: data.Year,
                genre: data.Genre,
                director: data.Director,
                plot: data.Plot,
                actors: data.Actors,
            }

            return {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(movieObj)
            }

        }).then(postOpt=>{
        fetch("https://quartz-fancy-fog.glitch.me/movies",postOpt)
            .then(response =>console.log(response))
            .catch(error=>console.log(error))
        }).then(data=> {
        setTimeout(() => {
            fetch("https://quartz-fancy-fog.glitch.me/movies", getOptions)
                .then(response => response.json())
                .then(movies => {
                    console.log(movies)
                    let movie = movies[movies.length - 1]
                    console.log(movie)
                    createCard(movie.title, movie.poster, movie.genre, movie.id)
                    loadedMovies.push([movie.title, movie.poster, movie.genre, movie.rating.Value, movie.id, movie.year, movie.director, movie.plot, movie.actors, movie])


                    function movieEditButtons(element) {
                        let deleteButton = document.getElementById(element[4])
                        deleteButton.addEventListener("click", () => {
                            let card = document.getElementById(`${element[4]}a`)
                            let row = card.parentNode
                            row.removeChild(card)
                        })
                        let editButton = document.getElementById(`${element[4]}b`)
                        editButton.addEventListener("click", () => {
                            modalImage.setAttribute('src', `${element[1]}`)
                            informationButtonID = element[4]
                            title.placeholder = element[0]
                            title.value = element[0]
                            rating.placeholder = element[3]
                            rating.value = element[3]
                            Year.placeholder = element[5]
                            Year.value = element[5]
                            Genre.placeholder = element[2]
                            Genre.value = element[2]
                            director.placeholder = element[6]
                            director.value = element[6]
                            plot.placeholder = element[7]
                            plot.value = element[7]
                            actors.placeholder = element[8]
                            actors.value = element[8]
                        })
                    }

                    movieEditButtons(loadedMovies[loadedMovies.length - 1])
                })
        },100)
    })
}


let searchInput=document.getElementById("searchInput")
searchInput.addEventListener("keyup", ()=>{
    let searchInputValue=searchInput.value.toLowerCase()
    let navItems=document.getElementsByClassName("nav-link");
    console.log(navItems)
    let activeTab="";
    for (let i=0; i<navItems.length; i++) {
        if (navItems[i].classList.contains("active")) {
            activeTab = navItems[i].innerText;
        }
    }
    let cards;
    switch (activeTab){
        case "All":
            cards = document.getElementById("allRow").children;
            break;
        case "Favorites":
            cards = document.getElementById("favoriteRow").children;
            break;
        case "Action":
            cards = document.getElementById("actionRow").children;
            break;
        case "Comedy":
            cards = document.getElementById("comedyRow").children;
            break;
        case "Drama":
            cards = document.getElementById("dramaRow").children;
            break;
        case "Romance":
            cards = document.getElementById("romanceRow").children;
            break;
        case "Horror":
            cards = document.getElementById("horrorRow").children;
            break;
        case "Sci-Fi/Fantasy":
            cards = document.getElementById("scififantRow").children;
            break;
    }
    // navItems.forEach(element=>{
    //     if (element.hasClass("active")){
    //         activeTab=element.innerText;
    //     }
    // })
    console.log(cards);
    // let cards = document.getElementsByClassName("card")
    for (let i=0; i<cards.length; i++){
        if (cards[i].classList.contains("card")) {
            let currentCardText = cards[i].innerHTML.toLowerCase()
            if (currentCardText.indexOf(searchInputValue) === -1) {
                cards[i].style["display"] = "none"
            } else if (searchInputValue === "") {
                cards[i].style["display"] = "block"
            }
        }
    }
})

function sortMovieGenre(genre, originalCard){

    let actionRow=document.getElementById("actionRow")
    let comedyRow=document.getElementById("comedyRow")
    let dramaRow=document.getElementById("dramaRow")
    let romanceRow=document.getElementById("romanceRow")
    let horrorRow=document.getElementById("horrorRow")
    let fantasyRow=document.getElementById("scififantRow")
    let movieGenres=genre.split(", ")
    let actionAdventureCounter=0;
    let scifiFantasyCounter=0;
    movieGenres.forEach((element,index) =>{
        let card=originalCard.cloneNode(true)
        if (element==="Action" || element==="Adventure"){
            if (actionAdventureCounter===0) {
                actionRow.appendChild(card)
                actionAdventureCounter++
            }
        } else if(element==="Comedy"){
            comedyRow.appendChild(card)
        } else if(element==="Drama"){
            dramaRow.appendChild(card)
        } else if(element==="Romance"){
            romanceRow.appendChild(card)
        } else if(element==="Horror"){
            horrorRow.appendChild(card)
        } else if(element==="Fantasy" || element==="Sci-Fi"){
            if (scifiFantasyCounter===0) {
                fantasyRow.appendChild(card)
                scifiFantasyCounter++
            }
        }
    })
}

function addMovieToFavorites(originalCard, favoriteBoolean){
    if (favoriteBoolean===true) {
        let card = originalCard.cloneNode(true)
        let favorites = document.getElementById("favoriteRow");
        favorites.appendChild(card);
    }
}

function createSortedCards(sortedCards) {
    sortingPage=true;
    sortedCards.forEach(element => {
        if (element.length>9) {
            createCard(element[0], element[1], element[2], element[4], element[10])
        } else{
            createCard(element[0], element[1], element[2], element[4], "none")
        }
        let deleteButton = document.getElementById(element[4])
        deleteButton.addEventListener("click", () => {
            let card = document.getElementById(`${element[4]}a`)
            let row = card.parentNode
            row.removeChild(card)
        })
        let editButton = document.getElementById(`${element[4]}b`)
        editButton.addEventListener("click", () => {
            modalImage.setAttribute('src',`${element[1]}`)
            informationButtonID=element[4]
            title.placeholder = element[0]
            title.value = element[0]
            rating.placeholder = element[3]
            rating.value = element[3]
            Year.placeholder = element[5]
            Year.value = element[5]
            Genre.placeholder = element[2]
            Genre.value = element[2]
            director.placeholder = element[6]
            director.value = element[6]
            plot.placeholder = element[7]
            plot.value = element[7]
            actors.placeholder = element[8]
            actors.value = element[8]
        })
    })
    sortingPage=false;

}

const alphabetical=document.getElementById("alphabetical")
alphabetical.addEventListener("click", ()=>{
    let sortedCards=loadedMovies.sort(function(a, b){
        if(a[0] < b[0]) { return -1; }
        if(a[0] > b[0]) { return 1; }
        return 0;
    })
    console.log(sortedCards)
    const allRow = document.getElementById('allRow')
    allRow.innerHTML=""
    createSortedCards(sortedCards)
    filterButton.innerText=alphabetical.innerText

})

const reverseAlphabetical=document.getElementById("reverseAlphabetical")
reverseAlphabetical.addEventListener("click", ()=>{
    let sortedCards=loadedMovies.sort(function(a, b){
        if(b[0] < a[0]) { return -1; }
        if(b[0] > a[0]) { return 1; }
        return 0;
    })
    console.log(sortedCards)
    const allRow = document.getElementById('allRow')
    allRow.innerHTML=""

    createSortedCards(sortedCards)
    filterButton.innerText=reverseAlphabetical.innerText

})

const sortButton=document.getElementById("sortButton")
sortButton.addEventListener("click", ()=>{
    console.log(loadedMovies)
    let ratedMovies=loadedMovies.map(movie =>{
        if (typeof movie[3]!=="undefined") {
            movie[3] = Number(movie[3].slice(0, movie[3].length - 1))
        } else{
            movie[3]=0;
        }
        return movie
    })
    let sortedCards=ratedMovies.sort(function(a,b){
        return Number(b[3])-Number(a[3])
    })
    console.log(sortedCards)
    const allRow = document.getElementById('allRow')
    allRow.innerHTML=""
    createSortedCards(sortedCards)
    filterButton.innerText=sortButton.innerText
})

const saveChangesButton=document.getElementById("saveChanges")
saveChangesButton.addEventListener("click", ()=>{
    let changedMovieAttributesObj =currentObj;
    if (title.placeholder !== title.value){
        changedMovieAttributesObj.title=title.value;
    }
    if (rating.placeholder!== rating.value){
        changedMovieAttributesObj.rating = rating.value;
    }
    if(Year.placeholder !==Year.value) {
        changedMovieAttributesObj.year=Year.value;
    }
    if (Genre.placeholder !==Genre.value){
        changedMovieAttributesObj.genre=Genre.value;
    }
    if(director.placeholder !== director.value) {
        changedMovieAttributesObj.director=director.value;
    }
    if(plot.placeholder!==plot.value){
        changedMovieAttributesObj.plot=plot.value;
    }
    if(actors.placeholder!== actors.value){
        changedMovieAttributesObj.actors=actors.value
    }
    const putOptions = {
        method: 'put',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(changedMovieAttributesObj),
    }
    let id = informationButtonID;
    console.log(id)
    console.log(changedMovieAttributesObj)
    fetch(`https://quartz-fancy-fog.glitch.me/movies/${id}`, putOptions)
        .then( response => console.log(response) )
        .catch(error=> console.log(error))

})

//function found online to add button to favorites
$(document).on("click", ".click", function(){
// $('.click').click(function() {
    let clicked = $(this);
    let id = clicked.parent().attr("id");
    let card=clicked.parent().parent()[0];
    let movieId=id.slice(0, id.length-1);
    console.log(movieId)
    let clickedSpan=$(this).children("span")
    let clickedInfo=$(this).children(".info")
    if ($(clickedSpan).hasClass("fa-star")) {
        $(clicked).removeClass('active')
        setTimeout(function() {
            $(clicked).removeClass('active-2')
        }, 30)
        $(clicked).removeClass('active-3')
        setTimeout(function() {
            $(clickedSpan).removeClass('fa-star')
            $(clickedSpan).addClass('fa-star-o')
        }, 15)
    } else {
        $(clicked).addClass('active')
        $(clicked).addClass('active-2')
        setTimeout(function() {
            $(clickedSpan).addClass('fa-star')
            $(clickedSpan).removeClass('fa-star-o')
        }, 150)
        setTimeout(function() {
            $(clicked).addClass('active-3')
        }, 150)
        $(clickedInfo).addClass('info-tog')
        setTimeout(function(){
            $(clickedInfo).removeClass('info-tog')
        },1000)
    }

    if ($(clicked).hasClass("active")) {
        let favoritesRow=document.getElementById("favoriteRow");
        let favoritesCard = card.cloneNode(true);
        favoritesRow.appendChild(favoritesCard);

        fetch(`https://quartz-fancy-fog.glitch.me/movies/${movieId}`, getOptions)
            .then(response => response.json())
            .then(data => {
                data.favorites = true;
                return data;
            })
            .then(data => {
                let putOptions = {
                    method: 'put',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                }
                fetch(`https://quartz-fancy-fog.glitch.me/movies/${movieId}`, putOptions)
                    .then(response => console.log(response))
                    .catch(error => console.log(error))
            })
    } else{
        let favoritesRow=document.getElementById("favoriteRow");
        let favoritesCards = favoritesRow.children;
        let favoriteCard;
        for (let i=0; i<favoritesCards.length; i++){
            if (favoritesCards[i].getAttribute("id")===movieId+"a"){
                favoriteCard=favoritesCards[i];
            }
        }
        favoritesRow.removeChild(favoriteCard);
        fetch(`https://quartz-fancy-fog.glitch.me/movies/${movieId}`, getOptions)
            .then(response => response.json())
            .then(data => {
                data.favorites = false;
                return data;
            })
            .then(data => {
                let putOptions = {
                    method: 'put',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                }
                fetch(`https://quartz-fancy-fog.glitch.me/movies/${movieId}`, putOptions)
                    .then(response => console.log(response))
                    .catch(error => console.log(error))
            })
    }


})





