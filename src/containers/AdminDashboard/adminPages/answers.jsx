import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SelectCategory from './selectCategory';
import { GetUserCategories } from './../../../store/signUp/signUp.actions';
import Announcements from '../announcements/announcements';
import { getAnnouncments } from './../../../store/admin/admin.actions';

const Answers = props => {
    const {getUserCategories, categories, getAnnouncments} = props
    const [selectedCategory, setCategory] = useState(null);
    return (
        <div>
            {!selectedCategory && (
                <SelectCategory title='Category'  setCategory={setCategory} categories={categories} getUserCategories={getUserCategories} />
            )}
            {selectedCategory && (
                <Announcements  getAnnouncments = {getAnnouncments} selectedCategory = {selectedCategory}/>
            )}
        </div>
    )
}
Answers.propTypes = {
    categories: PropTypes.array.isRequired,
    getUserCategories: PropTypes.func.isRequired,
    getAnnouncments: PropTypes.func.isRequired,
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
        getAnnouncments: (categoryId,) => dispatch(getAnnouncments(categoryId)),
        // getSubCategories: (categoryId) => dispatch(getSubCategoriesForUserSettings(categoryId)),

    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Answers);