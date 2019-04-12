import CategoryService from './../../services/CategoryService';
import * as types from './../types';
import UserService from '../../services/UserService';


// Get user categories 
export  function GetUserCategories() {
    return (dispatch, getState) => {
        const categories = getState().signUp.categories;
        if (categories.length) return;
        CategoryService.getUserCategories().then( categories => {
            dispatch({
                type: types.GET_CATEGORIES_SUCCESS,
                categories,   
            })
        });
    };
}

// Get users count of categoryies
export async function GetUserCategoriesStats() {
    return await CategoryService.GetUserCategoriesStats();
}

// Set sign up step 
export function SetSignUpStep(step) {
    return {
        type: types.SET_SIGNUP_STEP,
        payload: step,
    }
}

// Set sign up next step 
export function setSignUpNextStep() {
    return (dispatch, getState) => {
        const step = getState().signUp.step + 1;
        dispatch(SetSignUpStep(step))
    }
    
}

//Set user multiple fields

export function setMultiple(data) {
    return {
        type: types.SET_SIGNUP_MULTIPLE_FIELDS,
        data,
    }    
}

//Set user category
export function SetUserCategory(categoryId, isValid) {
    return {
        type: types.USER_SET_CATEGORY,
        payload: categoryId,
        isValid,
    }
}
//Set user subCategory
export function SetUserSubCategory(subCategory) {
    return {
        type: types.USER_SET_SUBCATEGORY,
        payload: subCategory,
    }
}
//Set user costumSubCategory
export function SetUserCustomSubCategory(subCategory) {
    return {
        type: types.USER_SET_CUSTOMSUBCATEGORY,
        payload: subCategory,
    }
}
// Set user type
export function SetUserType(userType, isValid) {
    return {
        type: types.USER_SET_TYPE,
        payload: userType,
        isValid
    }
}
// Set user country
export function SetUserCountry(country) {
    return {
        type: types.USER_SET_COUNTRY,
        payload: country,
    }
}
// Set user city
export function SetUserCity(city) {
    return {
        type: types.USER_SET_CITY,
        payload: city,
    }
}
// Set user position
export function SetUserPosition(position) {
    return {
        type: types.USER_SET_POSITION,
        payload: position,
    }
}
// Set user state
export function SetUserState(state) {
    return {
        type: types.USER_SET_STATE,
        payload: state,
    }
}
// Set user education place
export function SetUserEducation(place) {
    return {
        type: types.USER_SET_SCHOOL,
        payload: place,
    }
}
// Set user firstname
export function SetFirstName(firstName, isValid) {
    return {
        type: types.USER_SET_FIRSTNAME,
        payload: firstName,
        isValid,
    }
}
// Set user lastname
export function SetLastName(lastName, isValid) {
    return {
        type: types.USER_SET_LASTNAME,
        payload: lastName,
        isValid
    }
}
// Set user email
export function SetEmail(username, isValid) {
    return {
        type: types.USER_SET_EMAIL,
        payload: username,
        isValid,
    }
}
// Set user password
export function SetPassword(password, isValid) {
    return {
        type: types.USER_SET_PASSWORD,
        payload: password,
        isValid,
    }
}
// Set user sex
export function SetSex(sex) {
    return {
        type: types.USER_SET_SEX,
        payload: sex,
    }
}
// Set user birtDay
export function SetBirdDay(birtDay) {
    return {
        type: types.USER_SET_BIRTDAY,
        payload: birtDay,
    }
}
// Register User
export async function registerUser(userData) {
    return await UserService.registerUser(userData)
}
// Set invalid fields
export function setInvalidFields(userData) {
    return dispatch => {
        
    }
}

// ReSend activation Email
export function reSendActivationEmail(username) {
    return UserService.reSendActivationEmail(username);
}
