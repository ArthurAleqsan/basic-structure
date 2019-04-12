import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from '../componentsLib/simpleUiComponents';
import { setChatWith } from './../../store/messages/messages.actions';

const SendMessageButton = props => {
    const { text } = props;

    const setChatPopup = () => {
        props.setChatWith(props.user)
    };

    const btn = text
        ? (<Button
            className='btn send-message-btn'
            onClick={setChatPopup}
            iconImagePath = '/assets/images/icons/message-white.svg'
        >
            {text}
        </Button>)
        : (<Button
            className='btn send-message-btn'
            onClick={setChatPopup}
            iconImagePath = '/assets/images/icons/message-white.svg'
        >
            Send Message
        </Button>);
        
    return (
        <div>
            {btn}
        </div>
    )
};

SendMessageButton.propTypes = {
    user: PropTypes.object.isRequired,
    setChatWith: PropTypes.func.isRequired,
    text: PropTypes.string,
};

const mapStateToProps = () => {
    return {}
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setChatWith
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SendMessageButton);