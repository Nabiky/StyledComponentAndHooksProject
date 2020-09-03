import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import * as Text from '#lib/Text';
import Icon from '#lib/FontIcons';

const Wrapper = styled.div`
    margin: 72px auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const ErrorText = styled(Text.Body1)`
    text-align: center;
`;

const FailureMessage = ({ errorMessage }) => (
    <Wrapper>
        <Icon name="warning-f" size="48px" marginBottom="16px" />
        <ErrorText>{errorMessage}</ErrorText>
    </Wrapper>
);

export default FailureMessage;

FailureMessage.propTypes = {
    errorMessage: PropTypes.string.isRequired,
};
