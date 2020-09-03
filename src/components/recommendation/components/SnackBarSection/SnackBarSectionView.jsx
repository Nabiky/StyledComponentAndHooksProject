import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { theme } from 'styled-tools';

import Button from '#lib/Button';
import FlexRow from '#lib/FlexRow';
import * as Text from '#lib/Text';

function Price({
    topLabel, mainPrice, bottomLabel, id,
}) {
    return (
        <div>
            <PriceTopLabel as="label" htmlFor={id}>{topLabel}</PriceTopLabel>
            <Text.Body2 id={id}>{mainPrice}</Text.Body2>
            <Text.Label2>{bottomLabel}</Text.Label2>
        </div>
    );
}

const PriceTopLabel = styled(Text.Label2)`
    color: ${theme('mainColorOne')}
`;

Price.propTypes = {
    topLabel: PropTypes.string,
    mainPrice: PropTypes.string,
    bottomLabel: PropTypes.string,
    id: PropTypes.string.isRequired,
};

Price.defaultProps = {
    topLabel: '',
    mainPrice: '',
    bottomLabel: '',
};


function SnackBarSection({
    monthlyFees, oneOffFees, onNext, onCancel,
}) {
    return (
        <Wrapper>
            <FlexRow desktopSpacing={6} tabletSpacing={4}>
                <Price id="monthly-charge" topLabel="Total monthly fees" mainPrice={monthlyFees} bottomLabel="excl GST" />
                <Price id="one-off-charge" topLabel="Total one off fees" mainPrice={oneOffFees} bottomLabel="excl GST" />
            </FlexRow>
            <FlexRow desktopSpacing={2} tabletSpacing={2}>
                { onCancel && <Button secondary onClick={onCancel}>Cancel</Button>}
                { onNext && <Button onClick={onNext}>Next</Button>}
            </FlexRow>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;


SnackBarSection.propTypes = {
    monthlyFees: PropTypes.string,
    oneOffFees: PropTypes.string,
    onNext: PropTypes.func,
    onCancel: PropTypes.func,
};

SnackBarSection.defaultProps = {
    monthlyFees: '$0.00',
    oneOffFees: '$0.00',
    onNext: undefined,
    onCancel: undefined,
};

export default SnackBarSection;
