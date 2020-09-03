import styled from 'styled-components';
import { theme, prop, ifProp } from 'styled-tools';

const SelectableCard = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid;
    border-color: ${ifProp(
        'selected',
        theme('background-color.interaction-color'),
        theme('background-color.bg-grey-1'),
    )};
    border-radius: ${ifProp('round', '20px', '0px')};
    width: 100%;
    height: ${ifProp('round', '40px', '80px')};
    background-color: ${theme('background-color.bg-white')};

    cursor: pointer;

    > p:first-of-type {
        color:${ifProp(
        'selected',
        theme('background-color.interaction-color'),
        theme('background-color.bg-grey-5'),
    )}
    }

    grid-row: ${prop('rowIndex')};
    grid-column: ${prop('columnIndex')};
`;

export default SelectableCard;
