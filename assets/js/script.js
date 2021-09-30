$("#searchBtn").click(function () {
    var selectedState = $('#states').val();

    // TODO: Fetch parks
    fetch('https://developer.nps.gov/api/v1/parks?stateCode=' +
    selectedState +
    '&api_key=KrGPbUdmA0msAP4qXYSGzKcU89oOOcHNzdJ7Gpek')
        .then(response => response.json())
        .then(data => {
            console.log(data); // JSON data parsed by `data.json()` call
            alert("You picked " + selectedState + "\n\nSee web console for complete API object return.\n\nTotal Parks: " + data.total );
        })
        .catch((error) => {
            console.error('Error: ', error);
        });

    
});