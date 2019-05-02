import { combineReducers } from 'redux';

import user from './user/user.reducer';
import signUp from './signUp/signUp.reducer';
import admin from './admin/admin.reducer';

export default combineReducers({
    user,
    signUp,
    admin,
});