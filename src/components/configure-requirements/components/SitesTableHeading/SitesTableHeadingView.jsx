import React from 'react';
import styled from 'styled-components';
import { theme } from 'styled-tools';
import PropTypes from 'prop-types';
import HeadingTitles from '#configure-requirements/constants/HeadingTitles';
import InformationTooltip, { WindowDetails } from '#lib/InformationTooltip';
import Grid from '#lib/Grid';
import GridColumn from '#lib/GridColumn';
import { Body2, Caption3 } from '#lib/Text';

const {
    Address,
    NoUser,
    Bandwidth,
    WorkingHours,
    Diversity,
    TypeofSite,
} = HeadingTitles;

const SitesTableHeadingView = ({ sites }) => (

    <StickyWrapper>
        <GridFlexStart gutter="3">
            <GridColumn columns={4}>
                <HeaderText>{`${Address} (${sites.length})`}</HeaderText>
            </GridColumn>

            <GridColumn columns={1}>
                <HeaderText>{NoUser}</HeaderText>
            </GridColumn>

            <GridColumn columns={1}>
                <HeaderText>{Bandwidth}</HeaderText>
                <AsideInfo>in mbps</AsideInfo>
            </GridColumn>

            <GridColumn columns={2}>
                <HeaderText>{WorkingHours}</HeaderText>
            </GridColumn>

            <GridColumnRow columns={2}>
                <HeaderText>{Diversity}</HeaderText>
                <InformationTooltip
                    title="Types of diversity"
                    marginTop="-7px"
                    marginLeft="3px"
                    information={() => (
                        <>
                            <DetailText>
                                Wireless backup - provides access over a mobile connection
                                when access over the fixed connection fails.
                            </DetailText>
                            <DetailText>
                                High Availability – is the fixed option, providing a secondary
                                access for failover into a customer’s site.
                            </DetailText>
                        </>
                    )}
                />
            </GridColumnRow>

            <GridColumn columns={2}>
                <HeaderText>{TypeofSite}</HeaderText>
            </GridColumn>

        </GridFlexStart>
        <TableDataWrapper />
    </StickyWrapper>

);

export default SitesTableHeadingView;

const HeaderText = styled(Body2)`
    color: ${props => props.theme.darkerGray};
    margin-right: 8px;
`;

const AsideInfo = styled(Caption3)`
    color: ${props => props.theme.darkerGray};
`;

const TableDataWrapper = styled.div`
    margin-bottom: 16px;
    border-bottom: 3px solid;
    border-bottom-color: ${theme('background-color.bg-grey-1')};
    padding: 2px 0px;
    width: ${props => props.width || '100%'};
`;

const GridColumnRow = styled(GridColumn)`
    flex-direction: row;
`;

const GridFlexStart = styled(Grid)`
    align-items: flex-start;
`;

const StickyWrapper = styled.div`
    position: sticky;
    top: 0;
    z-index: 1;
    background: ${theme('background-color.bg-white')};
    padding-top: 16px;
`;

const DetailText = styled(WindowDetails)`
    margin-bottom: 16px;
`;

SitesTableHeadingView.propTypes = {
    sites: PropTypes.arrayOf(PropTypes.object),
};

SitesTableHeadingView.defaultProps = {
    sites: [],
};
