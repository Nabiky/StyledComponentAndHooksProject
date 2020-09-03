import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { theme } from 'styled-tools';

import * as Text from '#lib/Text';

import ServiceWrapperGrid from '#recommendation/components/ServiceWrapperGrid';

function ServiceFailed({ errorMessage }) {
    return (
        <ServiceWrapperGrid>
            <ErrorText>
                {errorMessage}
            </ErrorText>
        </ServiceWrapperGrid>
    );
}

ServiceFailed.propTypes = {
    errorMessage: PropTypes.string,
};

ServiceFailed.defaultProps = {
    errorMessage: "Sorry! we couldn't find anything for this address.",
};

export default ServiceFailed;

const ErrorText = styled(Text.Body1)`
    color: ${theme('text-color.text-alert-red')}
`;
