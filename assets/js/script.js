const NPSAPIKEY = "KrGPbUdmA0msAP4qXYSGzKcU89oOOcHNzdJ7Gpek";
const WEATHERAPIKEY = "bd344e93ec76626ec8f7447158241355";
const PARK_LIMIT = 50; // Limit the number of states being returned.
var parkWeatherData;
var parkSelected;
var parkData;
var favoriteParks;

loadFavorites();

function loadFavorites() {
    
    console.log('[Favorites] Loading Park Favorites from localStorage');
    if (localStorage.getItem("favorites") === null) {
      favoriteParks = [];
    } else {
      favoriteParks = JSON.parse(localStorage.getItem('favoriteParks'));
    }
    console.log(favoriteParks);
    console.log('[Favorites] Park Favorites Loaded');
    //TODO: Render the array on the page somewhere.
    //renderFavorites()
   renderFavorites(favoritePark)
}

function renderFavorites(arr) {
 let favParkNum = 0;
 let favListUl = `<ul id="fav-list-ul"></ul>`;
 let favList = ``;
 
 for ( i=0; i<10; i++) {
 //let favorites = favorites.fullName
 let favListLi = `<li id='park-${parkNum}'><a id='park-url-${parkNum}' href='#' onclick="openPark(${parkId})">${parkName}</a></li>`;
 favList += favListLi;
 console.log(favList);
 favParkNum++;
 }
   $("#favorites-container").html(favListUl);
   $("#fav-list-ul").html(favListLi);
}

populateStateSelect(STATES); 

$(document).ready(function () {
  $("select").selectize({
    sortField: "text",
  });
});

// When Search is clicked.
$("#searchBtn").click(function () {
  var selectedState = $("#states").val();

  fetch(
    "https://developer.nps.gov/api/v1/parks?stateCode=" +
    selectedState +
    "&api_key=" +
    NPSAPIKEY +
    "&limit=" +
    PARK_LIMIT
  )
    .then((response) => response.json())
    .then((data) => {
      //console.log(data); // Complete JSON data object
      console.log(
        "🏞 Picklist value is " +
        selectedState +
        " for a total of " +
        data.data.length +
        " parks. Complete object below:"
      );
      renderParks(data.data); //Call the function to show results in web console.
      parkData = data;
      console.log(parkData);
    })
    .catch((error) => {
      renderError('NPS API Error!', 'There was a problem fetching parks from the NPS API Endpoint.')
      console.error("Error: ", error);
    });
});

function renderParks(arr) {
  let parkNum = 0;
  let parkListUl = `<ul id="park-list-ul"></ul>`;
  let parkList = ``;

  for (let parks of arr) {
    let parkName = parks.fullName;
    //let parkURL = parks.url
    let parkListLi = `<li id='park-${parkNum}'><a id='park-url-${parkNum}' href='#' onclick="openPark(${parkNum})">${parkName}</a></li>`;
    parkList += parkListLi;
    //console.log(parkList)
    parkNum++;
  }
  $("#park-list-container").html(parkListUl);
  $("#park-list-ul").html(parkList);
}

function populateStateSelect(state) {
  console.log(
    "[State Picklist] Populating select list with " + state.length + " options."
  );
  let option = ""; //Initiate the option variable
  for (let i = 0; i < state.length; i++) {
    //Loop through all the states in the CONST array
    option +=
      '<option value="' + state[i].value + '">' + state[i].disp + "</option>";
  }
  $("#states").append(option); //Append all the options we just compiled.
  console.log("[State Picklist] Done populating HTML Select!");
}

function openPark(park) {
  let parkLat = parkData.data[park].latitude; //Use this for openWeather
  let parkLong = parkData.data[park].longitude; //Use this for openWeather
  parkSelected = park; //Store the park number in a variable to access outside scopes
  console.log("%c You selected park #" + park, "color: #bada55");
  console.log(
    "Park Name: " +
    parkData.data[park].fullName +
    "\n" +
    "• Park Description: " +
    parkData.data[park].description +
    "\n" +
    "• Latitude: " +
    parkData.data[park].latitude +
    "\n" +
    "• Longitude: " +
    parkData.data[park].longitude +
    "\n" +
    "• Entrance Fees\n   • Cost: $" +
    parkData.data[park].entranceFees[0].cost +
    "\n" +
    "   • Fee Info: " +
    parkData.data[park].entranceFees[0].description +
    "\n"
  );
  /* TODO: Fetch OpenWeather API with lat & long 
    Note: Use the previously defined parkLat & parkLong to pass thorugh the Fetch for OpenWeather.
    */
  fetchWeather(parkLat, parkLong);

  // TODO: Toggle visiblity on modal.
}

