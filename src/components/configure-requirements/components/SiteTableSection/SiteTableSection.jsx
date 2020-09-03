import React from 'react';
import PropTypes from 'prop-types';
import SitesTableHeading from '#configure-requirements/components/SitesTableHeading';
import SitesTableRow from '#configure-requirements/components/SitesTableRow';
import Heading2Wrapper from '#shared-components/Heading2Wrapper';
import Heading2 from '#shared-components/Heading2';

const SiteTableSection = ({
    sites,
    possibleValues,
    setSiteDropdownValueByType,
    onAddressInputChange,
    onUserCountChange,
    addressTypeAheadArray,
    clearAddressTypeAhead,
    onAddressSuggestion,
    onRowDelete,
    onAddressValueClear,
    showValidationError,
}) => (
    <>
        <Heading2Wrapper>
            <Heading2>Tell us about your sites</Heading2>
        </Heading2Wrapper>
        <SitesTableHeading sites={sites} />
        {sites.map(site => (
            <SitesTableRow
                key={site.elid}
                site={site}
                sitesLength={sites.length}
                showValidationError={showValidationError}
                possibleValues={possibleValues}
                setSiteDropdownValueByType={(value, type) => {
                    setSiteDropdownValueByType(value, type, site);
                }}
                onAddressInputChange={onAddressInputChange}
                onUserCountChange={onUserCountChange}
                addressTypeAheadArray={addressTypeAheadArray}
                clearAddressTypeAhead={clearAddressTypeAhead}
                onAddressValueClear={onAddressValueClear}
                onAddressSuggestion={onAddressSuggestion}
                onDelete={onRowDelete}
                error={site.errorInfo}

            />
        ))}
    </>
);

export default SiteTableSection;

SiteTableSection.propTypes = {
    sites: PropTypes.arrayOf(PropTypes.object),
    possibleValues: PropTypes.objectOf(PropTypes.array),
    setSiteDropdownValueByType: PropTypes.func,
    onAddressInputChange: PropTypes.func,
    onAddressSuggestion: PropTypes.func,
    addressTypeAheadArray: PropTypes.arrayOf(PropTypes.string),
    clearAddressTypeAhead: PropTypes.func,
    onUserCountChange: PropTypes.func,
    onRowDelete: PropTypes.func,
    onAddressValueClear: PropTypes.func,
    showValidationError: PropTypes.func,
};

SiteTableSection.defaultProps = {
    sites: [],
    possibleValues: {},
    setSiteDropdownValueByType: () => {},
    onAddressInputChange: () => {},
    onAddressSuggestion: () => {},
    addressTypeAheadArray: [],
    clearAddressTypeAhead: () => {},
    onUserCountChange: () => {},
    onRowDelete: () => {},
    onAddressValueClear: () => {},
    showValidationError: () => {},
};
