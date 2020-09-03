import React from 'react';
import styled from 'styled-components';
import { theme } from 'styled-tools';
import * as Text from '#lib/Text';

const Description = props => <StyledCaption1 as="p" {...props} />;

const StyledCaption1 = styled(Text.Caption1)`
    color: ${theme('text-color.text-grey-3')};
`;
export default Description;
