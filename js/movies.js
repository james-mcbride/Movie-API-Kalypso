"use strict"
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
    const anchor = document.createElement('a')
    anchor.innerText = 'View Profile'
    anchor.setAttribute('href','#')
    anchor.setAttribute('class','btn btn-primary')
    cardBody.appendChild(title)
    cardBody.appendChild(anchor)
    card.appendChild(image)
    card.append(cardBody)
    allRow.appendChild(card)
}
console.log('test')


//This function takes a text input, and plugs it into the OMDB API. The OMDB API only returns information for full words. If the API detects a full word,
//it pushes all of the movies that it detects containing that word onto an array. This function is grabbing all of those returned movies from the API, and returning them
//as an array.

function retrieveSearchedMovies(movie) {
    var movieInfo=[]
    fetch(`http://www.omdbapi.com/?s=${movie}&apikey=${OMDB_TOKEN}`)
        .then(response => response.json())
        .then(data => {
            if (data.Response==="True") {
                console.log(data)
                for (let i = 0; i < data.Search.length; i++) {
                    movieInfo.push(data.Search[i])
                }
            }
            return data
        })

        //this commented out promise takes the movies provided by the OMDB API,. accesses the TMDB API, and grabs each movies genre.
        // .then(data=> {
        //         // console.log(data)
        //         if (data.Response==="True") {
        //             for (let i = 0; i < data.Search.length; i++) {
        //                 fetch(`https://api.themoviedb.org/3/movie/${data.Search[i].imdbID}?api_key=${TMDB_TOKEN}&language=en-US`)
        //                     .then(response => response.json())
        //                     .then(image => {
        //                         movieInfo[i].genre = image.genres
        //                         return image;
        //                     })
        //                     .catch(error => console.log(error))
        //             }
        //         }
        //         return data
        //     })
        // /* review was created successfully */
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

//This jquery event listener tracks any typing in the add-movie input bar, and runs the retrieveSearchedMovies() function to grab any matches from OMDB API
$("#newMovieInput").keypress(function(event){
    let movieSearch=$("#newMovieInput").val();
    movieSearch.replace(' ', "+")
    let suggestedMovies=retrieveSearchedMovies(movieSearch)

    console.log(suggestedMovies)
    // if (suggestedMovies[0].Title){
    //     console.log()
    //     $("#searchResults").html(suggestedMovies[0].Title)
    // }

})





