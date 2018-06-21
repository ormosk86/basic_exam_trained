function getData(url, callbackFunc) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      callbackFunc(this);
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}


function successAjax(xhttp) {
  // Innen lesz elérhető a JSON file tartalma, tehát az adatok amikkel dolgoznod kell
  var userDatas = JSON.parse(xhttp.responseText);

  var spaceships = userDatas[2].data;
  console.log(spaceships);

  // Űrhajók beimportálása html-be
  var template = '';

  for (var i = 0; i < spaceships.length; i++) {
    template += `
       <div class="container">
            <div class="header">
               <h1>${spaceships[i].model}</h1>
               <img class="photo" src=img/${spaceships[i].image} alt="nincs képfájl!">
              </div>
              <div class="details">
               <h2>Gyártó: ${spaceships[i].manufacturer}</h2>
               <h3>Ára: ${spaceships[i].cost_in_credits}</h3>
               </div>
          </div>`;
  }
  document.querySelector('div.shapceship-list').innerHTML = template;

  // Egy kártya létrehozása a jobb oldali találati mezőhöz
  function oneCard(spaceships) {
    var template2 = `
       <div class="container">
            <div class="header">
               <h1>${spaceships.model}</h1>
               <img class="photo" src=img/${spaceships.image} alt="nincs képfájl!">
          </div>`;

    document.querySelector('div.one-spaceship').innerHTML = template2;
  }

  // search value kinyerése változóba és search buttton click esemény figyelése 
  var searchTextBox = document.getElementById("search-text");
  var searchButton = document.getElementById('search-button');
  searchButton.addEventListener("click", search, false);
  searchTextBox.addEventListener("change", search, false);

  // kereső függvény
  function search() {
    var filter = searchTextBox.value;
    var result = [];
    for (var i = 0; i < spaceships.length; i++) {
      if (spaceships[i].model.toLowerCase().indexOf(filter.toLowerCase()) != -1) {
        result.push(spaceships[i]);
      }
    };
    if (result.length > 0) {
      oneCard(result[0]); // Ha csak az első találatot kel kiírnom

    } else {
      alert("Nincs találat");
    }


  };
}
getData('/json/spaceships.json', successAjax);
document.querySelector("title").innerText = "Starwars feladat";