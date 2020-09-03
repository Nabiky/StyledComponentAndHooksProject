import React, { Component } from 'react';
import styled from 'styled-components';
import { theme } from 'styled-tools';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import _ from 'lodash';
import * as Text from '#lib/Text';
import Icon from '#lib/FontIcons';
import NotFoundMessage from '#lib/NotFoundMessage';

const ReactTableClasses = {
    TheadTrClass: 'managedata-theadTr',
    TheadClass: 'managedata-thead',
    TheadThClass: 'managedata-theadTh',
    TrClass: 'managedata-tr',
    TheadTrGroupClass: 'managedata-group',
};

export const ReactTableStyled = styled(ReactTable)`
    .${ReactTableClasses.TheadTrClass} {
        display: flex;
    }

    .${ReactTableClasses.TheadClass} {
        border-bottom: 4px solid;
        color: ${theme('background-color.bg-grey-1')};
    }

    .${ReactTableClasses.TheadThClass} {
        padding: 16px 0;
        box-sizing: border-box;
        text-align: left;
        outline: 0;
        position: relative;
    }

    .${ReactTableClasses.TrClass} {
        display: flex;
        border-bottom: 2px solid;
        border-color: ${theme('background-color.bg-grey-1')};
    }
    .${ReactTableClasses.TheadTrGroupClass} {
        &:last-child div {
            border: none;
        }
    }
`;


class ReactDataTable extends Component {
    state = {
        sort: [{ id: 0 }],
        isMouseInside: '',
    };

    mouseEnter = (key) => {
        this.setState({ isMouseInside: key });
    };

    mouseLeave = () => {
        this.setState({ isMouseInside: '' });
    };

    createColumns = (data, columnsToShow) => Object.keys(data[0])
        .slice(0, columnsToShow)
        .map((key) => {
            const { sort, isMouseInside } = this.state;
            const { columnOverride } = this.props;
            const overrideProps = _.find(columnOverride, ['accessor', key]);
            return {
                ...overrideProps,
                Header: (
                    <HeaderText
                        onMouseEnter={() => this.mouseEnter(key)}
                        onMouseLeave={() => this.mouseLeave(key)}
                    >
                        {_.get(overrideProps, 'Header') || (
                            <React.Fragment>
                                {key}
                                <SortIconWrapper>
                                    {
                                        (sort[0].id === key
                                                || isMouseInside === key)
                                            && (
                                                <Icon
                                                    size="12px"
                                                    name={
                                                        sort[0].desc && sort[0].id === key
                                                            ? 'arrow-down-1'
                                                            : 'arrow-up-1'
                                                    }
                                                    cursor="pointer"
                                                    color={
                                                        sort[0].id === key
                                                            ? 'theme.background-color.interaction-color'
                                                            : 'theme.background-color.bg-grey-3'
                                                    }
                                                />
                                            )}
                                </SortIconWrapper>
                            </React.Fragment>
                        )}
                    </HeaderText>
                ),
                accessor: key,
                Cell: (props) => {
                    const basicValueText = (
                        <CellTextWrapper>
                            {Array.isArray(props.value) ? (
                                <React.Fragment>
                                    <CellValueText>{props.value[0]}</CellValueText>
                                    {props.value.length > 1 && (
                                        <CellAdditionalText>
                                            (+
                                            {props.value.length - 1}
                                            )
                                        </CellAdditionalText>
                                    )}
                                </React.Fragment>
                            ) : (
                                <CellValueText>
                                    {props.value}
                                </CellValueText>
                            )}
                        </CellTextWrapper>
                    );

                    return _.get(overrideProps, 'Cell') ? overrideProps.Cell(props) : basicValueText;
                },
            };
        });

    render() {
        const { sort } = this.state;
        const {
            data,
            columnsToShow,
            showPagination,
            PaginationComponent,
            defaultPageSize, loading,
            showNoDataMessage,
            noDataMessage,
            minRows,
            onRowClick,
        } = this.props;
        const numberOfColumns = data[0] ? Object.keys(data[0]).length : 0;

        if (data !== undefined && data.length > 0 && numberOfColumns !== 0) {
            return (
                <ReactTableStyled
                    data={data}
                    columns={this.createColumns(data, columnsToShow)}
                    sorted={sort}
                    onSortedChange={(newSorted) => {
                        this.setState({ sort: newSorted });
                    }}
                    getTheadProps={() => ({ className: ReactTableClasses.TheadClass })}
                    getTrGroupProps={() => ({ className: ReactTableClasses.TheadTrGroupClass })}
                    getTheadTrProps={() => ({ className: ReactTableClasses.TheadTrClass })}
                    getTheadThProps={() => ({ className: ReactTableClasses.TheadThClass })}
                    getTrProps={({ state, rowInfo, column }) => ({
                        onClick: () => onRowClick({ state, rowInfo, column }),
                        className: ReactTableClasses.TrClass,
                    })}
                    showPagination={showPagination}
                    minRows={minRows}
                    resizable={false}
                    PaginationComponent={PaginationComponent}
                    defaultPageSize={defaultPageSize}
                    loading={loading}
                    loadingText=""
                    {...this.props}
                />
            );
        }
        if (showNoDataMessage) {
            return <NotFoundMessage>{noDataMessage}</NotFoundMessage>;
        }
        return null;
    }
}

export default ReactDataTable;

ReactDataTable.propTypes = {
    columnOverride: PropTypes.string,
    showNoDataMessage: PropTypes.bool,
    noDataMessage: PropTypes.string,
    data: PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    ),
    columnsToShow: PropTypes.number,
    onRowClick: PropTypes.func,
    showPagination: PropTypes.bool,
    PaginationComponent: PropTypes.element,
    defaultPageSize: PropTypes.string,
    loading: PropTypes.bool,
    minRows: PropTypes.number,
};

ReactDataTable.defaultProps = {
    columnOverride: '',
    showNoDataMessage: true,
    noDataMessage: 'No data',
    data: [],
    columnsToShow: Number.MAX_SAFE_INTEGER,
    onRowClick: () => { },
    showPagination: false,
    PaginationComponent: React.createElement('div'),
    defaultPageSize: 10,
    loading: false,
    minRows: 0,
};

export const CellTextWrapper = styled.div`
    padding: 24px 0;
    box-sizing: border-box;
    display: flex;
`;

export const CellValueText = styled(Text.Body1)`
    color: ${theme('text-color.text-grey-5')}
`;

export const CellAdditionalText = styled(Text.Body1)`
    color: ${theme('text-color.text-grey-3')};
    margin-left: 8px;
`;

export const SortIconWrapper = styled.span`
    padding-top: 2px;
    padding-left: 8px;
    position: absolute;
`;

export const HeaderText = styled(Text.Body2)`
    color: ${theme('text-color.text-grey-4')};
    cursor: pointer;
`;
