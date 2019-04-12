import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SelectCategory from './selectCategory';
import { GetUserCategories } from '../../../store/signUp/signUp.actions';

const Answers = props => {
    const {getUserCategories, categories} = props
    const [selectedCategory, setCategory] = useState(null);
    return (
        <div>
            {!selectedCategory && (
                <SelectCategory title='Category'  setCategory={setCategory} categories={categories} getUserCategories={getUserCategories} />
            )}
            {selectedCategory && (
                <div>dfb</div>
                // <CreateQuestion categories={categories} selectedCategory={selectedCategory} getSubCategories={getSubCategories} />
            )}
        </div>
    )
}
Answers.propTypes = {
    categories: PropTypes.array.isRequired,
    getUserCategories: PropTypes.func.isRequired,
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
        // getSubCategories: (categoryId) => dispatch(getSubCategoriesForUserSettings(categoryId)),

    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Answers);