import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next/hooks';
import { ImageBox } from '../../components/componentsLib/ImageBox';
import { Input, Button } from '../../components/componentsLib/simpleUiComponents';
import {
    SetUserType,
    SetUserCountry,
    SetUserCity,
    SetUserPosition,
    SetUserState,
    SetUserEducation,
    setMultiple
} from './../../store/signUp/signUp.actions';

import Location from '../../components/location/MapWithSearch';

const Step_two = props => {
    const { measureName, measureUrl, userName, userUrl,
        SetUserType, SetUserCountry, SetUserCity, SetUserPosition, SetUserState, SetUserEducation, setMultiple,
        type, country, city, provinceOrState, position, education, color, subcategoryCustom } = props;
    const [t] = useTranslation();
    const setMultipleFields = (data) => {
       setMultiple(data)
    };
    const handlerChange = (name, value) => {

        if (value) {
            switch (name) {
                case 'country':
                    SetUserCountry(value);
                    break;
                case 'city':
                    SetUserCity(value);
                    break;
                case 'position':
                    SetUserPosition(value);
                    break;
                case 'state':
                    SetUserState(value);
                    break;
            }
        }
    };
    return (
        <div className='container-body'>
            <div className='container-header'>
                <h1>{t('Sign Up')}</h1>
                <h2>{t('Select School and Status')}</h2>
            </div>
            <div className='measure'>
                <ImageBox
                    id='MEMBER'
                    width='40%'
                    height='130px'
                    image={!subcategoryCustom ? userUrl : 'https://cdn.studentloanhero.com/wp-content/uploads/private-student-loan-forgiveness-640x300.jpg'}
                    borderColor = {color}
                    borderSize={type === 'MEMBER' ? '7px' : '0'}
                    onClick={(e) => SetUserType(e.target.id, true)}
                    name={!subcategoryCustom ? userName : t(`User from ${subcategoryCustom}`)}
                />
                <ImageBox
                    id='TEACHER'
                    width='40%'
                    height='130px'
                    image={!subcategoryCustom ? measureUrl : 'https://michaelt1979.files.wordpress.com/2012/01/large.png'}
                    borderColor = {color}
                    borderSize={type === 'TEACHER' ? '7px' : '0'}
                    onClick={(e) => SetUserType(e.target.id, true)}
                    name={!subcategoryCustom ? measureName : t(`Teacher from ${subcategoryCustom}`)}
                />
            </div>
            <form className='position' onSubmit={e => e.preventDefault()}>
                <Input style={{ visibility: type === 'TEACHER' ? 'unset' : 'hidden' }}
                    name='position' value={position}
                    borderColor='#E6E6E6'
                    className='form-input'
                    placeholder='Your Position'
                    onChange={(name, value) => handlerChange(name, value)}
                />
            </form>
            <div className='map-container-box'>
                <div className='map-container'>
                    <Location  height = {260} setPlaces={(data) => setMultipleFields(data)} />
                </div>
            </div>
            <form className='sign-up-step' onSubmit={e => e.preventDefault()}>
                <div className='sign-up-step-input-group'>
                    <div className="form-group">
                        <label>{t('Country')}</label>
                        <Input name='country' value={country} borderColor='#E6E6E6' className='form-input' onChange={(name, value) => handlerChange(name, value)} />
                    </div>

                    <div className="form-group">
                        <label>{t('City')}</label>
                        <Input name='city' value={city} borderColor='#E6E6E6' className='form-input' onChange={(name, value) => handlerChange(name, value)} />
                    </div>
                </div>
                <div className='sign-up-step-input-group'>
                    <div className="form-group">
                        <label>{t('State')}</label>
                        <Input name='state' value={provinceOrState} borderColor='#E6E6E6' className='form-input' onChange={(name, value) => handlerChange(name, value)} />
                    </div>
                    <div className='create-step'>
                        <label>{t('School Name')}</label>
                        <Input name='school' value={education.name} borderColor='#E6E6E6' className='form-input' onChange={(name, value) => SetUserEducation({ ...education, name: value })} />
                        <Button> Search/Create </ Button>
                        <p className='step-desc'>{("Can't find your school, you can create it manually by clicking CREATE button")}</p>
                    </div>
                </div>
            </form>
        </div>
    )
};

Step_two.propTypes = {
    measureName: PropTypes.string,
    measureUrl: PropTypes.string,
    userName: PropTypes.string,
    userUrl: PropTypes.string,
    SetUserType: PropTypes.func.isRequired,
    SetUserCountry: PropTypes.func.isRequired,
    SetUserCity: PropTypes.func.isRequired,
    SetUserPosition: PropTypes.func.isRequired,
    SetUserState: PropTypes.func.isRequired,
    SetUserEducation: PropTypes.func.isRequired,
    setMultiple: PropTypes.func.isRequired,
    type: PropTypes.string,
    country: PropTypes.string,
    city: PropTypes.string,
    provinceOrState: PropTypes.string,
    color: PropTypes.string,
    position: PropTypes.any,
    education: PropTypes.object,
};
const mapStateToProps = state => {
    const { measureName, measureUrl, userName, userUrl } = state.signUp.subCategoryObj;
    const { type, country, city, state: provinceOrState, position, education, categoryId, categories, subcategoryCustom } = state.signUp;
    const category = categories.find(category => category.id === categoryId);
    return {
        subcategoryCustom,
        measureName,
        measureUrl,
        userName,
        userUrl,
        type,
        country,
        city,
        provinceOrState,
        position,
        education,
        color : category ? category.color : null,
    }

};
const mapDispatchToProps = {
    SetUserType,
    SetUserCountry,
    SetUserCity,
    SetUserPosition,
    SetUserState,
    SetUserEducation,
    setMultiple,
};
export default connect(mapStateToProps, mapDispatchToProps)(Step_two); 