document.addEventListener("DOMContentLoaded", function() {
  init();
  title();
  headerDescription();
});


 function init() {
  loadJSON(function(response) {
     var json = JSON.parse(response);
     var count = Object.keys(json.films).length;
     
     // grab the content div
    var wrapper = document.getElementById('content');

    // create the fragment
    var frag = document.createDocumentFragment();

     for(var i=0; i<count; i++){

      var div = document.createElement("div");
       div.setAttribute("class", "filmcard");

       
      var img = document.createElement("img");
      img.src = json.films[i].url;
      img.setAttribute("class", "filmimage");
      div.appendChild(img);

      var h3 = document.createElement("h3");
      h3.textContent = json.films[i].title;
      div.appendChild(h3);

      var p = document.createElement("p");
      p.setAttribute("class", "runtime");
      p.innerHTML = 'Run Time:' + json.films[i].running_time + 'min';
      div.appendChild(p);

      var p = document.createElement("p");
      p.setAttribute("class", "filmbio");
      p.innerHTML = json.films[i].description;
      div.appendChild(p);

       frag.appendChild(div);
     }

     content.appendChild(frag);

  });
 }
 

var header = document.getElementsByTagName("header")[0];

function title() {
  loadJSON(function(response) {
     var json = JSON.parse(response);
       var h1 = document.createElement("h1");
       h1.textContent = json.introduction.page_title;
       header.appendChild(h1);
  });
}

function headerDescription() {
  loadJSON(function(response) {
     var json = JSON.parse(response);
       var p = document.createElement("p");
       p.textContent = json.introduction.page_description;
       p.setAttribute("id", "pagedescription");
       header.appendChild(p);
  });
}
  

function loadJSON(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'dist/json/data.json', true);
    xobj.onreadystatechange = function () {
      if (xobj.readyState == 4 && xobj.status == 200) {
        callback(xobj.responseText);
      }
    };
    xobj.send(null);
 }
