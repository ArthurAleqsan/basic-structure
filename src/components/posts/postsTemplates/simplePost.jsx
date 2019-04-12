import React from 'react';
import PropTypes from 'prop-types';

const SimplePost = props => {
    const { text } = props.post;

    return (
        <div>
            <div>
                <div className='post-body'>
                    {text}
                </div>
              
            </div>
        </div>
    )
}
SimplePost.propTypes = {
    post: PropTypes.object.isRequired,
};

export default SimplePost;
