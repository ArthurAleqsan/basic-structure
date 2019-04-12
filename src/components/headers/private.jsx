import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next/hooks';


const HeaderPrivate = () => {
    const [t] = useTranslation();

    const [activeTab, toogleTab] = useState('Question');


    return (
        <div className="container">
            <div className='dashboard-header'>
                <Link to='/question'>
                    <div className={`dashboard-nav-tab ${activeTab === 'Question' ? 'active-tab' : ''}`} onClick={() => toogleTab('Question')}>{t('Question')}</div>
                </Link>
                <Link to='/answers'>
                    <div className={`dashboard-nav-tab ${activeTab === 'Answers' ? 'active-tab' : ''}`} onClick={() => toogleTab('Answers')}>{t('Answers')}</div>
                </Link>
            </div>
        </div>
    )
};
HeaderPrivate.propTypes = {
    location : PropTypes.object.isRequired,
};

const mapStateToProps = state => {

};

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HeaderPrivate));