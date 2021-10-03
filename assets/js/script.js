const NPSAPIKEY = 'KrGPbUdmA0msAP4qXYSGzKcU89oOOcHNzdJ7Gpek';
const WEATHERAPIKEY = 'bd344e93ec76626ec8f7447158241355';
const PARK_LIMIT = 50; // Limit the number of states being returned.
const STATES = [
    //{ value: "", disp: "All" },
    { value: "DE", disp: "Delaware" },
    { value: "ME", disp: "Maine" },
    { value: "CT", disp: "Connecticut" },
    { value: "ND", disp: "North Dakota" },
    { value: "AK", disp: "Alaska" },
    { value: "DC", disp: "District of Columbia (DC)" },
    { value: "GU", disp: "Guam" },
    
]

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
            console.log("🏞 Picklist value is " + selectedState + " for a total of " + data.data.length + " parks.\n\nList of Parks to follow:");
            renderParksInConsole(data.data); //Call the function to show results in web console.
        })
        .catch((error) => {
            console.error('Error: ', error);
        });

    //TODO: Render list of parks to page.
});

function renderParksInConsole(arr) {
    let parkNum = 0
    for (let parks of arr) {
        parkNum++
        console.log('Park ' + parkNum + ': ' + parks.fullName);
    }
}

function populateStateSelect(state) {
    console.log('[State Picklist] Populating select list with ' + state.length + ' options.');
    let option = ''; //Initiate the option variable
    for (let i = 0; i < state.length; i++) { //Loop through all the states in the CONST array
        option += '<option value="' + state[i].value + '">' + state[i].disp + '</option>';
    }
    $('#states').append(option); //Append all the options we just compiled.
    console.log('[State Picklist] Done populating HTML Select!');
}

function renderParks(arr) {

}