import React from 'react';
import styled from 'styled-components';
import * as Text from '#lib/Text';

const Heading1 = props => <StyledH3 as="h1" {...props} />;

const StyledH3 = styled(Text.H3)`
    margin-bottom: 16px;
`;

export default Heading1;
