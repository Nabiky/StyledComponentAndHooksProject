import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as Text from '#lib/Text';

const Numbers = ({
    array,
    startIndex,
    endIndex,
    selectPage,
    currentPage,
}) => array.slice(startIndex, endIndex).map(label => (
    <NumberWrapper key={label} onClick={() => selectPage(label)}>
        <Number name="pagination-number" selected={currentPage === label}>
            {label}
        </Number>
    </NumberWrapper>
));

export default Numbers;

Numbers.proptypes = {
    array: PropTypes.arrayOf(PropTypes.string).isRequired,
    startIndex: PropTypes.number.isRequired,
    endIndex: PropTypes.number.isRequired,
    selectPage: PropTypes.func.isRequired,
    currentPage: PropTypes.string.isRequired,
};

const NumberWrapper = styled.div`
    padding: 0 8px;
    margin: 0 8px;
    cursor: pointer;
`;

const Number = styled(Text.Body2)`
    color: ${props => (props.selected ? props.theme.mainColorOne : props.theme.darkerGray)};
`;
