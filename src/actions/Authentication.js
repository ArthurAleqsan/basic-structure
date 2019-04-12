import { SIGN_IN_SUCCESS, SIGN_IN_ERROR } from '../constants/Authentication';
const dispatch = window.ReduxDispatch;

function SignInSucces(payload) {
    return {
        type: SIGN_IN_SUCCESS,
        payload,
    };
}
function SignInError(payload = {}) {
    return {
        type: SIGN_IN_ERROR,
        payload,
    };
}
export async function GetUserFetcher() {
    const res = await (new Promise(r => { setTimeout(r, 5000) }));
    dispatch(SignInSucces({name: 'test'}));
    return res;
}