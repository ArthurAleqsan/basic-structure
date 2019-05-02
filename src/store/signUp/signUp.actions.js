import CategoryService from './../../services/CategoryService';
import * as types from './../types';


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

