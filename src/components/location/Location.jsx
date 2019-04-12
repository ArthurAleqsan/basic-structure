import  React from 'react';
import PropTypes from 'prop-types';

import MapWithSearch from './MapWithSearch';
import {Button, Input} from "../componentsLib/simpleUiComponents";

function Location(props) {
    const { education } = props;
    return (<div>
        <MapWithSearch pin={ education } />
    </div>)
}

Location.propTypes = {
    education: PropTypes.object,
};

export default Location;