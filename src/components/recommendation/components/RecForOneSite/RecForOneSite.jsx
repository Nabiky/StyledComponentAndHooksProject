import React, { useState, useEffect, useMemo } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { theme } from 'styled-tools';

import {
    SITE_COMPLETED,
    SITE_INPROGRESS,
    SITE_PENDING,
} from '#recommendation/constants/siteLoadingStatus';

import { SHAPE_OF_SITE } from '#recommendation/constants/propTypes';
import SiteDetail from '#recommendation/components/SiteDetail';
import SiteDetailEdit from '#recommendation/components/SiteDetailEdit';
import ServiceTableHeading from '#recommendation/components/ServiceTableHeading';
import ServiceLoading from '#recommendation/components/ServiceLoading';
import ServiceFailed from '#recommendation/components/ServiceFailed';
import ServiceEdit from '#recommendation/components/ServiceEdit';
import ServiceComplete from '#recommendation/components/ServiceComplete';

import makePriceStrings from '#utils/makePriceStrings';
import makeTermString from '#utils/makeTermString';

function useTemp() {
    const [tempSiteName, setTempSiteName] = useState();
    const [tempProduct, setTempProduct] = useState();
    const [tempAccess, setTempAccess] = useState();
    const [tempBandwidth, setTempBandwidth] = useState();
    const [tempAccessError, setTempAccessError] = useState('');
    const [showAccessError, setShowAccessError] = useState(false);
    const [tempBandwidthError, setTempBandwidthError] = useState('');
    const [showBandwidthError, setShowBandwidthError] = useState(false);
    const [tempSiteNameError, setTempSiteNameError] = useState('');
    const [showSiteNameError, setShowSiteNameError] = useState(false);

    function setShowAllError(show) {
        setShowAccessError(show);
        setShowBandwidthError(show);
        setShowSiteNameError(show);
    }

    function setTempValues(currentSite, selectedService) {
        setTempSiteName(currentSite.siteName);
        setTempProduct(_.get(selectedService, 'name'));
        setTempAccess(_.get(selectedService, 'technologyType'));
        setTempBandwidth(_.get(selectedService, 'bandwidth'));
        setShowAllError(false);
    }

    function updateTempProduct(newProduct) {
        if (!_.isEqual(newProduct, tempProduct)) {
            setTempProduct(newProduct);
            setTempAccess(undefined);
            setTempBandwidth(undefined);
        }
    }

    function updateTempAccess(newAccess) {
        if (!_.isEqual(newAccess, tempAccess)) {
            setTempAccess(newAccess);
            setTempBandwidth(undefined);
        }
    }

    useEffect(() => setTempAccessError(tempAccess ? '' : 'Required'), [tempAccess]);
    useEffect(() => setTempBandwidthError(tempBandwidth ? '' : 'Required'), [tempBandwidth]);
    useEffect(() => setTempSiteNameError(tempSiteName ? '' : 'Required'), [tempSiteName]);

    return {
        setTempAccess: updateTempAccess,
        setTempProduct: updateTempProduct,
        setTempBandwidth,
        setTempSiteName,
        setTempValues,
        setShowAccessError,
        setShowBandwidthError,
        setShowSiteNameError,
        setShowAllError,

        tempSiteName,
        tempProduct,
        tempAccess,
        tempBandwidth,
        tempAccessError,
        tempBandwidthError,
        showAccessError,
        showBandwidthError,
        tempSiteNameError,
        showSiteNameError,
    };
}

function useEditMode(initEditMode, editTrueCallback, editFalseCallback) {
    const [isEditMode, setIsEditMode] = useState(initEditMode);
    function setEditMode(newMode) {
        if (newMode) {
            editTrueCallback();
        } else {
            editFalseCallback();
        }
        setIsEditMode(newMode);
    }
    return { isEditMode, setEditMode };
}

