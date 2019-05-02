import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SelectCategory from './selectCategory';
import CreateQuestion from './createQuestion';
import { GetUserCategories } from './../../../store/signUp/signUp.actions';

const Questions = props => {
    const { categories, getUserCategories,  } = props;
    const [selectedCategory, setCategory] = useState(null);
    return (
        <div>
            {!selectedCategory && (
                <SelectCategory title='Category' isRequired={true} setCategory={setCategory} categories={categories} getUserCategories={getUserCategories} />
            )}
            {selectedCategory && (
                <CreateQuestion  selectedCategory={selectedCategory} />
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
       

    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Questions);