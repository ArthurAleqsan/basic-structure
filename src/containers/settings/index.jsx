import React, { PureComponent } from 'react';
import { Input, Button } from '../../components/componentsLib/simpleUiComponents';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import "./../../../assets/styles/datepicker.scss";
import UserImage from './../../components/componentsLib/userImage';
import ChangePassword from './../../components/popups/changePasswordPopup';
import ChangeImage from '../../components/popups/changeImagePopup';
import { connect } from 'react-redux';
import { changeUserSettingsFields, getSubCategoriesForUserSettings, setUserSettings, changeUserSettings } from '../../store/user/user.actions';
import Location from '../../components/location/MapWithSearch';

// function required() {
//    
// }
// function isSettingsFormInvalid() {
//     const fields = {
//         firstName: required,
//         lastName: required,
//         school: () => required('lat','lng','school'),
//        
//     }
// }

class EditUser extends PureComponent {
    constructor(props) {
        super(props);
        this.handlerChange = this.handlerChange.bind(this);
        this.showPopup = this.showPopup.bind(this);
        this.closePopUp = this.closePopUp.bind(this);
        this.showChangeImage = this.showChangeImage.bind(this);
        this.closeChangeImage = this.closeChangeImage.bind(this);
        this.state = {
            password: '',
            showPasswordPopup: false,
            showChangeImagePopup: false,
            invalidFields: new Set(),
        }
    }
    
    componentDidMount() {
        this.props.getSubCategoriesForUserSettings(this.props.categoryId);
    }
    
    setValidationField(field, isValid) {
        const prevInvalidFields = this.state.invalidFields;
        if (isValid) {
            prevInvalidFields.delete(field)
        }else {
            prevInvalidFields.add(field)
        }
        const invalidFields = isValid ? new Set(prevInvalidFields) : new Set(prevInvalidFields);
        this.setState({invalidFields});
    }
    
    handlerChange(field, value, isValid) {
        this.props.changeUserSettingsFields(field, value);
        this.setValidationField(field, isValid)
    }
    
    handleChangeEducation(data) {
        this.setValidationField('school', !!data.education.name);
        this.props.changeUserSettings(data)
    }
    
    showPopup() {
        this.setState({ showPasswordPopup: true });
    }
    
    closePopUp() {
        this.setState({ showPasswordPopup: false });
    }
    
    showChangeImage(field) {
        this.setState({ showChangeImagePopup: field });
    }
    
    closeChangeImage() {
        this.setState({ showChangeImagePopup: null });
    }
    
    save() {
        this.props.setUserSettings();
    }

