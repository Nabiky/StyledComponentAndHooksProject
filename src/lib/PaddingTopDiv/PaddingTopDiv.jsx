import styled from 'styled-components';
import { switchProp, prop } from 'styled-tools';
import sizePixelMap from '#constants/sizePixelMap';

const PaddingTopDiv = styled.div`
    padding-top: ${switchProp(prop('paddingSize', '4'), sizePixelMap)};

`;

export default PaddingTopDiv;
