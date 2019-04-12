import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SelectCategory from './selectCategory';
import CreateQuestion from './createQuestion';
import { GetUserCategories } from './../../../store/signUp/signUp.actions';
import { getSubCategoriesForUserSettings } from './../../../store/user/user.actions';

const Questions = props => {
    const { categories, getUserCategories, getSubCategories } = props;
    const [selectedCategory, setCategory] = useState(null);
    return (
        <div>
            {!selectedCategory && (
                <SelectCategory title='Category' isRequired={true} setCategory={setCategory} categories={categories} getUserCategories={getUserCategories} />
            )}
            {selectedCategory && (
                <CreateQuestion categories={categories} selectedCategory={selectedCategory} getSubCategories={getSubCategories} />
            )}
        </div>
    )
}
Questions.propTypes = {
    getUserCategories: PropTypes.func.isRequired,
    getSubCategories: PropTypes.func,
    categories: PropTypes.array.isRequired,
};
const mapStateToProps = state => {
    const { categories } = state.signUp;
    return {
        categories,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getUserCategories: () => dispatch(GetUserCategories()),
        getSubCategories: (categoryId) => dispatch(getSubCategoriesForUserSettings(categoryId)),

    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Questions);