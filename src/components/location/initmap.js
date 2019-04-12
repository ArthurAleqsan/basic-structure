function initMap(props) {
    const {
        onSelectPlace,
    } = props;
    const google = window.google;
    const map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -33.8688, lng: 151.2195},
        zoom: 13,
        mapTypeId: 'roadmap'
    });

    // Create the search box and link it to the UI element.
    const input = document.getElementById('pac-input');
    const searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function() {
        searchBox.setBounds(map.getBounds());
    });
    
    map.addListener('click', (place) => {
        if (place.placeId || place.id) {
            onSelectPlace(place);
            return;
        }
        onSelectPlace(place);
        markers.forEach(m => m.setMap(null));
        markers = [];
        const marker = new google.maps.Marker({
            position: {lat: place.latLng.lat(), lng: place.latLng.lng()},
            title: 'my custom school'
        });
        markers.push(marker);
        marker.setMap(map);
    });

    let markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function() {
        const places = searchBox.getPlaces();

        if (places.length === 0) {
            return;
        }

        // Clear out the old markers.
        markers.forEach(function(marker) {
            marker.setMap(null);
        });
        markers = [];

        // For each place, get the icon, name and location.
        const bounds = new google.maps.LatLngBounds();
        places.forEach(function(place) {
            if (!place.geometry) {
                return;
            }
            
            // Create a marker for each place.
            const placeId = place.place_id;
            const marker = new google.maps.Marker({
                map: map,
                title: place.name,
                placeId,
                position: place.geometry.location,
                latlng: place.geometry.location

            });
            marker.addListener('click', (c) => {
                onSelectPlace(marker);
            });
            markers.push(marker);

            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        map.fitBounds(bounds);
    });
}


const API_KEY = 'AIzaSyACP4cayNcQcmvm9Lc_NfJWSBxT2588sMc';

function includeApi(props) {
    window.initMap = () => initMap(props);
    let js,
        fjs = document.getElementsByTagName('script')[0];

    if (!document.getElementById('gmap-api')) {
        js = document.createElement('script');
        js.id = 'gmap-api';
        js.setAttribute('async', '');
        js.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places&callback=initMap`;
        fjs.parentNode.insertBefore(js, fjs);
    }
}


export default includeApi;