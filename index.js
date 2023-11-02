console.log("Superhero Hunter");
console.log(CryptoJS.MD5("text to hash").toString());

let search = document.getElementById("search");
const ul = document.getElementById("auto-complete");
const API_KEY = '1ed17cd54cf3df1dd561a339b197d319'; //public key
const PUBLIC_KEY = '1ed17cd54cf3df1dd561a339b197d319';
const PRIVATE_KEY = 'b54038af8c61cf1216a9c16f62f29e54e10b4b16';
let favarray = [];

search.onkeyup = async function () {
  var searchname = search.value.trim();
  if (searchname !== "") {
    var timestamp = new Date().getTime();
    var hash = CryptoJS.MD5(timestamp + PRIVATE_KEY + PUBLIC_KEY).toString();

    try {
      const response = await fetch(
        `https://gateway.marvel.com:443/v1/public/characters?apikey=${API_KEY}&nameStartsWith=${searchname}&ts=${timestamp}&hash=${hash}`
      );
      const data = await response.json();

      function showhero() {
        var heronames = Array.isArray(data.data.results) ? data.data.results : [];

        ul.innerText = " ";
        for (var i of heronames) {
          var li = document.createElement("li");
          li.innerHTML = i.name;
          li.id = i.id;
          li.addEventListener("click", function () {
            heroid = this.id;
            console.log(heroid + "this is id");
            loadDetails(heroid);
            ul.innerText = " ";
          });
          li.setAttribute("style", "display: block;");
          ul.appendChild(li);
        }
      }

      showhero();
    } catch (err) {
      console.log(err);
    }
  }
};

function loadDetails(heroid) {
  var timestamp = new Date().getTime();
  var hash = CryptoJS.MD5(timestamp + PRIVATE_KEY + PUBLIC_KEY).toString();

  fetch(`https://gateway.marvel.com:443/v1/public/characters/${heroid}?apikey=${API_KEY}&ts=${timestamp}&hash=${hash}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      var details = document.getElementById('details');
      var heroData = data.data.results[0];

      details.setAttribute("style", "background-color:rgba(0,0,0,0.8);")

      var img = document.getElementById("img");

      if (heroData && heroData.thumbnail) {
        img.setAttribute("src", heroData.thumbnail.path + "." + heroData.thumbnail.extension);
      } else {
        console.error("Thumbnail data not available.");
      }

      var name = document.getElementById("name");
      name.innerHTML = heroData.name;

      var comics = document.getElementById("comics");
      comics.innerHTML = "Comics: " + heroData.comics.available;

      var comicsRet = document.getElementById("comicsReturned");
      comicsRet.innerHTML = "Comics returned: " + heroData.comics.returned;

      var collection = document.getElementById("collection");
      collection.innerHTML = "Collection: " + heroData.comics.collectionURI;

      var description = document.getElementById("description");
      description.innerHTML = heroData.description;

      var stories = document.getElementById("stories");
      stories.innerHTML = "Stories:" + heroData.stories.available;

      var events = document.getElementById("events");
      events.innerHTML = "Events:" + heroData.events.available;

      var series = document.getElementById("series");
      series.innerHTML = "Series:" + heroData.series.available;

      var storyCollection = document.getElementById("storyCollection");
      storyCollection.innerHTML = "Stories Collection: " + heroData.stories.collectionURI;  

      var favv = document.getElementById("favbtn");
      favv.setAttribute("style", "display:flex;");
      favv.setAttribute('value', heroid);
    })
    .catch((error) => console.log(error));
}

// pushing data to favarray and setting it into localstorage.
function favpush (favid){ 
  alert("Added to Favourites");
  console.log(favid);
  if (favarray.includes(favid)) {
    alert("Already Added to the Favourite List");
    return;
}
  favarray.push(favid);
 // console.log(data.id + data.name);
  console.log(favarray);
  localStorage.setItem('favlistarr', JSON.stringify(favarray));
}
