import * as Text from '#lib/Text';
import React from 'react';
import styled from 'styled-components';

const Heading3 = props => <StyledH3 as="h3" {...props} />;

const StyledH3 = styled(Text.Body2)`
    margin-bottom: 8px;
`;

export default Heading3;
