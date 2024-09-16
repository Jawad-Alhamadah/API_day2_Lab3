let button = document.getElementById("login-button")
let input_name = document.getElementById("input-name")
let text = document.getElementById("text")
let inputUrl = document.getElementById("input-url")
let container = document.getElementById('container')




fetch ("https://66e8028eb17821a9d9daf072.mockapi.io/images")
.then(res =>res.json())
.then(data =>{
    data.map(item =>{
     
        createCard(item)


    })
})

button.addEventListener("click" ,(e)=>{
    e.preventDefault()
    if(input_name.value==="" || inputUrl.value==="" ){
       let warning = document.createElement("div")
       warning.setAttribute("role","alert")
       warning.classList.add("alert","alert-warning","alert")
       warning.textContent="You must fill both Fields to post image"
       let alerts = document.getElementById("alerts-container")
       alerts.appendChild(warning)
       return
      
    }

    
    fetch ("https://66e8028eb17821a9d9daf072.mockapi.io/images",{
        method:"POST",
        body:JSON.stringify({
            title:input_name.value,
            url: inputUrl.value,

        }),
        headers:{
            'Content-type': 'application/json; charset=UTF-8',
        }

    })
    .then(res =>res.json())
    .then (data => {
        createCard(data)
    
    })


})

function createCard(item) {
    let card = document.createElement("div")
    let cardBody = document.createElement("div")
    let title = document.createElement("h3")
    let img = document.createElement("img")
    let deleteButton = document.createElement("button")
    card.classList.add("card", "justify-content-center", "gx-0")
    cardBody.classList.add("card-body", "mb-2")
    img.classList.add("card-img-top", "align-self-center", "card-border", "mb-3")
    deleteButton.classList.add("btn", "btn-outline-secondary", "m-3")

    title.classList.add("title")

    container.appendChild(card)
    card.appendChild(img)
    card.appendChild(cardBody)
    cardBody.appendChild(title)


    card.appendChild(deleteButton)


    title.textContent = item.title
    img.setAttribute("src", item.url)
    card.setAttribute("id", item.id + "-img-container-div")
    card.appendChild(deleteButton)

    deleteButton.innerText = "delete image"
    deleteButton.setAttribute("onclick", `deleteImage(${item.id})`)
}

function deleteImage(id){
   fetch(`https://66e8028eb17821a9d9daf072.mockapi.io/images/${id}`, {
            method: 'DELETE',
          }).then(res =>res.json())
            .then(data =>{

               let element =  document.getElementById(id+"-img-container-div") 
               element.innerHTML=""
               element.style.display="none"
                
            });
}

