import React, { memo } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledSubCategory = styled.div`
    justify-content: space-between;
    background-color:${props => props.color};
    border-radius: 5px;
    color : #fff;
    padding: 3px;
    align-items: center;
    margin-top: 10px; 
    transition: background-color .3s ease-out;
    cursor: pointer;
    :hover {
        background-color: #fff;
        padding: 0;
        border: 3px solid ${props => props.color};
        color: ${props => props.color};
    }
`;
StyledSubCategory.defaultProps = {
    color : 'var(--hiroColor)',
}
const StyledSubCategoryName = styled.span`
    font-size: 12px;
    padding: 0 5px;
`;
// eslint-disable-next-line react/display-name
export const SubCategoryContainer = memo(props => {
    const {id, onClick, name, color} = props;
    return <StyledSubCategory id ={id} onClick = {onClick} color ={color}>
                <StyledSubCategoryName color ={color}>{name}</StyledSubCategoryName>
            </StyledSubCategory>
})

SubCategoryContainer.propTypes = {
    id : PropTypes.string.isRequired,
    name : PropTypes.string.isRequired,
    color : PropTypes.string,
    onClick : PropTypes.func.isRequired,
}