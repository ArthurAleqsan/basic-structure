import React, { useState } from 'react';
import PropTypes from 'prop-types';

//import Map from './Map';
import Map from './_Map';
import MapService from './../../services/MapServices';


function MapWithSearch(props) {

    const { pin, setPlaces, height } = props;

    const selectPlace = (place) => {
            MapService.getPlaceDetails(place).then(data => {
                setPlaces(data)
            })    
        
    };


    return (
        <div>
            <Map pin={pin}
                onSelectPlace={selectPlace}
                height={height}
            />
        </div>
    )
}


MapWithSearch.propTypes = {
    pin: PropTypes.object,
    setPlaces: PropTypes.func.isRequired,
    height: PropTypes.number.isRequired,
};

export default MapWithSearch;