import React, { useContext } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { theme } from 'styled-tools';
import Dropdown from '#lib/Dropdown';
import Button from '#lib/Button';
import AddressTypeahead from '#configure-requirements/components/AddressTypeahead';
import Input from '#lib/Input';
import Icon from '#lib/FontIcons';
import KeyDisplayStringContext from '#configure-requirements/KeyDisplayStringContext';
import Grid from '#lib/Grid';
import GridColumn from '#lib/GridColumn';
import { SHAPE_OF_BANDWIDTH, SHAPE_OF_ERROR_OBJECT } from '#recommendation/constants/propTypes';


const tempPrefix = 'temp-';

const SiteTableRowView = ({
    site,
    possibleValues,
    setSiteDropdownValueByType,
    onUserCountChange,
    onAddressInputChange,
    clearAddressTypeAhead,
    onAddressSuggestion,
    onDelete,
    onAddressValueClear,
    showValidationError,
    error,
    sitesLength,
}) => {
    const NewpossibleValues = (pluralKeyVal) => {
        if (
            pluralKeyVal === 'bandwidths'
            && _.get(site, 'users.length')
            && !Number.isNaN(Number(site.users))
        ) {
            const MbpsConstant = 1.2;
            const possibleBandwidthsValues = possibleValues.bandwidths
                .sort((a, b) => a.value - b.value)
                .filter(
                    (e, i, a) => e.value >= site.users * MbpsConstant
                        || i === a.length - 1,
                );

            return possibleBandwidthsValues;
        }
        return possibleValues[pluralKeyVal];
    };

    const KeyDisplayStringMap = useContext(KeyDisplayStringContext);

    const renderDropdown = (singularKey, pluralKey) => (
        <Dropdown
            placeholder="Select"
            customHeight="auto"
            value={site[singularKey]}
            onBlur={() => showValidationError(singularKey, site.elid)}
            error={(error[singularKey].show) ? error[singularKey].description : ''}
            onSelect={value => setSiteDropdownValueByType(value, singularKey)}
        >
            {NewpossibleValues(pluralKey).map(option => (
                <Dropdown.Option key={option.value || option} value={option}>
                    { typeof option === 'string'
                        ? KeyDisplayStringMap[option] || option
                        : option.value
                    }
                </Dropdown.Option>
            ))}
        </Dropdown>
    );

    return (

        <Grid marginBottom="4" gutter="3" data-testid="site-table-row">
            <GridColumnRow columns={4}>
                { site.elid && !site.elid.includes(tempPrefix) ? (
                    <AdressSet>
                        <p>{site.address}</p>
                        <Icon
                            name="close"
                            title="Clear address field"
                            size="16px"
                            color="theme.text-color.text-grey-3"
                            onClick={() => onAddressValueClear(site.elid)}
                        />
                    </AdressSet>
                )
                    : (
                        <AddressTypeahead
                            placeholder="Enter site address"
                            value={site.address}
                            onChange={(evt, { newValue }) => onAddressInputChange(newValue, site)}
                            onSuggestionsClearRequested={clearAddressTypeAhead}
                            onSuggestionSelected={(evt, { suggestion }) => {
                                onAddressSuggestion(suggestion, site);
                            }}
                            onSearchBoxClear={() => onAddressValueClear(site.elid)}
                            autocomplete="new-site-street-address"
                            error={error.address}
                            onBlur={() => showValidationError('address', site.elid)}
                        />
                    )
                }

            </GridColumnRow>

            <GridColumnRow columns={1}>
                <Input
                    placeholder="Users"
                    type="number"
                    value={site.users}
                    onChange={e => onUserCountChange(e.target.value, site, error)}
                    onBlur={() => showValidationError('users', site.elid)}
                    error={error.users.show ? error.users.description : ''}
                />
            </GridColumnRow>

            <GridColumnRow columns={1}>
                {renderDropdown('bandwidth', 'bandwidths')}
            </GridColumnRow>

            <GridColumnRow columns={2}>
                {renderDropdown('workingHours', 'workingHours')}
            </GridColumnRow>

            <GridColumnRow columns={2}>
                {renderDropdown('diversity', 'diversities')}
            </GridColumnRow>

            <GridColumnRow columns={2}>
                <Grid>
                    <GridColumnRow columns={10}>

                        {renderDropdown('siteType', 'siteTypes')}
                    </GridColumnRow>

                    <GridColumnRow columns={2}>

                        { sitesLength > 1 && (
                            <ButtonExt
                                noStyle
                                onClick={() => {
                                    onDelete(site.elid);
                                }}
                            >
                                <Icon
                                    name="trash"
                                    size="16px"
                                    color="theme.background-color.bg-nostalgic-blue"
                                />
                            </ButtonExt>
                        )}
                    </GridColumnRow>
                </Grid>
            </GridColumnRow>
        </Grid>
    );
};

export default SiteTableRowView;

const AdressSet = styled.div`
    width: 100%;
    box-sizing: border-box;
    height: 60px;
    border-radius: 30px;
    background-color: ${theme('background-color.bg-grey-0')};
    padding: 0 18px;
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
`;

const ButtonExt = styled(Button)`
    margin-left: 11px;
`;

const GridColumnRow = styled(GridColumn)`
    flex-direction: row;
`;

SiteTableRowView.propTypes = {
    site: PropTypes.shape({
        address: PropTypes.string,
        bandwidth: SHAPE_OF_BANDWIDTH,
        diversity: PropTypes.string,
        elid: PropTypes.string,
        rowId: PropTypes.string,
        siteType: PropTypes.string,
        users: PropTypes.string,
        workingHours: PropTypes.string,
    }),

    possibleValues: PropTypes.shape({
        bandwidths: PropTypes.arrayOf(SHAPE_OF_BANDWIDTH),
        workingHours: PropTypes.arrayOf(PropTypes.string),
        diversities: PropTypes.arrayOf(PropTypes.string),
        siteTypes: PropTypes.arrayOf(PropTypes.string),
    }),
    setSiteDropdownValueByType: PropTypes.func,
    onAddressInputChange: PropTypes.func,
    onAddressSuggestion: PropTypes.func,
    clearAddressTypeAhead: PropTypes.func,
    onUserCountChange: PropTypes.func,
    onDelete: PropTypes.func,
    onAddressValueClear: PropTypes.func,
    showValidationError: PropTypes.func,

    error: PropTypes.shape({
        address: SHAPE_OF_ERROR_OBJECT,
        bandwidths: SHAPE_OF_ERROR_OBJECT,
        diversity: SHAPE_OF_ERROR_OBJECT,
        users: SHAPE_OF_ERROR_OBJECT,
        siteType: SHAPE_OF_ERROR_OBJECT,
        workingHours: SHAPE_OF_ERROR_OBJECT,
    }).isRequired,

    sitesLength: PropTypes.number,

};

SiteTableRowView.defaultProps = {
    site: {
        bandwidth: {
            value: 0,
            unit: 'mbps',
        },
        diversity: '',
        elid: '',
        rowId: '',
        siteType: '',
        users: '',
        workingHours: '',
    },

    possibleValues: {
        bandwidths: [{
            value: 0,
            unit: 'mbps',
        }],
        workingHours: [''],
        diversities: [''],
        siteTypes: [''],
    },

    setSiteDropdownValueByType: () => {},
    onAddressInputChange: () => {},
    onAddressSuggestion: () => {},
    clearAddressTypeAhead: () => {},
    onUserCountChange: () => {},
    onDelete: () => {},
    onAddressValueClear: () => {},
    showValidationError: () => {},
    sitesLength: 0,
};
