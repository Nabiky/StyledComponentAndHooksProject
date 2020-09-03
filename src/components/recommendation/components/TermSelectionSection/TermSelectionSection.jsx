import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import SelectableCardFixedSize from '#shared-components/SelectableCardFixedSize';
import SelectableCardGroup from '#shared-components/SelectableCardGroup';
import Heading2Wrapper from '#shared-components/Heading2Wrapper';
import Heading2 from '#shared-components/Heading2';
import Description from '#shared-components/Description';
import Body from '#shared-components/Body';

const TermSelectionSection = ({
    title, description, options, selectTerm, selectedTerm,
}) => (
    <>
        <Heading2Wrapper>
            <Heading2>{title}</Heading2>
            <Description>
                {description}
            </Description>
        </Heading2Wrapper>

        <SelectableCardGroup>
            {options.map(option => (
                <SelectableCardFixedSize
                    selected={_.isEqual(selectedTerm, option)}
                    onClick={() => selectTerm(option)}
                    key={`${option.value}-${option.period}`}
                >
                    <Body>{`${option.value} ${option.period}`}</Body>
                </SelectableCardFixedSize>
            ))}
        </SelectableCardGroup>
    </>
);

export default TermSelectionSection;

TermSelectionSection.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
        term: PropTypes.number,
        period: PropTypes.string,
    })),
    selectTerm: PropTypes.func,
    selectedTerm: PropTypes.shape({
        term: PropTypes.number,
        period: PropTypes.string,
    }),
};

TermSelectionSection.defaultProps = {
    options: [],
    selectTerm: () => {},
    selectedTerm: {},
};
