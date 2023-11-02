const API_KEY = '1ed17cd54cf3df1dd561a339b197d319';
const PRIVATE_KEY = 'b54038af8c61cf1216a9c16f62f29e54e10b4b16';
const timestamp = new Date().getTime(); // Get the current timestamp in milliseconds

const hash = CryptoJS.MD5(timestamp + PRIVATE_KEY + API_KEY); // Use an appropriate hashing library like md5

let favouritebarList = document.getElementById('favlistitem');
let list = [];
list = JSON.parse(localStorage.getItem('favlistarr'));

// to fetch the updated list 
function fetching(list) {
    for (var i = 0; i < list.length; i++) {
        loadhero(list[i]);
    }
}

// loading data of hero function
async function loadhero(heroid) {
    const URL = `https://gateway.marvel.com/v1/public/characters/${heroid}?apikey=${API_KEY}&ts=${timestamp}&hash=${hash}`;
    console.log(URL);
    const res = await fetch(URL);
    const data = await res.json();
    console.log(data);

    if (data && data.data && data.data.results && data.data.results.length > 0) {
        herolistdis(data.data.results[0]);
    }
}

// to display the data of the hero
function herolistdis(hero) {
    let herolistitem = document.createElement('div');
    herolistitem.innerHTML = `
        <div id="outerbox">
            <div id="innerbox">
                <img src="${hero.thumbnail.path}.${hero.thumbnail.extension}" id="favlistimg">
            </div> 
            <H5>${hero.name}</H5>   
            <button class="btn btn-primary" id="remove" type="button" onclick="remove('${hero.id}')">Remove</button>
        </div>`;
    favouritebarList.appendChild(herolistitem);
}

// to remove the item from the list
function remove(value) {
    list = list.filter((item) => item !== value);
    localStorage.setItem('favlistarr', JSON.stringify(list));
    favouritebarList.innerHTML = "";
    fetching(list);
}
// to fetch the updated list
function fetching(list) {
    for (var i = 0; i < list.length; i++) {
        loadhero(list[i]);
    }
}

fetching(list);