function fetchWeather(lat, long) {
  let units = "imperial";

  fetch(
    "https://api.openweathermap.org/data/2.5/forecast?lat=" +
    lat +
    "&lon=" +
    long +
    "&units=" +
    units +
    "&appid=" +
    WEATHERAPIKEY
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      drawModal(data);
    })
    .catch((error) => {
      renderError('Weather API Error.', 'There was a problem fetching parks from the OpenWeatherMap API Endpoint. Do you have a bad API token?')
      console.error("Error: ", error);
    });
}

function drawModal(weatherData) {
  document.getElementById("favButton").innerHTML = '<i class="fa fa-star py-1 px-1" aria-hidden="true"></i> Add to Favorites';
  /* Park Information */
  document.getElementById("parkName").innerHTML = parkData.data[parkSelected].fullName;
  document.getElementById("parkDescription").innerHTML = parkData.data[parkSelected].description;
  document.getElementById("parkDesignation").innerHTML = parkData.data[parkSelected].designation;
  document.getElementById("parkAddress").innerHTML = '<br>' + parkData.data[parkSelected].addresses[0].line1 + '<br>' + parkData.data[parkSelected].addresses[0].city + ', ' + parkData.data[parkSelected].addresses[0].stateCode + ' ' + parkData.data[parkSelected].addresses[0].postalCode;
  document.getElementById("parkFeeCost").innerHTML = '$' + parkData.data[parkSelected].entranceFees[0].cost;
  document.getElementById("parkFeeDescription").innerHTML = parkData.data[parkSelected].entranceFees[0].description;
  parkURL = parkData.data[parkSelected].url
  /* Weather Data */
  let windSpeed = weatherData.list[0].wind.speed
  windSpeed = Math.round(windSpeed)
  document.getElementById("weatherTempCurrent").innerHTML = weatherData.list[0].main.temp + '°F';
  document.getElementById("weatherFeelsLikeTemp").innerHTML = weatherData.list[0].main.feels_like + '°F';
  document.getElementById("weatherConditions").innerHTML = weatherData.list[0].weather[0].description;
  document.getElementById("weatherHumidity").innerHTML = weatherData.list[0].main.humidity + '%';
  document.getElementById("weatherWindSpeed").innerHTML = windSpeed + ' mph';

  /* Populate Header Image */
  let featImg = document.getElementsByClassName("modalBannerImage");
  let imageURL = parkData.data[parkSelected].images[0].url;
  featImg[0].style.backgroundImage = "url(" + imageURL + ")";
  /* Show the modal */
  $(parkModal).show();
}

function closeModal() {
  $(parkModal).hide();
}

function favoritePark() {
  
  document.getElementById("favButton").innerHTML = "Added!";
  console.log('Adding park to favorites')
  let newEntry = { parkName: parkData.data[parkSelected].fullName, parkId: parkData.data[parkSelected].id }
  favoriteParks.push(newEntry);
  console.log(favoriteParks);
  localStorage.setItem('favorites', JSON.stringify(favoriteParks));
}

function openMap() {
  window.open('https://www.google.com/maps/search/' + parkData.data[parkSelected].fullName);
}

function openParkWebsite() {
  window.open(parkURL);
}

function renderError(title, body) {
  //Take a title and body, and render a error to page.
  $(errorAlert).show();
  document.getElementById("errorTitle").innerHTML = title;
  document.getElementById("errorBody").innerHTML = body;
}
function openFavModal() {
  $(favoriteModal).show();
  loadFavorites()
  console.log("modal is working?")
}
function closeFavModal() {
    $(favoriteModal).hide()
}



//$("#favorites-btn").click(function() {
  
  //$( $(this).attr("href") ).show();
  //console.log("it worked");  
//})