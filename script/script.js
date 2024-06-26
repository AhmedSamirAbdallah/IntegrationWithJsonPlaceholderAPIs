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

function getUsersUsingXMLHttpRequest() {
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

function getUsersUsingFetch() {
    fetch("https://jsonplaceholder.typicode.com/users")
        .then(response => {
            if (response.ok) return response.json()
        })
        .then(users => {
            for (user of users) {
                createUserDiv(user)
            }
        })
        .catch((error) => {
            alert("Fetch error:", error);
        })
}


function getUserUsingAxios(){
    axios.get("https://jsonplaceholder.typicode.com/users")
    .then((response)=>{
        let users = response.data
        for (user of users) {
            createUserDiv(user)
        }
    }).catch((error)=>{
        alert(error)
    })
}

function createPostDiv(post) {
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

function getPostsByuserIdUsingXMLHttpRequest(userId){
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

function getPostsByuserIdUsingFetch(userId) {
    let url = `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
    fetch(url)
        .then((response) => {
            if (response.ok) return response.json()
        }).then((posts) => {
            for (post of posts) {
                createPostDiv(post)
            }
        }).catch((error) => {
            alert("Fetch error:", error);
        })
}

function getPostsByuserIdUsingAxios(userId){
    let url=`https://jsonplaceholder.typicode.com/posts?userId=${userId}` 
    axios.get(url)
    .then((response)=>{
        let posts = response.data
        for (post of posts) {
            createPostDiv(post)
        }
    }).catch((error)=>{
        alert(erro)
    })
}

function clearPostsArea() {
    document.getElementById("posts").innerHTML = ""
}

new Promise((resolve, reject) => {
    // getUsersUsingXMLHttpRequest
    // getUsersUsingFetch()
    getUserUsingAxios()
    resolve()
}).then(() => {
    let usersDiv = document.getElementById("users")
    usersDiv.addEventListener("click", function (event) {
        let userElement = event.target.closest(".user-content")
        if (userElement) {
            let userElements = document.querySelectorAll(".selected")
            userElements.forEach(user => {
                user.classList.remove("selected")
            });
            document.getElementById(userElement.id).classList.add("selected")
            clearPostsArea()
            // getPostsByuserIdUsingXMLHttpRequest(userElement.id)
            // getPostsByuserIdUsingFetch(userElement.id)
            getPostsByuserIdUsingAxios(userElement.id)
        }
    })
}).catch(()=>{
    alert("Erorr during fetch")
})
