import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { DateTime } from 'luxon';
import styled from 'styled-components';
import { theme, ifProp } from 'styled-tools';
import Icon from '#lib/FontIcons';
import Pagination from '#lib/Pagination';
import ReactDataTable, { CellValueText, CellTextWrapper } from '#lib/ReactDataTable';

function generateExpiryMessage(daysValid, warningDays) {
    if (daysValid > warningDays) {
        return '';
    }
    if (daysValid > 1) {
        return `Expires in ${daysValid} days`;
    }
    if (daysValid === 1) {
        return 'Expires tomorrow';
    }
    if (daysValid === 0) {
        return 'Expires today';
    }
    return 'Expired';
}

const DashboardTableContainer = ({
    data,
    editProposal,
    deleteProposal,
    downloadProposalForQuote,
}) => {
    const refinedData = data
        .map(({
            createdDate,
            createdDateObj,
            validDaysCount = 4,
            warningDays = 2,
            businessName,
            stage,
            cartId,
        }) => {
            const today = DateTime.local();
            const daysSinceCreation = today.diff(createdDateObj, ['days']).toObject().days;
            const daysValid = validDaysCount - Math.floor(daysSinceCreation);

            const slimmedDownData = {
                Date: createdDate,
                'Business name': _.toString(businessName),
                Stage: _.capitalize(_.toString(stage)),
                WarningMessage: generateExpiryMessage(daysValid, warningDays),
                CartId: _.toString(cartId),
            };
            return slimmedDownData;
        });

    return (
        <ReactDataTable
            data={refinedData}
            showPagination
            PaginationComponent={Pagination}
            defaultPageSize={10}
            columnOverride={[
                {
                    accessor: 'Date',
                    maxWidth: 160,
                },
                {
                    accessor: 'Business name',
                    maxWidth: 160,
                },
                {
                    accessor: 'Stage',
                    maxWidth: 160,
                    /* eslint-disable-next-line react/prop-types */
                    Cell: ({ row: { Stage } }) => (
                        <CellTextWrapper>
                            <StyledCellValueText highlight={Stage === 'Draft'}>
                                {Stage}
                            </StyledCellValueText>
                        </CellTextWrapper>
                    ),
                },
                {
                    accessor: 'WarningMessage',
                    Header: <span />,
                    /* eslint-disable-next-line react/prop-types */
                    Cell: ({ row: { WarningMessage } }) => (
                        <CellTextWrapper>
                            <ErrorCellValueText>
                                {WarningMessage}
                            </ErrorCellValueText>
                        </CellTextWrapper>
                    ),

                },
                {
                    accessor: 'CartId',
                    maxWidth: 160,
                    Header: <span />,
                    /* eslint-disable-next-line react/prop-types */
                    Cell: ({ row: { CartId, Stage } }) => {
                        const download = () => downloadProposalForQuote(CartId)
                            // Designer have agreed that the use of window.alert is acceptable
                            // for this release.
                            // We will have a much fancier progress bar thing for release 20.2
                            // eslint-disable-next-line no-alert
                            .catch(() => window.alert('PDF is currently being generated , please try again in 5 minutes'));

                        return (
                            <IconsWrapper>
                                <Icon
                                    onClick={Stage !== 'Draft' ? download : undefined}
                                    name={Stage !== 'Draft' ? 'download-f' : ''}
                                    ariaLabel={Stage !== 'Draft' ? 'download proposal' : ''}
                                    color="theme.background-color.interaction-color"
                                />
                                <Icon
                                    onClick={() => editProposal(CartId)}
                                    name="edit-f"
                                    ariaLabel="edit proposal"
                                    color="theme.background-color.interaction-color"
                                />
                                <Icon
                                    onClick={() => deleteProposal(CartId)}
                                    name="trash"
                                    ariaLabel="delete proposal"
                                    color="theme.background-color.interaction-color"
                                />
                            </IconsWrapper>
                        );
                    },
                },
            ]}
        />
    );
};

export default DashboardTableContainer;

DashboardTableContainer.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            date: PropTypes.string,
            customerName: PropTypes.string,
            stage: PropTypes.string,
        }),
    ),
    editProposal: PropTypes.func.isRequired,
    deleteProposal: PropTypes.func.isRequired,
    downloadProposalForQuote: PropTypes.func.isRequired,
};

DashboardTableContainer.defaultProps = {
    data: [],
};

const IconsWrapper = styled.div`
    display: flex;
    height: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

const StyledCellValueText = styled(CellValueText)`
    color: ${ifProp('highlight', theme('mainColorOne'), theme('text-color.text-grey-5'))}
`;

const ErrorCellValueText = styled(CellValueText)`
    color:${theme('text-color.text-red')};
`;
