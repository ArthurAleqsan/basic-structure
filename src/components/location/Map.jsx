import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

import Timer from './Timer';

const Marker = ({ text }) => <div>{text}</div>;

//const API_KEY = 'AIzaSyACP4cayNcQcmvm9Lc_NfJWSBxT2588sMc';
const API_KEY = 'AIzaSyC-g_1vU3LH1e-N2tu2bbr-awbUeld0sj0';
//const PLACES_API_KEY = 'AIzaSyDJcw0FXXoBFsEwJXXwyH3k3eVLhmtwNUg';
const timer = new Timer(500);



class SimpleMap extends Component {
    loaded(a) {
        const map = a.map;
        map.addListener('center_changed',() => {
            console.log(a);
            timer.update(() => this.props.changeCenter({
                lat: map.center.lat(),
                lng: map.center.lng(),
            }));
        });
        map.addListener('click',(f) => {
            console.log(f);
            timer.update(() => this.props.changeCenter({
                lat: map.center.lat(),
                lng: map.center.lng(),
            }));
        });
    }
    render() {
        const center= {
            lat: 40.2082,
            lng: 44.52909
        };
        const {places} = this.props;
        return (
            <div style={{ height: '300px', width: '930px' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: API_KEY }}
                    defaultCenter={center}
                    defaultZoom={15}
                    onGoogleApiLoaded={(a) => this.loaded(a)}
                >
                    {places.map( p => {
                        const {lat,lng} = p.geometry.location;
                        return <Marker key={`${lat}${lng}`} lat={lat} lng={lng} text={p.name}/>
                    })}
                </GoogleMapReact>
            </div>
        );
    }
}

export default SimpleMap;