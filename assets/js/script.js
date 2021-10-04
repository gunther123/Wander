const NPSAPIKEY = 'KrGPbUdmA0msAP4qXYSGzKcU89oOOcHNzdJ7Gpek';
const WEATHERAPIKEY = 'bd344e93ec76626ec8f7447158241355';
const PARK_LIMIT = 50; // Limit the number of states being returned.
var apiData;

populateStateSelect(STATES);

$(document).ready(function () {
    $('select').selectize({
        sortField: 'text'
    });
});

// When Search is clicked.
$("#searchBtn").click(function () {
    var selectedState = $('#states').val();

    fetch('https://developer.nps.gov/api/v1/parks?stateCode=' +
        selectedState +
        '&api_key=' +
        NPSAPIKEY +
        '&limit=' +
        PARK_LIMIT)
        .then(response => response.json())
        .then(data => {
            //console.log(data); // Complete JSON data object
            console.log("🏞 Picklist value is " + selectedState + " for a total of " + data.data.length + " parks. Complete object below:");
            renderParksInConsole(data.data); //Call the function to show results in web console.
            apiData = data;
            console.log(apiData);
        })
        .catch((error) => {
            console.error('Error: ', error);
        });

    //TODO: Render list of parks to page.
});

function renderParksInConsole(arr) {
    let parkNum = 0
    let parkListUl = `<ul id="park-list-ul"></ul>`
    let parkList = ``

    for (let parks of arr) {
        let parkName = parks.fullName
        //let parkURL = parks.url
        let parkListLi = `<li id='park-${parkNum}'><a id='park-url-${parkNum}' href='#' onclick="openPark(${parkNum})">${parkName}</a></li>`
        parkList += parkListLi
        //console.log(parkList)
        parkNum++   
    }
    $('#park-list-container').html(parkListUl)
    $('#park-list-ul').html(parkList)
}

function populateStateSelect(state) {
    console.log('[State Picklist] Populating select list with ' + state.length + ' options.');
    let option = ''; //Initiate the option variable
    for (let i = 0; i < state.length; i++) { //Loop through all the states in the CONST array
        option += '<option value="' + state[i].value + '">' + state[i].disp + '</option>';
    }
    $('#states').append(option); //Append all the options we just compiled.
    console.log('[State Picklist] Done populating HTML Select!');

    //sort the states alphabetically in the dropdown
    /* Depreciated with the searchable select (Sorry Sandy!)
    $(document).ready(function () {
        $("#states").html($('#states option').sort(function (x, y) {
            return $(x).text() < $(y).text() ? -1 : 1;
        }))
        $("#states").get(0).selectedIndex = 0;
        e.preventDefault();
    }
    );*/
}

function openPark(park) {
    let parkLat = apiData.data[park].latitude; //Use this for openWeather
    let parkLong = apiData.data[park].longitude; //Use this for openWeather
    console.log('%c You selected park #' + park, 'color: #bada55');
    console.log('Park Name: ' + apiData.data[park].fullName + '\n' +
        '• Park Description: ' + apiData.data[park].description + '\n' +
        '• Latitude: ' + apiData.data[park].latitude + '\n' +
        '• Longitude: ' + apiData.data[park].longitude + '\n' +
        '• Entrance Fees\n   • Cost: $' + apiData.data[park].entranceFees[0].cost + '\n' +
        '   • Fee Info: ' + apiData.data[park].entranceFees[0].description + '\n' );
    /* TODO: Fetch OpenWeather API with lat & long 
    Note: Use the previously defined parkLat & parkLong to pass thorugh the Fetch for OpenWeather.
    */

    // TODO: Toggle visiblity on modal.

}
