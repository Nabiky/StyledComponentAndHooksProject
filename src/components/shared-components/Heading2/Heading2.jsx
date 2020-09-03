import React from 'react';
import styled from 'styled-components';
import * as Text from '#lib/Text';

const Heading2 = props => <StyledH4 as="h2" {...props} />;

const StyledH4 = styled(Text.H4)`
    margin-bottom: 8px;
`;

export default Heading2;
