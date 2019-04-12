import React, {Component} from 'react';
import includeApi from './initmap';

class _Map extends Component {
    componentDidMount() {
       includeApi(
           this.props
       ); 
    }
    
    render() {
        
        return (
            <div>
                <input id="pac-input" className="controls" type="text" placeholder="Search Box" />
                <div id="map" style={{height: this.props.height}} />
            </div>
        );
    }
}

export default _Map;