import styled from 'styled-components';
import { theme } from 'styled-tools';

import Grid from '#lib/Grid';


const ServiceWrapperGrid = styled(Grid)`
    padding: 24px;
    border-bottom: 1px solid ${theme('background-color.bg-grey-1')};
`;

export default ServiceWrapperGrid;