    render() {
        const { color, firstName, lastName, position, country, city, education, bio='', birthday,
             username, categoryName, subCategoryName, state, subCategories, type, location, phone, } = this.props;
        const { password, showPasswordPopup, showChangeImagePopup, invalidFields } = this.state;
        const displayNone = type === 'MEMBER' ? 'display-none' : ''; 
        const formInvalid = invalidFields.size;
        return (
            <section className='edit-container'>
                <div className='column left-column'>
                    <UserImage
                        userImage = {''}
                        coverImage = {''}
                        showChangeImagepopup={(type) => this.showChangeImage(type)}
                        edit={true}
                        color={color}
                        categoryName = {categoryName}
                        subCategoryName = {subCategoryName}
                        subCategories = {subCategories}
                        location = {location.pathname}
                        showImageShadow = {true}
                    />
                    {showChangeImagePopup ? <ChangeImage setPhoto={(url) => {this.handlerChange(showChangeImagePopup, url, true); this.closeChangeImage()}} close={this.closeChangeImage}/> : null}
                    <form className='edit-left-column' onSubmit={(e) => {e.preventDefault()}}>
                        <div className="form-group">
                            <label>Email</label>
                            <Input
                                name='username'
                                validation='^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$'
                                borderColor='#E6E6E6'
                                value={username}
                                disabled={true}
                                className='form-input'
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <Input
                                name='password'
                                type='password'
                                borderColor='#E6E6E6'
                                value={password}
                                onChange={(name, value, isValid) => this.handlerChange(name, value, isValid)}
                                className='form-input'
                                onClick={this.showPopup}
                            />
                            {showPasswordPopup ? <ChangePassword close={this.closePopUp} /> : null}
                        </div>
                        <div className="form-group datePicker-container">
                            <label>Birthday Date</label>
                            <DatePicker
                                name ='birthday'
                                className='form-input'
                                placeholderText='DD/MM/YY'
                                selected={birthday && new Date(birthday)}
                                onChange={(value) => this.handlerChange('birthday', new Date(value).toISOString(), true)}
                                dateFormat='dd/MM/yy'
                            />
                        </div>
                        <div className="form-group bio-form">
                            <label>Bio</label>
                            <textarea
                                name='bio'
                                value={bio}
                                className='form-input bio-input'
                                onChange={e => this.handlerChange( [e.target.name], e.target.value )}
                            >
                            </textarea>
                        </div>

                    </form>
                </div>
                <div className='column right-column'>
                    <form className='edit-right-column'>
                        <div className="form-group">
                            <label>First name</label>
                            <Input
                                borderColor='#E6E6E6'
                                name='firstName'
                                value={firstName}
                                required={true}
                                onChange={(name, value, isValid) => this.handlerChange(name, value, isValid)}
                                className='form-input'
                            />
                        </div>
                        <div className="form-group">
                            <label>Last name</label>
                            <Input
                                borderColor='#E6E6E6'
                                name='lastName'
                                value={lastName}
                                onChange={(name, value, isValid) => this.handlerChange(name, value, isValid)}
                                className='form-input'
                            />
                        </div>
                        <div className={`form-group ${displayNone}`}>
                            <label>Position</label>
                            <Input
                                borderColor='#E6E6E6'
                                name='position'
                                value={position}
                                onChange={(name, value, isValid) => this.handlerChange(name, value, isValid)}
                                className='form-input meashure-position'
                            />
                        </div>
                        <div className={`form-group`}>
                            <label>Phone</label>
                            <Input
                                borderColor='#E6E6E6'
                                name='phone'
                                value={phone}
                                onChange={(name, value, isValid) => this.handlerChange(name, value, isValid)}
                                className='form-input'
                            />
                        </div>
                        <div className='form-group location-box'>
                            <div className='location-box-column'>
                                <div className="form-group">
                                    <label>Country</label>
                                    <Input
                                        borderColor='#E6E6E6'
                                        name='country'
                                        value={country}
                                        onChange={(name, value, isValid) => this.handlerChange(name, value, isValid)}
                                        className='form-input'
                                    />
                                </div>
                                <div className="form-group">
                                    <label>City</label>
                                    <Input
                                        borderColor='#E6E6E6'
                                        name='city'
                                        value={city}
                                        onChange={(name, value, isValid) => this.handlerChange(name, value, isValid)}
                                        className='form-input'
                                    />
                                </div>
                            </div>

                            <div className='location-box-column'>
                                <div className="form-group">
                                    <label>State</label>
                                    <Input
                                        borderColor='#E6E6E6'
                                        name='state'
                                        value={state}
                                        onChange={(name, value, isValid) => this.handlerChange(name, value, isValid)}
                                        className='form-input'
                                    />
                                </div>
                                <div className="form-group">
                                    <label>School</label>
                                    <Input
                                        borderColor='#E6E6E6'
                                        name='school'
                                        value={education ? education.name : ''}
                                        required={true}
                                        //disabled={education && education.name}
                                        onChange={(name, value) => this.handleChangeEducation({education: {...education, name: value}},)}
                                        className='form-input'
                                    />
                                </div>
                            </div>
                            <div className='map-container-box'>
                                <div className='map-container'>
                                    <Location height = {400} setPlaces={ (data) => this.handleChangeEducation(data) } />
                                </div>
                            </div>
                            <div className='form-submit'>
                                <Button className = 'cancel-btn' type='button'>Cancel</Button>
                                <Button disabled={formInvalid} className = {`save-btn ${formInvalid ? 'btn-disabled': ''}`} type='button' onClick={ () => this.save() }>Save</Button>
                            </div>
                        </div>

                    </form>
                </div>

            </section>
        )
    }
}
EditUser.propTypes = {
    username: PropTypes.string.isRequired,
    bio: PropTypes.string,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    position: PropTypes.string,
    country: PropTypes.string,
    city: PropTypes.string,
    school: PropTypes.string,
    birthday: PropTypes.string,
    color: PropTypes.string.isRequired,
    categoryName: PropTypes.string.isRequired,
    subCategoryName: PropTypes.string.isRequired,
    categoryId: PropTypes.string.isRequired,
    changeUserSettingsFields: PropTypes.func.isRequired,
    getSubCategoriesForUserSettings: PropTypes.func.isRequired,
    setUserSettings: PropTypes.func.isRequired,
    subCategories: PropTypes.array.isRequired,
    state: PropTypes.string,
    type: PropTypes.string,
    phone: PropTypes.string,
    location: PropTypes.any,
    changeUserSettings: PropTypes.func.isRequired,
    education: PropTypes.any,
};

const mapStateToProps = state => {
    const { username, bio, firstName, lastName, position, country, city, school, birthday,
        category, subcategory, subcategoryCustom, state: userState, type, phone = '', education, } = state.user.currentUser;
    return {
        username,
        bio,
        type,
        phone,
        firstName,
        lastName,
        position,
        country,
        city,
        school,
        education,
        birthday,
        state: userState,
        color: category.color,
        categoryId : category.id,
        categoryName: category.name || '',
        subCategoryName: subcategory.name || subcategoryCustom,
        subCategories : state.user.subCategories
    }
};



const mapDispatchToProps = (dispatch) => ({
    getSubCategoriesForUserSettings : (id) => dispatch(getSubCategoriesForUserSettings(id)),
    changeUserSettingsFields: (field, value) => dispatch(changeUserSettingsFields(field, value)),
    setUserSettings: () => dispatch(setUserSettings()),
    changeUserSettings: (d) => dispatch(changeUserSettings(d)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);