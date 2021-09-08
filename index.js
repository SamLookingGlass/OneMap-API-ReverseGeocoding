let axios = require('axios').default

// OneMap Authentication
const API_ENDPOINT_1 = 'https://developers.onemap.sg/privateapi/auth/post/getToken';

// Get taxi availability
const API_ENDPOINT_2 = 'https://api.data.gov.sg/v1/transport/taxi-availability';

// Convert Coordinate to Address (reverse geocoding)
const API_ENDPOINT_3 = 'https://developers.onemap.sg//privateapi/commonsvc/revgeocode';


let accessToken = axios.post(API_ENDPOINT_1,  {email: 'YOUREMAIL', password: 'YOURPASSWORD'}).then(response => accessToken = response.data.access_token)

// Get address of where available taxis are at
async function getTaxi() {
  let response = await axios.get(API_ENDPOINT_2);
  let availCoordinates = response.data.features[0].geometry.coordinates;
//   console.log(availCoordinates)
  let arrayLength = availCoordinates.length; 
  console.log(arrayLength)
  for (let i = 0; i < arrayLength; i++) {
    let coordi = availCoordinates[i] 
    let coorString = String(coordi[1]) + ',' + String(coordi[0]);
    let response1 = await axios.get(API_ENDPOINT_3, {params:{
    location: coorString,
    token: accessToken}
  })
  let address = response1.data.GeocodeInfo[0];
  console.log(address)
  };
}

getTaxi()