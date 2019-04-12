import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SearchedUser from './searchedUser';
import { searchUser, getSubCategoriesForUserSettings } from '../../store/user/user.actions';



const SearchFriendsFromCategory = props => {
    const { foundedUsers, query, searchUser, categoryId, subCategoryId, subCategories, getSubCategoriesForUserSettings,  } = props;

    useEffect(() => { getSubCategoriesForUserSettings(categoryId) }, []);
    const parser = query => {
        const data = JSON.parse(query);
        searchUser(data);
    };
    // console.log(subCategoryId)
    return (
        <div>
            <div className='search-friends-container-header'>
                <select className='form-input selectBox' defaultValue={categoryId} onChange={() => parser(event.target.value)}>
                    {subCategories.map(option => {
                        return <option key={option.id} selected = {subCategoryId === option.id} value={JSON.stringify({ ...query, subcategoryId: option.id })}>{option.name}</option>
                    })}
                </select>
            </div>
            <div className='search-friends-container-body'>
                {foundedUsers.length > 0 ? foundedUsers.map(
                    foundedUser => {
                        const subcategoryName = foundedUser.subcategory ? foundedUser.subcategory.name : foundedUser.subcategoryCustom;
                        return (
                            <SearchedUser
                                user={foundedUser}
                                users = {foundedUsers}
                                userId={foundedUser.id}
                                key={foundedUser.id}
                                image={foundedUser.profilePictureUrl}
                                name={`${foundedUser.firstName} ${foundedUser.lastName}`}
                                category={`${foundedUser.category.name}, ${subcategoryName}`}
                                color={foundedUser.category.color}
                            />
                        )
                    }
                ) : (<div>User Not Found</div>)}

            </div>
        </div>
    )
}
SearchFriendsFromCategory.propTypes = {
    foundedUsers: PropTypes.array.isRequired,
    query: PropTypes.any,
    searchUser: PropTypes.func.isRequired,
    categoryId: PropTypes.string,
    subCategoryId: PropTypes.string,
    subCategories: PropTypes.array,
    getSubCategoriesForUserSettings: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
    foundedUsers: state.user.foundedUsers,
    query: state.user.query,
    categoryId: state.user.currentUser.category.id,
    subCategoryId: state.user.currentUser.subcategory.id,
    subCategories: state.user.subCategories,
});

const mapDispatchToProps = dispatch => ({
    getSubCategoriesForUserSettings: (id) => dispatch(getSubCategoriesForUserSettings(id)),
    searchUser: (query) => dispatch(searchUser(query)),

});
export default connect(mapStateToProps, mapDispatchToProps)(SearchFriendsFromCategory);