import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import GridColumn from '#lib/GridColumn';
import GridColumnRightAlign from '#lib/GridColumnRightAlign';
import Dropdown from '#lib/Dropdown';
import * as Text from '#lib/Text';

import ServiceWrapperGrid from '#recommendation/components/ServiceWrapperGrid';
import { SHAPE_OF_SERVICE } from '#recommendation/constants/propTypes';


function computePlanOptions(siteServices, selectedProduct, selectedAccess) {
    const servicesOfSelectedProduct = siteServices.filter(
        service => service.name === selectedProduct,
    );
    const serviceOfSelectedProductAndAcess = servicesOfSelectedProduct.filter(
        service => service.technologyType === selectedAccess,
    );

    const productOptions = _.uniq(siteServices.map(service => service.name));
    const accessOptions = _.uniq(servicesOfSelectedProduct.map(service => service.technologyType));
    const bandwidthOptions = _.uniqWith(serviceOfSelectedProductAndAcess.map(
        service => service.bandwidth,
    ), _.isEqual);

    const sortedBandwidthOptions = _.sortBy(bandwidthOptions, 'value');

    return { productOptions, accessOptions, bandwidthOptions: sortedBandwidthOptions };
}

function RenderedDropdown({
    label, value, onSelect, options, error, onBlur,
}) {
    return (
        <Dropdown
            label={label}
            value={value}
            onSelect={onSelect}
            error={error}
            onBlur={onBlur}
        >
            {
                options.sort((a, b) => a - b).map(option => (
                    <Dropdown.Option key={option} value={option}>
                        {option}
                    </Dropdown.Option>
                ))
            }
        </Dropdown>
    );
}

RenderedDropdown.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
    ]).isRequired,
    onSelect: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
    options: PropTypes.arrayOf(PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
    ])).isRequired,
    error: PropTypes.string,
};

RenderedDropdown.defaultProps = {
    onBlur: () => {},
    error: '',
};

function ServiceEdit({
    allServices,
    product,
    access,
    bandwidth,
    oneOffChargeString,
    recurringChargeString,
    setProduct,
    setAccess,
    setBandwidth,
    tempAccessError,
    tempBandwidthError,
    showAccessError,
    showBandwidthError,
    setShowAccessError,
    setShowBandwidthError,
}) {
    const { productOptions, accessOptions, bandwidthOptions } = useMemo(
        () => computePlanOptions(allServices, product, access), [allServices, product, access],
    );

    return (
        <ServiceWrapperGrid>
            <GridColumn columns={4}>
                <RenderedDropdown
                    label="Product"
                    value={product}
                    onSelect={setProduct}
                    options={productOptions}
                />
            </GridColumn>
            <GridColumn columns={2}>
                <RenderedDropdown
                    label="Access"
                    value={access}
                    onSelect={setAccess}
                    options={accessOptions}
                    error={showAccessError ? tempAccessError : ''}
                    onBlur={() => setShowAccessError(true)}

                />
            </GridColumn>
            <GridColumn columns={2}>
                <RenderedDropdown
                    label="Bandwidth"
                    value={bandwidth}
                    onSelect={setBandwidth}
                    options={bandwidthOptions}
                    error={showBandwidthError ? tempBandwidthError : ''}
                    onBlur={() => setShowBandwidthError(true)}

                />
            </GridColumn>
            <GridColumn columns={1} />

            <GridColumnRightAlign columns={1}>
                <Text.Body2>{oneOffChargeString}</Text.Body2>
            </GridColumnRightAlign>
            <GridColumnRightAlign columns={1}>
                <Text.Body2>{recurringChargeString}</Text.Body2>
            </GridColumnRightAlign>
        </ServiceWrapperGrid>
    );
}

ServiceEdit.propTypes = {
    allServices: PropTypes.arrayOf(SHAPE_OF_SERVICE).isRequired,
    product: PropTypes.string.isRequired,
    access: PropTypes.string.isRequired,
    oneOffChargeString: PropTypes.string.isRequired,
    recurringChargeString: PropTypes.string.isRequired,
    bandwidth: PropTypes.string.isRequired,
    tempAccessError: PropTypes.string.isRequired,
    tempBandwidthError: PropTypes.string.isRequired,
    showAccessError: PropTypes.bool.isRequired,
    showBandwidthError: PropTypes.bool.isRequired,

    setProduct: PropTypes.func.isRequired,
    setAccess: PropTypes.func.isRequired,
    setBandwidth: PropTypes.func.isRequired,
    setShowAccessError: PropTypes.func.isRequired,
    setShowBandwidthError: PropTypes.func.isRequired,
};

export default ServiceEdit;
