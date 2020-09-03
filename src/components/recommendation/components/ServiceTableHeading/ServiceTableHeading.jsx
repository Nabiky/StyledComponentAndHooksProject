import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { theme } from 'styled-tools';

import GridColumn from '#lib/GridColumn';
import GridColumnRightAlign from '#lib/GridColumnRightAlign';
import * as Text from '#lib/Text';

import ServiceWrapperGrid from '#recommendation/components/ServiceWrapperGrid';

function ServiceTableHeading({ showTerms }) {
    return (
        <Wrapper>
            <GridColumn columns={9}>
                <HeaderText>Product / Service</HeaderText>
            </GridColumn>
            { showTerms && (
                <GridColumnRightAlign columns={1}>
                    <HeaderText>Term</HeaderText>
                </GridColumnRightAlign>
            ) }
            <GridColumnRightAlign columns={1}>
                <HeaderText>One-off</HeaderText>
            </GridColumnRightAlign>
            <GridColumnRightAlign columns={1}>
                <HeaderText>Monthly</HeaderText>
            </GridColumnRightAlign>
        </Wrapper>
    );
}

export default ServiceTableHeading;

ServiceTableHeading.propTypes = {
    showTerms: PropTypes.bool.isRequired,
};

const Wrapper = styled(ServiceWrapperGrid)`
    border-width: 2px;
`;

const HeaderText = styled(Text.Body2)`
    color: ${theme('text-color.text-grey-4')}
`;
