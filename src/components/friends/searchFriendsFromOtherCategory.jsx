import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next/hooks';
import SearchedUser from './searchedUser';
import { searchUser, getSubCategoriesForUserSettings } from '../../store/user/user.actions';
import { GetUserCategories } from '../../store/signUp/signUp.actions';
// import { Select } from 'antd';

const SearchFriendsFromOtherCategory = props => {
    const { foundedUsers, query, categoryId, subCategories, categories, getCategories, searchUser, getSubCategoriesForUserSettings, } = props;
    const [t] = useTranslation();
    useEffect(() => getCategories(), []);
    const categoriesExceptOwn = categories.filter(category => category.id !== categoryId);
    const categoryParser = query => {
        const data = JSON.parse(query);
        searchUser(data);
        getSubCategoriesForUserSettings(data.categoryId);
    }
    const subCategoryParser = query => {
        const data = JSON.parse(query);
        searchUser(data);
    }
    // const Option = Select.Option;
    return (
        <div>
            <div className='search-friends-container-header'>
                <select className='form-input selectBox' onChange={() => categoryParser(event.target.value)}>
                    <option value={JSON.stringify({ ...query, categoryId: '', subcategoryId: '' })}>{t('Search from all categories')}</option>
                    {categoriesExceptOwn.map(catergory => {
                        return <option key={catergory.id} value={JSON.stringify({ ...query, categoryId: catergory.id, subcategoryId: '' })}>{catergory.name}</option>
                    })}
                </select>
                <select className='form-input selectBox changeCategory' onChange={() => subCategoryParser(event.target.value)}>
                    <option value={JSON.stringify({ ...query, subcategoryId: '' })}>{t('Search from all sub-categories')}</option>
                    {subCategories.map(subCatergory => {
                        return <option key={subCatergory.id} value={JSON.stringify({ ...query, subcategoryId: subCatergory.id })}>{subCatergory.name}</option>
                    })}
                </select>
                {/* <div>
                    <Select defaultValue="1" className='form-selectbox'>
                        <Option value="1">Between</Option>
                        <Option value="2">Except</Option>
                        <Option value="3">Except</Option>
                        <Option value="4">Except</Option>
                    </Select>
                </div> */}


            </div>
            <div className='search-friends-container-body'>
                {foundedUsers.length > 0 ? foundedUsers.map(
                    foundedUser => {
                        const subcategoryName = foundedUser.subcategory ? foundedUser.subcategory.name : foundedUser.subcategoryCustom;
                        return (

                            <SearchedUser
                                user={foundedUser}
                                users={foundedUsers}
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
SearchFriendsFromOtherCategory.propTypes = {
    foundedUsers: PropTypes.array.isRequired,
    query: PropTypes.any,
    categoryId: PropTypes.string.isRequired,
    subCategories: PropTypes.array.isRequired,
    categories: PropTypes.array.isRequired,
    getCategories: PropTypes.func,
    searchUser: PropTypes.func,
    getSubCategoriesForUserSettings: PropTypes.func,
}
const mapStateToProps = state => ({
    foundedUsers: state.user.foundedUsers,
    query: state.user.query,
    categoryId: state.user.currentUser.category.id,
    subCategories: state.user.subCategories,
    categories: state.signUp.categories,
});


const mapDispatchToProps = dispatch => ({
    getSubCategoriesForUserSettings: (id) => dispatch(getSubCategoriesForUserSettings(id)),
    searchUser: (query) => dispatch(searchUser(query)),
    getCategories: () => dispatch(GetUserCategories()),
});
export default connect(mapStateToProps, mapDispatchToProps)(SearchFriendsFromOtherCategory);