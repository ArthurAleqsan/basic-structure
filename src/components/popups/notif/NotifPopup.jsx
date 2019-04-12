import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next/hooks';
import Notification from "./Notification";
import { notificationSeen } from "../../../store/notifications/notifications.actions";

const NotificationPopup = props => {
    const { close, notifications = [] } = props;
    const [t] = useTranslation();

    return (
        <div className="popup msg-nots-popup notifPopup" id='popup' onClick={(e) => { e.target.id === "popup" ? close() : null }}>
            <div className="popup-dialog">
                <div className='popup-header'>
                    <p className='header-text'>{t('Notifications')}</p>
                </div>
                <div className='popup-body'  /* onScroll={(e) => handleVerticalScroll(e)} */>
                    {notifications.map(notif => {
                        return (
                            <div className={`notification-container ${notif.seen ? 'notif-seen' : ''}`} key={notif.id} onClick={() => props.setSeen(notif.id)}>
                                <Notification key={notif.id} {...notif} />
                            </div>
                        )
                    }
                    )
                    }
                </div>
            </div>
        </div>
    )
};

NotificationPopup.propTypes = {
    close: PropTypes.func.isRequired,
    notifications: PropTypes.array.isRequired,
    setSeen: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
    const { notifications } = state.notifications;
    return {
        notifications
    }
};

const mapActions = dispatch => bindActionCreators({
    setSeen: notificationSeen
}, dispatch);

export default connect(mapStateToProps, mapActions)(NotificationPopup);
