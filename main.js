const API_URL = "https://api.github.com/users/";

const main = document.getElementById("main");
const search = document.getElementById("search");
const form = document.getElementById("form");

getUser("mayankcoder08");

async function getUser(username){
    const res = await fetch(API_URL + username)
    const data = await res.json();
    createuser(data);
    getRepos(username)
}

async function getRepos(username){
    const res = await fetch(API_URL + username + "/repos");
    const repos = await res.json();

    addReposToCard(repos);
}

function addReposToCard(repos){
    const reposEl = document.getElementById("repos");
    repos.map((repo) => {
        const repoEl = document.createElement("a");
        repoEl.classList.add("repo");
        repoEl.href = repo.html_url;
        repoEl.target = "_blank";   
        repoEl.innerHTML = repo.name;
        reposEl.appendChild(repoEl);
    })
}

function createuser(data){
    const cardHTML =`
    <div class="card">
        <img class="avatar" src="${data.avatar_url}" alt="${data.name}" />
    <div class="user-info">
        <h2>${data.name}</h2>
        <p>${data.bio}</p>
        <ul class="info">
            <li><strong>Followers: </strong>${data.followers}</li>
            <li><strong>Following: </strong>${data.following}</li>
            <li><strong>Repos: </strong>${data.public_repos}</li>
        </ul>
        <div id="repos"></div>
    </div>
    </div>
    `;
    main.innerHTML = cardHTML;
}

form.addEventListener("submit", e => {
    e.preventDefault(); 
    const user = search.value;
    if(user){
        getUser(user);
        search.value="";
    }
})