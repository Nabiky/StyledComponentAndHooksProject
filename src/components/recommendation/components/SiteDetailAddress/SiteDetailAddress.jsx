import React, { useContext, useMemo } from 'react';
import styled from 'styled-components';
import { theme } from 'styled-tools';
import PropTypes from 'prop-types';
import uuid from 'uuid';

import * as Text from '#lib/Text';

import KeyDisplayStringContext from '#recommendation/KeyDisplayStringContext';

const SiteDetailAddress = ({ address, siteType }) => {
    const KeyDisplayStringMap = useContext(KeyDisplayStringContext);
    const labelPairUuid = useMemo(() => uuid.v4(), []);

    return (
        <>
            <Labels as="label" htmlFor={labelPairUuid}>Address</Labels>
            <DetailText id={labelPairUuid}>
                {address}
                <SiteTypeLabel>
                    {` - ${KeyDisplayStringMap[siteType]}`}
                </SiteTypeLabel>
            </DetailText>
        </>
    );
};

SiteDetailAddress.propTypes = {
    address: PropTypes.string.isRequired,
    siteType: PropTypes.string.isRequired,
};

export default SiteDetailAddress;

const Labels = styled(Text.Label1)`
    color: ${theme('text-color.text-grey-4')};
    margin-bottom: 8px;
`;

const SiteTypeLabel = styled.span`
    color: ${theme('text-color.text-grey-4')};
`;

const DetailText = styled(Text.Body2)`
    color: ${theme('text-color.text-grey-5')};
`;
