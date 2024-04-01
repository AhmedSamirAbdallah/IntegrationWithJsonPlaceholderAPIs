function createUserDiv(user) {
    let usersDiv = document.getElementById("users")
    let userDiv = document.createElement("div")
    userDiv.id = user.id
    userDiv.classList.add("user-content")
    let username = document.createElement("h3")
    let email = document.createElement("h3")
    let name = document.createTextNode(user.name)
    let mail = document.createTextNode(user.email)
    username.appendChild(name)
    email.appendChild(mail)
    userDiv.appendChild(username)
    userDiv.appendChild(email)
    usersDiv.appendChild(userDiv)
}

function getUsers() {
    let request = new XMLHttpRequest()
    request.open("GET", "https://jsonplaceholder.typicode.com/users")
    request.send()
    request.onload = function () {
        if (request.status == 200) {
            let dataRespons = JSON.parse(request.response)
            for (user of dataRespons) {
                createUserDiv(user)
            }
        } else {
            alert("Can't get the all users")
        }
    }
}

function createPostDiv(post){
    let postsDiv = document.getElementById("posts")
    let postDiv = document.createElement("div")
    postsDiv.appendChild(postDiv)
    postDiv.classList.add("post-content")
    let titleTag = document.createElement("h3")
    let postTitle = document.createTextNode(post.title)
    titleTag.appendChild(postTitle)
    postDiv.appendChild(titleTag)
    let pragraph = document.createElement("p")
    let pragraphContent = document.createTextNode(post.body)
    pragraph.appendChild(pragraphContent)
    postDiv.appendChild(pragraph)
} 

function getPostsByuserId(userId){
    let url = `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
    let request = new XMLHttpRequest()
    request.open("GET",url)
    request.send()
    request.onload = function(){
        if(request.status==200){
            let response = JSON.parse(request.response)
            for (post of response){
                console.log(post)
                createPostDiv(post)
            } 
        }else{
            alert("Can't get the all users")
        }
    }
}

function clearPostsArea(){
    document.getElementById("posts").innerHTML=""
}

getUsers();
let usersDiv = document.getElementById("users")
usersDiv.addEventListener("click", function(event){
    let userElement = event.target.closest(".user-content")
    if (userElement){
        let userElements = document.querySelectorAll(".selected")
        userElements.forEach(user => {
            user.classList.remove("selected")
        });
        document.getElementById(userElement.id).classList.add("selected")
        clearPostsArea()
        getPostsByuserId(userElement.id)
    }
})