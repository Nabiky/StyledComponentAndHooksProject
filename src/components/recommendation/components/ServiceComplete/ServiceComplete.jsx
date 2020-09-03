import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { theme } from 'styled-tools';

import GridColumn from '#lib/GridColumn';
import GridColumnRightAlign from '#lib/GridColumnRightAlign';
import * as Text from '#lib/Text';

import ServiceWrapperGrid from '#recommendation/components/ServiceWrapperGrid';

const LightGreyText = styled.p`
    color: ${theme('text-color.text-grey-4')}
`;

function ServiceComplete({
    product, access, bandwidth, termString, oneOffChargeString, recurringChargeString,
}) {
    return (
        <ServiceWrapperGrid>
            <GridColumn columns={9}>
                <Text.Body2>{product}</Text.Body2>
                <Text.Caption1 as={LightGreyText}>{access}</Text.Caption1>
                <Text.Caption1 as={LightGreyText}>{`${bandwidth}Mbps`}</Text.Caption1>
            </GridColumn>
            <GridColumnRightAlign columns={1}>
                <Text.Body2 as={LightGreyText}>{termString}</Text.Body2>
            </GridColumnRightAlign>
            <GridColumnRightAlign columns={1}>
                <Text.Body2>{oneOffChargeString}</Text.Body2>
            </GridColumnRightAlign>
            <GridColumnRightAlign columns={1}>
                <Text.Body2>{recurringChargeString}</Text.Body2>
            </GridColumnRightAlign>
        </ServiceWrapperGrid>
    );
}

ServiceComplete.propTypes = {
    product: PropTypes.string,
    access: PropTypes.string,
    bandwidth: PropTypes.string,
    termString: PropTypes.string,
    oneOffChargeString: PropTypes.string,
    recurringChargeString: PropTypes.string,
};

ServiceComplete.defaultProps = {
    product: '',
    access: '',
    bandwidth: '',
    termString: '',
    oneOffChargeString: '',
    recurringChargeString: '',
};

export default ServiceComplete;