function RecForOneSite({
    site,
    openConfirmDeletePopup,
    chooseNewService,
    addEditingSite,
    removeEditingSite,
}) {
    const { isEditMode, setEditMode } = useEditMode(false, addEditingSite, removeEditingSite);
    const {
        setTempAccess,
        setTempProduct,
        setTempBandwidth,
        setTempSiteName,
        setTempValues,
        setShowAccessError,
        setShowBandwidthError,
        setShowSiteNameError,
        setShowAllError,

        tempSiteName,
        tempProduct,
        tempAccess,
        tempBandwidth,
        tempAccessError,
        tempBandwidthError,
        tempSiteNameError,
        showAccessError,
        showBandwidthError,
        showSiteNameError,
    } = useTemp();

    const selectedService = useMemo(
        () => site.services.find(service => service.preselected) || site.services[0],
        [site],
    );

    const { oneOffChargeString, recurringChargeString } = useMemo(
        () => makePriceStrings(_.get(selectedService, 'charges')),
        [selectedService],
    );

    const termString = useMemo(() => makeTermString(_.get(selectedService, 'subscriptionTerm')), [
        selectedService,
    ]);

    function onSaveEdit() {
        const tempValuesToSave = {
            elid: site.elid,
            tempSiteName,
            tempProduct,
            tempAccess,
            tempBandwidth,
        };

        if (Object.values(tempValuesToSave).every(val => !!val)) {
            chooseNewService(tempValuesToSave);
            setEditMode(false);
        }

        setShowAllError(true);
    }

    function onCancelEdit() {
        setTempValues(site, selectedService);
        setEditMode(false);
    }

    function onEnterEdit() {
        setTempValues(site, selectedService);
        setEditMode(true);
    }

    useEffect(() => setTempValues(site, selectedService), [site]);

    return (
        <Wrapper>
            {isEditMode ? (
                <SiteDetailEdit
                    siteName={tempSiteName}
                    updateSiteName={setTempSiteName}
                    address={site.address}
                    siteType={site.siteType}
                    siteStatus={site.status}
                    onDeleteSite={openConfirmDeletePopup}
                    onSaveEdit={onSaveEdit}
                    onCancelEdit={onCancelEdit}
                    tempSiteNameError={tempSiteNameError}
                    showSiteNameError={showSiteNameError}
                    setShowSiteNameError={setShowSiteNameError}
                />
            ) : (
                <SiteDetail
                    siteName={site.siteName}
                    address={site.address}
                    siteType={site.siteType}
                    siteStatus={site.status}
                    onDeleteSite={openConfirmDeletePopup}
                    onEdit={onEnterEdit}
                />
            )}

            {(() => {
                switch (site.status) {
                    case SITE_INPROGRESS:
                    case SITE_PENDING:
                        return <ServiceLoading />;
                    case SITE_COMPLETED:
                        if (site.services.length) {
                            return (
                                <>
                                    <ServiceTableHeading showTerms={!isEditMode} />
                                    {isEditMode ? (
                                        <ServiceEdit
                                            allServices={site.services}
                                            product={tempProduct}
                                            access={tempAccess}
                                            bandwidth={tempBandwidth}
                                            termString={termString}
                                            oneOffChargeString={oneOffChargeString}
                                            recurringChargeString={recurringChargeString}
                                            setProduct={setTempProduct}
                                            setAccess={setTempAccess}
                                            setBandwidth={setTempBandwidth}
                                            tempAccessError={tempAccessError}
                                            tempBandwidthError={tempBandwidthError}
                                            showAccessError={showAccessError}
                                            showBandwidthError={showBandwidthError}
                                            setShowAccessError={setShowAccessError}
                                            setShowBandwidthError={setShowBandwidthError}
                                        />
                                    ) : (
                                        <ServiceComplete
                                            product={tempProduct}
                                            access={tempAccess}
                                            bandwidth={tempBandwidth}
                                            termString={termString}
                                            oneOffChargeString={oneOffChargeString}
                                            recurringChargeString={recurringChargeString}
                                        />
                                    )}
                                </>
                            );
                        }
                        return <ServiceFailed />;
                    default:
                        return <ServiceFailed />;
                }
            })()}
        </Wrapper>
    );
}

export default RecForOneSite;

const Wrapper = styled.div`
    width: 100%;
    border: 1px solid ${theme('background-color.bg-grey-1')};
    margin-bottom: 32px;
    box-sizing: border-box;
`;

RecForOneSite.propTypes = {
    site: SHAPE_OF_SITE,
    openConfirmDeletePopup: PropTypes.func.isRequired,
    chooseNewService: PropTypes.func.isRequired,
    addEditingSite: PropTypes.func.isRequired,
    removeEditingSite: PropTypes.func.isRequired,
};

RecForOneSite.defaultProps = {
    site: undefined,
};
