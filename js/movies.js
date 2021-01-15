"use strict"
function createCard(){
    const allRow = document.getElementById('allRow')
    const card = document.createElement('div')
    card.setAttribute('class','card m-3 col-3 w-auto')
    const image = document.createElement('img')
    image.setAttribute('src','img/omanyte.png')//add json property here
    image.setAttribute('class','card-img-top')
    const cardBody = document.createElement('div')
    cardBody.setAttribute('class','card-body text-center')
    const title = document.createElement('h5');
    title.setAttribute('class','card-title')
    title.innerText = 'Movie Name' //add Jason object property here
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
createCard()
