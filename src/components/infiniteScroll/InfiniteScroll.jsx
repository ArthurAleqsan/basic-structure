import React, {useState, useCallback, useEffect} from 'react';
import PropTypes from 'prop-types';

const InfiniteScroll = (props) => {
    
    const {
        handleLoadMore,
        hasMore,
        loading,
        showMore,
        inverse,
        globalScroll,
    } = props;
    
    const [listener, setListener] = useState(null);
    
    const loadMore = hasMore !== false && !loading;
    const handleVerticalScroll = useCallback((event) => {
        if (hasMore === false || loading) return;
        if (globalScroll) {
            if ((window.innerHeight + window.scrollY) >= document.querySelector('#app').offsetHeight) {
                console.log(screenY);
                handleLoadMore()
            }            
        } else {
            const { scrollTop, scrollHeight, clientHeight } = event.target;
            const t = scrollTop / (scrollHeight - clientHeight);
            console.log(t);
            if ( (inverse && t === 0) || (!inverse && t > 0.998) ) {
                handleLoadMore();   
            }    
        }
        
    }, [loadMore, inverse]);
    
    useEffect(() => {
        if (globalScroll && !listener) {
            const listener = document.addEventListener('scroll', handleVerticalScroll);
            setListener(listener)
        }
        return () => {
            document.removeEventListener('scroll', handleVerticalScroll);
            setListener(null);
        }
    });
    
    return (
        <div className={props.className} onScroll={(e) => !globalScroll && handleVerticalScroll(e)}>
            {(showMore && loadMore && inverse) && (<div className='load-more-messages' onClick={() => handleLoadMore()}>{'Load more'}</div>)}
            {props.children}
            {(showMore && loadMore && !inverse) && (<div className='load-more-messages' onClick={() => handleLoadMore()}>{'Load more'}</div>)}
        </div>
    )
};

InfiniteScroll.propTypes = {
    handleLoadMore: PropTypes.func.isRequired,
    hasMore: PropTypes.any,
    loading: PropTypes.any,
    showMore: PropTypes.any,
    className: PropTypes.any,
    children: PropTypes.any,
    inverse: PropTypes.bool,
    globalScroll: PropTypes.bool,
};

export default InfiniteScroll;