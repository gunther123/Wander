# MN Parks Buddy

## User Stories
```
As a NATURE LIKING INDIVIDUAL
I want to FIND PARKS IN MY COUNTY
so that I CAN SEE WHAT OPTIONS ARE AVAILABLE TO ME
and the WEATHER CONDITIONS AT SAID PARKS.
```

## Functionality Overview

Using the [NPS.Gov](https://www.nps.gov/) API, The user may input a two character state code (Example: NY) and return a list of Parks in that state. Then, using the OpenWeather API, Loop through the parks Lat&Long to return the weather conditions for that park using the OpenWeather API [Open Call API](https://openweathermap.org/api/one-call-api).

* NPS.gov API Token `KrGPbUdmA0msAP4qXYSGzKcU89oOOcHNzdJ7Gpek`
* OpenWeather API Token `bd344e93ec76626ec8f7447158241355`

## Example API Calls

* Nationa Parks in NY:

   ```https://developer.nps.gov/api/v1/parks?stateCode=NY&api_key=KrGPbUdmA0msAP4qXYSGzKcU89oOOcHNzdJ7Gpek```
## External Resources
* [NPS.gov API Docs](https://www.nps.gov/subjects/developer/api-documentation.htm)
* [OpenWeather API Docs](https://openweathermap.org/api)