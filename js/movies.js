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

// const upObject={
//     "title": "up",
//     "rating": "5",
//     "poster": "https://m.media-amazon.com/images/M/MV5BMTk3NDE2NzI4NF5BMl5BanBnXkFtZTgwNzE1MzEyMTE@._V1_SX300.jpg",
//     "year": "2009",
//     "genre": "Animation, Adventure, Comedy, Family",
//     "director": "Pete Docter, Bob Peterson(co-director)",
//     "plot": "78-year-old Carl Fredricksen travels to Paradise Falls in his house equipped with balloons, inadvertently taking a young stowaway.",
//     "actors": "Edward Asner, Christopher Plummer, Jordan Nagai, Bob Peterson",
//     "id": 1
// }
//
//
// upObject.poster=""
//
// function getMovieInfo(movie) {
//     fetch(`http://www.omdbapi.com/?s=${movie}&apikey=${OMDB_TOKEN}`)
//         .then(response => response.json())
//         .then(data => {
//             console.log(data)
//             // upObject.poster=data.Search[0].Poster
//             // console.log(upObject.poster)
//             // console.log(upObject)
//             return data.Search[0].imdbID
//         })
//         .then(
//             movieID=>fetch(`https://api.themoviedb.org/3/movie/${movieID}?api_key=${TMDB_TOKEN}&language=en-US`)
//                 .then(response=>response.json())
//                 .then(image => {
//                     console.log(image)
//                     image.poster_path
//                 })
//                 .then(imageLink=>console.log(`https://image.tmdb.org/t/p/w500/${imageLink}`))
//
//                 .catch(error => console.log(error))
//         )
//         /* review was created successfully */
//         .catch(error => console.error(error)); /* handle errors */
// }
//
// getMovieInfo("Tenet")
// console.log(upObject)

const getOptions = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
    // body: JSON.stringify(reviewObj),
};
fetch("https://apple-veil-game.glitch.me/movies", getOptions)
    .then( response => response.json() )
    .then(data => {
        console.log(data)
        for (let i=0; i<data.length; i++) {
            createCard(data[i].title, data[i].poster)
        }
        $("#loading").hide()
    })
    /* review was created successfully */
    .catch( error => console.error(error) ); /* handle errors */







