import UserService from '../services/UserService';

export function SendForgotenPassword(email) {
    return UserService.forgetPassword(email);
}