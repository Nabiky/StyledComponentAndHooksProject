import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { theme } from 'styled-tools';
import uuid from 'uuid';

import * as Text from '#lib/Text';
import Grid from '#lib/Grid';
import GridColumn from '#lib/GridColumn';
import GridColumnRightAlign from '#lib/GridColumnRightAlign';

import { SITE_COMPLETED } from '#recommendation/constants/siteLoadingStatus';
import HamburgerMenu from '#recommendation/components/HamburgerMenu';
import SiteDetailAddress from '#recommendation/components/SiteDetailAddress';

function SiteDetail({
    siteName, address, siteType, siteStatus, onDeleteSite, onEdit,
}) {
    const labelPairUuid = useMemo(() => uuid.v4(), []);

    return (
        <Wrapper>
            {siteName
                && (
                    <GridColumn columns={3}>
                        <Labels as="label" htmlFor={labelPairUuid}>Site name</Labels>
                        <DetailText id={labelPairUuid}>{siteName}</DetailText>
                    </GridColumn>
                )
            }

            <GridColumn columns={7}>
                <SiteDetailAddress address={address} siteType={siteType} />
            </GridColumn>
            {siteStatus === SITE_COMPLETED && (
                <GridColumnRightAlign columns={2}>
                    <HamburgerMenu>
                        <EditText onClick={onEdit}>Edit</EditText>
                        <DeleteText onClick={onDeleteSite}>Remove</DeleteText>
                    </HamburgerMenu>
                </GridColumnRightAlign>
            )
            }
        </Wrapper>
    );
}

SiteDetail.propTypes = {
    siteName: PropTypes.string,
    address: PropTypes.string,
    siteType: PropTypes.string,
    siteStatus: PropTypes.string.isRequired,
    onDeleteSite: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
};

SiteDetail.defaultProps = {
    siteName: '',
    address: '',
    siteType: '',
};

export default SiteDetail;

const Labels = styled(Text.Label1)`
    color: ${theme('text-color.text-grey-4')};
    margin-bottom: 8px;
`;


const DetailText = styled(Text.Body2)`
    color: ${theme('text-color.text-grey-5')}
`;

const EditText = styled(Text.Body1)`
    color: ${theme('text-color.text-grey-5')};

    &:hover {
        color: ${theme('text-color.interaction-color')};
    }
`;

const DeleteText = styled(Text.Body1)`
    color: ${theme('text-color.text-alert-red')};
`;

const Wrapper = styled(Grid)`
    padding:24px;
    background-color: ${theme('background-color.bg-grey-1')};
`;
