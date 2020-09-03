import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';
import React from 'react';
import { ReactComponent as LoaderIcon } from './loader.svg';
import { Body1 } from '#lib/Text';

const Loader = ({ loadingText }) => (
    <>
        <Wrapper>
            <Rotate>
                <LoaderIcon />
            </Rotate>
        </Wrapper>
        <Body1>
            { loadingText || 'loading...'}
        </Body1>
    </>
);

export default Loader;

const rotate360 = keyframes`
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
`;

const Rotate = styled.div`
    display: inline-block;
    animation: ${rotate360} 1s linear infinite;
    padding: 2rem 1rem;
`;

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    font-size: 60px;
`;

Loader.propTypes = {
    loadingText: PropTypes.string,
};

Loader.defaultProps = {
    loadingText: '',
};
