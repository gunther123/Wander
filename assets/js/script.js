const NPSAPIKEY = "KrGPbUdmA0msAP4qXYSGzKcU89oOOcHNzdJ7Gpek";
const WEATHERAPIKEY = "bd344e93ec76626ec8f7447158241355";
const PARK_LIMIT = 50; // Limit the number of states being returned.
var parkWeatherData;
var parkSelected;
var parkData; //

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
      renderParksInConsole(data.data); //Call the function to show results in web console.
      parkData = data;
      console.log(parkData);
    })
    .catch((error) => {
      console.error("Error: ", error);
    });

  //TODO: Render list of parks to page.
});

function renderParksInConsole(arr) {
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
    "http://api.openweathermap.org/data/2.5/forecast?lat=" +
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
      drawModal(data);
    })
    .catch(console.error);
}

function drawModal(weatherData) {
    /* Park Information */
    document.getElementById("parkName").innerHTML = parkData.data[parkSelected].fullName;
    document.getElementById("parkDescription").innerHTML = parkData.data[parkSelected].description;
    document.getElementById("parkDesignation").innerHTML = parkData.data[parkSelected].designation;
    document.getElementById("parkAddress").innerHTML = '<br>' + parkData.data[parkSelected].addresses[0].line1 + '<br>' + parkData.data[parkSelected].addresses[0].city + ', ' + parkData.data[parkSelected].addresses[0].stateCode + ' ' + parkData.data[parkSelected].addresses[0].postalCode;
    document.getElementById("parkFeeCost").innerHTML = '$' + parkData.data[parkSelected].entranceFees[0].cost;
    document.getElementById("parkFeeDescription").innerHTML = parkData.data[parkSelected].entranceFees[0].description;
    parkURL = parkData.data[parkSelected].url
    /* Weather Data */
    //TODO: Add more weather data
    document.getElementById("weatherTempCurrent").innerHTML = weatherData.list[0].main.temp + '°F';
    
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
    //TODO: LocalStorage add park ID & Name
    document.getElementById("favButton").innerHTML = "Added!";

}

function openMap () {
    window.open('https://www.google.com/maps/search/' + parkData.data[parkSelected].fullName);
}

function openParkWebsite() {
    window.open(parkURL);
}