window.addEventListener('load', callA);
var url = "https://api.covid19api.com/countries";
var urlZ = "https://api.covid19api.com/total/country/";
var loader = document.getElementById('loader');
var search = document.getElementById("search");
var container = document.getElementById("container");
var noREsults = document.getElementById("no-results");
var allCountries = document.getElementById('allCountries');
var res = document.getElementById('results');

var unesi = document.getElementById('country');
var vrU = String(unesi.value);
unesi.addEventListener('input', callApi);
function callA() {
  loader.style.display = 'none';
  res.innerHTML = '';
  var xrA = new XMLHttpRequest();
  xrA.addEventListener('load', request);
  var urlZahtevA = url;
  xrA.open("GET", urlZahtevA);
  xrA.send();
}
function ubaci(e) {
  document.getElementById('country').value = e.innerHTML;
  callApi();
}
function request() {
  var objA = JSON.parse(this.responseText);
  for (let i = 0; i < objA.length; i++) {
    objA.sort(function (a, b) {
      var Ca = a.Country.toUpperCase();
      var Cb = b.Country.toUpperCase();
      if (Ca < Cb) {
        return -1;
      }
      if (Ca > Cb) {
        return 1;
      }
      return 0;
    });
    allCountries.innerHTML += `<p  onclick="ubaci(this)">${objA[i].Country}</p>`;
  }
  drzave(objA);
}

function drzave(niz) {
  var noviNIz = niz.map(a => { return a.Country })

  return noviNIz;
}
function callApi() {
  loader.style.display = 'inline';
  console.log(unesi.value);
  res.innerHTML = "";
  var xr = new XMLHttpRequest();
  xr.addEventListener('load', requestL);

  xr.addEventListener("error", XHRErrorHandler);
  var urlZahtev = urlZ + unesi.value;
  xr.open("GET", urlZahtev);


  xr.send();
  function XHRErrorHandler(event) {
    console.log("Error");
  }
}
function requestL() {

  if (unesi.value == "") {
    res.innerHTML = '';
  }
  loader.style.display = 'none';
  

  var obj = JSON.parse(this.responseText);
  console.log(obj);
 
  for (let i = obj.length - 1; i >= obj.length - 3; i--) {
    if (obj.length == 0  || typeof( obj[i] )== 'undefined') {
      var eror = document.createElement('h3');
      eror.innerHTML = " 404 Error file not found, this country has no cases of Covid 19!";
      res.appendChild(eror);
    }

    res.innerHTML += `<div class='col box'>
     <p class='date'> <i>  Azurirano:  </i> ${obj[i].Date.substr(0, 10)} </p>
       <p class='confirmed'> <i> Broj Testiranih Slučajeva: <br></i>  ${obj[i].Confirmed}  <i class="raz">+ ${obj[i].Confirmed - obj[i - 1].Confirmed}</i> </p>
       <p class='active'><i> Novih Slučajeva: <br> </i> ${obj[i].Active} <i class="raz"> + ${obj[i].Active - obj[i - 1].Active}</i> </p>
       <p class='death'><i> Broj Umrlih: <br>  </i> ${obj[i].Deaths}<i class="raz">+${obj[i].Deaths - obj[i - 1].Deaths}</i> </p>
     <p class='recovered'><i>Broj Izlecenih: <br> </i> ${obj[i].Recovered} <i class="raz"> +${obj[i].Recovered - obj[i - 1].Recovered}</i> </p> 
     </div>`;

  }
};
