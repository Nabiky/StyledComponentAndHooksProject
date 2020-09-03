import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { theme } from 'styled-tools';

import * as Text from '#lib/Text';
import Grid from '#lib/Grid';
import GridColumn from '#lib/GridColumn';
import GridColumnRightAlign from '#lib/GridColumnRightAlign';
import Input from '#lib/Input';
import Button from '#lib/Button';
import FlexRow from '#lib/FlexRow';

import { SITE_COMPLETED } from '#recommendation/constants/siteLoadingStatus';
import SiteDetailAddress from '#recommendation/components/SiteDetailAddress';

function SiteDetail({
    siteName,
    address,
    siteType,
    siteStatus,
    onCancelEdit,
    onSaveEdit,
    updateSiteName,
    tempSiteNameError,
    showSiteNameError,
    setShowSiteNameError,
}) {
    return (
        <Wrapper>
            <GridColumn columns={3}>
                <Input
                    label="Site name"
                    value={siteName}
                    onChange={e => updateSiteName(e.target.value)}
                    error={showSiteNameError ? tempSiteNameError : ''}
                    onBlur={() => setShowSiteNameError(true)}
                />
            </GridColumn>

            <GridColumn columns={7}>
                <SiteDetailAddress address={address} siteType={siteType} />
            </GridColumn>
            {siteStatus === SITE_COMPLETED && (
                <GridColumnRightAlign columns={2}>
                    <FlexRow>
                        <Button noStyle onClick={onCancelEdit}>
                            <Text.Body1>Cancel</Text.Body1>
                        </Button>
                        <Button noStyle onClick={onSaveEdit}>
                            <Text.Body1>Done</Text.Body1>
                        </Button>
                    </FlexRow>
                </GridColumnRightAlign>
            )}
        </Wrapper>
    );
}

SiteDetail.propTypes = {
    siteName: PropTypes.string,
    address: PropTypes.string,
    siteType: PropTypes.string,
    siteStatus: PropTypes.string.isRequired,
    onCancelEdit: PropTypes.func.isRequired,
    onSaveEdit: PropTypes.func.isRequired,
    updateSiteName: PropTypes.func.isRequired,
    tempSiteNameError: PropTypes.string.isRequired,
    showSiteNameError: PropTypes.bool.isRequired,
    setShowSiteNameError: PropTypes.func.isRequired,
};

SiteDetail.defaultProps = {
    siteName: '',
    address: '',
    siteType: '',
};

export default SiteDetail;

const Wrapper = styled(Grid)`
    padding: 16px 24px;
    background-color: ${theme('background-color.bg-grey-1')};
`;
