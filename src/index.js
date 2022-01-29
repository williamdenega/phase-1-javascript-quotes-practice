
const quotesUrl = 'http://localhost:3000/quotes/'
const likesUrl = 'http://localhost:3000/likes'
document.addEventListener("DOMContentLoaded", init)

function init(){
    document.getElementById('new-quote-form').addEventListener('submit',handleSubmit)
    loadQuotes()

}



function loadQuotes(){

    
    fetch(quotesUrl)
    .then(res => res.json())
    .then(arry => arry.forEach(quote => {
        displayQuote(quote)
    
    }))

}


function handleSubmit(e){
    e.preventDefault()
    let quote = document.getElementById('new-quote').value
    let author = document.getElementById('author').value
    let quoteObj = {
        "quote":quote,
        "author":author,
        "likes": 0
    }
    fetch(quotesUrl,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(quoteObj)
    })
    .then(res => res.json())
    .then((quote)=> displayQuote(quote))





    e.target.reset()

}



function displayQuote(quote){
    let quotesList = document.getElementById('quote-list')

    let li = document.createElement('li')
    li.innerHTML = `
        
        <blockquote class="blockquote">
          <p class="mb-0">${quote.quote}</p>
          <footer class="blockquote-footer">${quote.author}</footer>
          <br>
          <button class='btn-success'>Likes: <span>${quote.likes}</span></button>
          <button class='btn-danger'>Delete</button>
        </blockquote>
        
        `
    li.id = quote.id
    li.class = 'quote-card'
    quotesList.appendChild(li)

        
    li.querySelector('.btn-success').addEventListener('click',()=> handleLike(quote.id))
    li.querySelector('.btn-danger').addEventListener('click', ()=> handleDelete(quote.id))  

}


function handleLike(id){


    //getting the amount of likes and add one more like
    let likes = document.getElementById(id).getElementsByTagName('span')[0].innerHTML
    likes ++

    //patching the new like to the server
    fetch(quotesUrl+id,{
        method:"PATCH",
        headers:{
            'Content-Type':"application/json"
        },body:JSON.stringify({
            'likes':likes
        })
    })
    //dsplaying the new like
    document.getElementById(id).getElementsByTagName('span')[0].innerHTML=likes

}

function handleDelete(id){
    fetch(quotesUrl+id,{
        method: 'DELETE',
        headers:{
            'Content-Type': 'application/json'
        }
    })
    .then (res=> res.json())
    .then(quote => {document.getElementById(id).remove()})


    }
