import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { theme } from 'styled-tools';
import * as Text from '#lib/Text';

const NotFoundMessage = ({ children }) => (
    <NoItemWrapper>
        <NoItemMessage>{children}</NoItemMessage>
    </NoItemWrapper>
);

export default NotFoundMessage;

const NoItemWrapper = styled.div`
    height: 250px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const NoItemMessage = styled(Text.Body1)`
    color: ${theme('text-color.text-grey-3')};
`;

NotFoundMessage.propTypes = {
    children: PropTypes.string,
};

NotFoundMessage.defaultProps = {
    children: '',
};
