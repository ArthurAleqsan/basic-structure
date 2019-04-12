import Request from './Request';


const googlePlace = `https://maps.googleapis.com/maps/api`;
const googleAPI_KEY = 'AIzaSyACP4cayNcQcmvm9Lc_NfJWSBxT2588sMc';
//const CONFIG = {
//    days: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
//    weatherKEY: "0194daed4d7bc3b790d67395a9910ac6",
//    weatherAPI: "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/0194daed4d7bc3b790d67395a9910ac6",
//    deatails: "https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJN1t_tDeuEmsRUsoyG83frY4&key=AIzaSyD3bFpDYru_EinjPHFIsszjP9tJF-_82P0",
//    googlePlace: "https://maps.googleapis.com/maps/api",
//    googleAPI_KEY: "AIzaSyD3bFpDYru_EinjPHFIsszjP9tJF-_82P0",
//    googleGEO_KEY: "AIzaSyACP4cayNcQcmvm9Lc_NfJWSBxT2588sMc",
//    googleAutoComplete: "https://maps.googleapis.com/maps/api/place/autocomplete/json?input=vanadz&types=geocode&language=fr&key=AIzaSyD3bFpDYru_EinjPHFIsszjP9tJF-_82P0",
//};

class MapServices extends Request {
    constructor() {
        super('','/places');
    }

    getPlaceDetails(place) {
        const placeId = place.id || place.placeId;
        const path = placeId ?  `/place/details/json?placeid=${placeId}&fields=name,address_components,geometry` : `/geocode/json?latlng=${place.latLng.lat()},${place.latLng.lng()}`;
        return this.send({path: path + '&key=' + googleAPI_KEY}).then(
            ({ json }) => {
                const place = json.result || json.results[0];
                if (!place) {
                    return
                } 
                const addresses = place.address_components;
                const data = {
                    country: '',
                    city: '',
                    state: '',
                    education: {
                        lat: place.geometry.location.lat.toString(),
                        long: place.geometry.location.lng.toString(),
                        name: place.name,
                    }
                };
                addresses.forEach(address => {
                    if (address.types.includes('administrative_area_level_1')) {
                        data.state = address.long_name;
                        return;
                    }
                    if (address.types.includes('country')) {
                        data.country = address.long_name;
                    } 
                    if (address.types.includes('locality')) {
                        data.city = address.long_name;
                    }
                });
                return data;
            }
        )
    }
    
    getCity(latlng) {
        return this.send({path: '/geocode/json?latlng=' + latlng + '&key=' + googleAPI_KEY}).then(result => {
            return JSON.parse(result).results[0].formatted_address;
        })
    }

    getAutoComplete(input) {
        return this.send({path: '/place/autocomplete/json?input=' + input + "&types=geocode&language=fr&key=" + googleAPI_KEY}).then(result => {
            //return only firs 5 predictions
            return JSON.parse(result).predictions.slice(0, 5);
        });
    }
    getSearch(input, {lat,lng}) {
        const options = {
            method: 'GET',
        };
        return this.send({
            path: `/place/nearbysearch/json?location=${lat},${lng}&radius=15&keyword=${input}&key=${googleAPI_KEY}`,
            options
        })
            .then(({status, json}) => {
                return json.results;
            });
    }
}

export default new MapServices();