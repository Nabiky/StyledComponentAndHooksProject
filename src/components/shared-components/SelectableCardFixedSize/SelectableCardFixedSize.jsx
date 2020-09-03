import styled from 'styled-components';
import SelectableCard from '#lib/SelectableCard';
import { media } from '#constants/styleConstants';

const SelectableCardFixedSize = styled(SelectableCard)`
    width: 160px;
    height: 77px;

    ${media.tablet} {
        width: 140px;
    }
`;

export default SelectableCardFixedSize;
