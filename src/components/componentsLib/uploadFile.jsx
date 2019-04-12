import React, { memo, useState, useEffect, } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledInput = styled.input.attrs({
    type: 'file',
})`
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    left: 0;
    top: 0;
    cursor: pointer;
`;


// eslint-disable-next-line react/display-name
export const UploadFile = memo((props) => {
    const { upLoadFetcher } = props;
    const [file, setFile] = useState(null);
    useEffect(() => {
        if (file) {
            const fd = new FormData();
            fd.append('image', file, file.name);
            upLoadFetcher(fd);
        }
    });
    // console.log(file)
    return <StyledInput onChange={(e) => {
        setFile(e.target.files[0]);
    }
    } />
});

