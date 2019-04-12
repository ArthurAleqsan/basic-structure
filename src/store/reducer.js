import { combineReducers } from 'redux';

import user from './user/user.reducer';
import signUp from './signUp/signUp.reducer';
import friends from './friends/friends.reducer';
import messages from './messages/messages.reducer';
import rooms from './messages/rooms.reducer';
import media from './media/media.reducer';
import posts from './posts/posts.reducer';
import comments from './comments/comments.reducer';
import notifications from './notifications/notifications.reducer';

export default combineReducers({
    user,
    signUp,
    friends,
    messages,
    rooms,
    media,
    posts,
    comments,
    notifications,
});