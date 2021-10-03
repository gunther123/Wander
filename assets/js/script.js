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
    { value: "AL", disp: "Alabama" },
    { value: "AR", disp: "Arkansas" },
    { value: "AZ", disp: "Arizona" },
    { value: "CA", disp: "California" },
    { value: "CO", disp: "Colorado" },
    { value: "FL", disp: "Florida" },
    { value: "GA", disp: "Georgia" },
    { value: "HI", disp: "Hawaii" },
    { value: "ID", disp: "Idaho" },
    { value: "IL", disp: "Illinois" },
    { value: "IN", disp: "Indiana" },
    { value: "IA", disp: "Iowa" },
    { value: "KS", disp: "Kansas" },
    { value: "KY", disp: "Kentucky" },
    { value: "LA", disp: "Louisiana" },
    { value: "ME", disp: "Maine" },
    { value: "MD", disp: "Maryland" },
    { value: "MA", disp: "Massachusetts" },
    { value: "MI", disp: "Michigan" },
    { value: "MN", disp: "Minnesota" },
    { value: "MS", disp: "Mississippi" },
    { value: "MO", disp: "Missouri" },
    { value: "MT", disp: "Montana" },
    { value: "NE", disp: "Nebraska" },
    { value: "NV", disp: "Nevada" },
    { value: "NH", disp: "New Hampshire" },
    { value: "NJ", disp: "New Jersey" },
    { value: "NM", disp: "New Mexico" },
    { value: "NY", disp: "New York" },
    { value: "NC", disp: "North Carolina" },
    { value: "OH", disp: "Ohio" },
    { value: "OK", disp: "Oklahoma" },
    { value: "OR", disp: "Oregon" },
    { value: "PA", disp: "Pennsylvania" },
    { value: "RI", disp: "Rhode Island" },
    { value: "SC", disp: "South Carolina" },
    { value: "SD", disp: "South Dakota" },
    { value: "TN", disp: "Tennessee" },
    { value: "TX", disp: "Texas" },
    { value: "UT", disp: "Utah" },
    { value: "VT", disp: "Vermont" },
    { value: "VA", disp: "Virginia" },
    { value: "WA", disp: "Washington" },
    { value: "WV", disp: "West Virginia" },
    { value: "WI", disp: "Wisconsin" },
    { value: "WY", disp: "Wyoming" },
    { value: "AS", disp: "American Samoa" },
    { value: "MP", disp: "Northern Mariana Islands" },
    { value: "PR", disp: "Puerto Rico" },
    { value: "VI", disp: "Virgin Islands" },
]

populateStateSelect(STATES);

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
    let parkListUl = `<ul id="park-list-ul"></ul>`
    let parkList = ``

    for (let parks of arr) {
        let parkName = parks.fullName
        let parkURL = parks.url
        let parkListLi = `<li id='park-${parkNum}'><a id='park-url-${parkNum}' href='${parkURL}'>${parkName}</a></li>`
        parkList += parkListLi
        console.log(parkList)
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
    $(document).ready(function () {
        $("#states").html($('#states option').sort(function (x, y) {
            return $(x).text() < $(y).text() ? -1 : 1;
        }))
        $("#states").get(0).selectedIndex = 0;
        e.preventDefault();
    }
    );

}

function renderParks(arr) {

}