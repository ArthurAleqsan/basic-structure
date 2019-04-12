import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { ImageBox } from './../../../components/componentsLib/ImageBox';
import ActionButton from './../../../components/componentsLib/actionButton';
import Loader from './../../../components/componentsLib/Loader';
import { getRequested } from './../../../store/friends/friends.actions';


const Requests = props => {
    const { items, getItems } = props;
    if (!items) {
        getItems(0);
    }
    return (
        <div className='friends-body'>
            {items && items.length > 0 
            ? items.map(item => (

                <div key={item.id}>
                    <Link to={`/${item.id}`}>
                        <ImageBox
                            className='frends-image-container'
                            name={`${item.firstName} ${item.lastName}`}
                            image={item.profilePictureUrl}
                            users={item.category.name}
                            borderColor={item.category.color}
                        />
                    </Link>
                    <ActionButton user={item} page='requested' />
                </div>


            )) 
            : (items && items.length === 0 
                ? (<div>You dont have a friend</div>)
                : (<Loader />))
            }
        </div>
    )
};

Requests.propTypes = {
    items: PropTypes.any,
    getItems: PropTypes.func.isRequired,
};


const mapStateToProps = (state) => {
    const { requested: items } = state.friends;
    return {
        items,
    }
};

const mapActions = (dispatch) => {
    return {
        getItems: () => dispatch(getRequested(0))
    }
};

export default connect(mapStateToProps, mapActions)(Requests);