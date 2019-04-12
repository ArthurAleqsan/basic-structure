import * as types from './../types';

// type - one of [MEMBER, TEACHER]

const initialState = {
    step: 1,
    isValid: false,
    submitted: false,
    invalidFields: {},
    // State from first step
    categories: [],
    categoryId: '',
    subcategoryId: '',
    subcategoryCustom: '',
    subCategoryObj: {
        name: '',
        measureName: '',
        measureUrl: '',
        userName: '',
        userUrl: '',
    },
    // State from second step
    type: '',
    country: '',
    city: '',
    state: '',
    position: '',
    education: {
        name: '',
        long: '',
        lat: '',
    },
    // State from third step 
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    sex: '',
    birthday: '',
};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.SET_SIGNUP_MULTIPLE_FIELDS:
            return {
                ...state,
                ...action.data,
            };
        case types.SET_SIGNUP_STEP:
            return {
                ...state,
                step: action.payload,
            };
        case types.GET_CATEGORIES_SUCCESS:
            return {
                ...state,
                categories: action.categories,
            };
        case types.USER_SET_CATEGORY:
            return {
                ...state,
                categoryId: action.payload,
                invalidFields: {
                    ...state.invalidFields,
                    categoryId: !action.isValid,
                },

            };
        case types.USER_SET_SUBCATEGORY:
            return {
                ...state,
                subcategoryId: action.payload.id,
                subcategoryCustom: '',
                subCategoryObj: {
                    name: action.payload.name,
                    measureName: action.payload.measureName,
                    measureUrl: action.payload.measureUrl,
                    userName: action.payload.userName,
                    userUrl: action.payload.userUrl,
                }
            };
        case types.USER_SET_CUSTOMSUBCATEGORY:
            return {
                ...state,
                subcategoryId: '',
                subcategoryCustom: action.payload.name,
                subCategoryObj: {
                    name: action.payload.name,
                    measureName: action.payload.measureName,
                    measureUrl: action.payload.measureUrl,
                    userName: action.payload.userName,
                    userUrl: action.payload.userUrl,
                }
            };
        case types.USER_SET_TYPE:
            return {
                ...state,
                type: action.payload,
                invalidFields: {
                    ...state.invalidFields,
                    type: !action.isValid,
                },
            };
        case types.USER_SET_COUNTRY:
            return {
                ...state,
                country: action.payload,
            };
        case types.USER_SET_CITY:
            return {
                ...state,
                city: action.payload,
            };
        case types.USER_SET_POSITION:
            return {
                ...state,
                position: action.payload,
            };
        case types.USER_SET_STATE:
            return {
                ...state,
                state: action.payload,
            };
        case types.USER_SET_SCHOOL:
            return {
                ...state,
                invalidFields: {
                    ...state.invalidFields,
                    school: !action.payload.name,
                },
                education: {
                    name: action.payload.name,
                    long: action.payload.long,
                    lat: action.payload.lat,
                },
            };
        case types.USER_SET_FIRSTNAME:
            return {
                ...state,
                firstName: action.payload,
                invalidFields: {
                    ...state.invalidFields,
                    firstName: !action.isValid,
                },
            };
        case types.USER_SET_LASTNAME:
            return {
                ...state,
                lastName: action.payload,
                invalidFields: {
                    ...state.invalidFields,
                    lastName: !action.isValid,
                },
            };
        case types.USER_SET_EMAIL:
            return {
                ...state,
                username: action.payload,
                invalidFields: {
                    ...state.invalidFields,
                    username: !action.isValid,
                },
            };
        case types.USER_SET_PASSWORD:
            return {
                ...state,
                password: action.payload,
                invalidFields: {
                    ...state.invalidFields,
                    password: !action.isValid,
                },
            };
        case types.USER_SET_SEX:
            return {
                ...state,
                sex: action.payload,
            };
        case types.USER_SET_BIRTDAY:
            return {
                ...state,
                birthday: action.payload,
            };
        default:
            return state
    }
}
