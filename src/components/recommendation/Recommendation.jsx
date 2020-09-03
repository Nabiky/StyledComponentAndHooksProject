// #region Imports
import React, { useState, useEffect, useMemo } from 'react';
import { Page, MapTo, withComponentMappingContext } from '@adobe/cq-react-editable-components';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import PageLayoutWrapper from '#shared-components/PageLayoutWrapper';
import api from '#api';
import { PAGE_LOADING, PAGE_FAILED, PAGE_LOADED } from '#constants/pageLoadingStatus';
import {
    SITE_INPROGRESS,
    SITE_PENDING,
    SITE_FAILED,
    SITE_COMPLETED,
} from '#recommendation/constants/siteLoadingStatus';

import FALLBACK_ERROR_MESSAGE from '#constants/fallbackErrorMessage';
import SnackBar from '#lib/SnackBar';
import ConfirmRejectPopup from '#lib/ConfirmRejectPopup';
import FailureMessage from '#lib/FailureMessage';

import Heading1 from '#shared-components/Heading1';
import Heading1Wrapper from '#shared-components/Heading1Wrapper';
import SectionWrapper from '#shared-components/SectionWrapper';
import FullPageLoader from '#shared-components/FullPageLoader';

import routes from '#constants/pageRoutes';

import SnackBarSection from './components/SnackBarSection';
import TermSelectionSection from './components/TermSelectionSection';
import RecommendationsSection from './components/RecommendationsSection';

import makeSiteName from '#utils/makeSiteName';

import KeyDisplayStringContext from './KeyDisplayStringContext';

// #endregion

// #region Support Functions

function getPendingSites(siteList) {
    const unfinishedSiteStatus = [SITE_PENDING, SITE_INPROGRESS];

    return siteList.filter(site => unfinishedSiteStatus.includes(site.status));
}

function getSitesToLoad(allPendingSites, noOfSitesToLoad, retryDelayDuration) {
    const sortedPendingSites = allPendingSites.sort(
        (s1, s2) => s1.lastCheckedTime - s2.lastCheckedTime,
    );

    const currentTime = Date.now();

    return sortedPendingSites
        .filter(site => currentTime - site.lastCheckedTime > retryDelayDuration)
        .slice(0, noOfSitesToLoad);
}

function mergeNewSiteWithOldSite(newSite, oldSite, maxRetriesAllowed) {
    const retryCountExceeded = oldSite.retryCount === maxRetriesAllowed - 1 && _.get(newSite, 'status') !== SITE_COMPLETED;

    const newStatus = retryCountExceeded ? SITE_FAILED : _.get(newSite, 'status', oldSite.status);

    return {
        ...oldSite,
        ...newSite,
        status: newStatus,
        retryCount: oldSite.retryCount + 1,
        lastCheckedTime: Date.now(),
    };
}

async function getSelectedSiteRecommendations(sitesToLoad) {
    const OfferAvailability = await api.getBulkOfferAvailability({
        elids: sitesToLoad.map(site => site.elid).toString(),
    });

    return OfferAvailability.data.availabilityDetails;
}


function applyRecToSiteList({
    siteList, sitesToLoad, recommendations, maxRetriesAllowed,
}) {
    return siteList.map((oldSite) => {
        const siteToLoad = sitesToLoad.find(site => site.elid === oldSite.elid);

        if (!siteToLoad) {
            return oldSite;
        }

        const newSite = recommendations.find(site => site.elid === oldSite.elid);

        const siteToMerge = _.get(newSite, 'siteName')
            ? newSite
            : { ...newSite, siteName: makeSiteName(oldSite.address) };

        return mergeNewSiteWithOldSite(siteToMerge, oldSite, maxRetriesAllowed);
    });
}

export function computeUniqueTermsFromSites(siteList) {
    const terms = siteList.reduce(
        (acc, site) => acc.concat(_.get(site, 'services', []).map(service => service.subscriptionTerm)),
        [],
    );

    return _.uniqWith(terms, _.isEqual).sort((t1, t2) => t1.value - t2.value);
}

function computePreSelectedTermFromSites(siteList) {
    const siteWithServices = siteList.find(site => _.get(site, 'services', []).length);
    if (!siteWithServices) {
        return undefined;
    }

    const preselectedService = siteWithServices.services.find(service => service.preselected);
    return _.get(preselectedService, 'subscriptionTerm');
}

export function filterSitesServices(siteList, selectedTerm) {
    return siteList.map(site => ({
        ...site,
        services: _.get(site, 'services', []).filter(service => _.isEqual(service.subscriptionTerm, selectedTerm)),
    }));
}

export function getSiteConfigurationsToSubmit(siteList) {
    return siteList.map(({
        siteName, elid, status, services,
    }) => {
        const selectedService = _.find(services, 'preselected');

        return {
            siteName,
            elid,
            status,
            services: selectedService ? [
                _.pick(selectedService, [
                    'bandwidth',
                    'offerId',
                    'productId',
                    'installationProductId',
                    'technologyType',
                    'accessType',
                    'subscriptionTerm',
                ]),
            ] : [],
        };
    });
}


function chooseNewService({
    services, desiredProduct, desiredTechnologyType, desiredBandwidth, desiredTerm,
}) {
    return services.map((service) => {
        if (service.name === desiredProduct
            && service.technologyType === desiredTechnologyType
            && _.isEqual(service.subscriptionTerm, desiredTerm)
            && _.isEqual(service.bandwidth, desiredBandwidth)
        ) {
            return {
                ...service,
                preselected: true,
            };
        }
        return {
            ...service,
            preselected: false,
        };
    });
}

function useSitesAndTermsState(initialTerm, initialSiteList) {
    const [selectedTerm, setTerm] = useState(initialTerm);
    const [siteList, setSiteList] = useState(initialSiteList);

    const setSelectedTerm = (newTerm) => {
        const newSiteList = siteList.map((site) => {
            if (_.get(site, 'services', []).length === 0) {
                return site;
            }

            const selectedService = site.services.find(s => s.preselected);

            const { name, bandwidth, technologyType } = selectedService;
            return {
                ...site,
                services: chooseNewService({
                    services: site.services,
                    desiredProduct: name,
                    desiredBandwidth: bandwidth,
                    desiredTechnologyType: technologyType,
                    desiredTerm: newTerm,
                }),
            };
        });

        setSiteList(newSiteList);
        setTerm(newTerm);
    };

    return {
        selectedTerm, setSelectedTerm, siteList, setSiteList,
    };
}

function useCounter(initCount) {
    const [count, setCount] = useState(initCount);
    function inc() {
        setCount(count + 1);
    }
    function dec() {
        setCount(count - 1);
    }
    return { count, inc, dec };
}


// #endregion

function Recommendation({
    retryDelayDuration,
    maxRetriesAllowed,
    noOfSitesToLoad,
    history,
    recommendationTitle,
    termTitle,
    termDescription,
    siteTypes,
}) {
    const {
        selectedTerm, setSelectedTerm, siteList, setSiteList,
    } = useSitesAndTermsState(undefined, []);
    const [loadingStatus, setLoadingStatus] = useState(PAGE_LOADING);
    const [pageErrorMessage, setPageErrorMessage] = useState('');
    const [timeOutId, setTimeOutId] = useState('');
    const [isConfirmDeletePopupOpen, openConfirmDeletePopup] = useState(false);
    const [elidToDelete, setElidToDelete] = useState('');
    const [isErrorPopupOpen, openErrorPopup] = useState(false);
    const [isCancelPopupOpen, setCancelPopupOpen] = useState(false);
    const [errorPopupMessage, setErrorPopupMessage] = useState('');
    const { count: editingSiteCount, inc: addEditingSite, dec: removeEditingSite } = useCounter(0);

    const redirectToDashboardPage = () => history.push(routes.DASHBOARD);
    const redirectToProposalPage = () => history.push(routes.PROPOSAL);

    const setFullPageError = (err) => {
        const errorMessage = _.get(
            err,
            'response.data.messages[0].description',
            FALLBACK_ERROR_MESSAGE,
        );
        setLoadingStatus(PAGE_FAILED);
        setPageErrorMessage(errorMessage);
    };

    const setPopupError = (err) => {
        const errorMessage = _.get(
            err,
            'response.data.messages[0].description',
            FALLBACK_ERROR_MESSAGE,
        );
        openErrorPopup(true);
        setErrorPopupMessage(errorMessage);
    };

    // This function calls api.sitePreferenceRetrieve
    // to get a list of all sites and stores them in the state
    const getListOfSites = async () => {
        try {
            const sitePreferences = await api.sitePreferenceRetrieve();
            const { sitesConfiguration } = sitePreferences.data;
            const newSiteList = sitesConfiguration.map(site => ({
                status: SITE_PENDING,
                lastCheckedTime: 0,
                retryCount: 0,
                ...site,
            }));

            setLoadingStatus(PAGE_LOADED);
            setSiteList(newSiteList);
        } catch (err) {
            setFullPageError(err);
        }
    };

    const getAllRecommendations = async () => {
        const allPendingSites = getPendingSites(siteList);

        if (allPendingSites.length === 0) {
            return;
        }

        // If there are sites last checked more than `retryDelayDuration` milliseconds ago
        // then make the api call now. Else schedule it for `retryDelayDuration` miliseconds
        const sitesToLoad = getSitesToLoad(allPendingSites, noOfSitesToLoad, retryDelayDuration);

        if (sitesToLoad.length === 0) {
            const id = setTimeout(getAllRecommendations, retryDelayDuration);
            setTimeOutId(id);

            return;
        }

        let recommendations = [];
        try {
            recommendations = await getSelectedSiteRecommendations(sitesToLoad);
        } finally {
            const newSiteList = applyRecToSiteList({
                siteList,
                sitesToLoad,
                recommendations,
                maxRetriesAllowed,
            });
            clearTimeout(timeOutId);
            setSiteList(newSiteList);
        }
    };

    const deleteSite = async (elid) => {
        try {
            await api.deleteSite({ elid });
            const newSiteList = siteList.filter(site => site.elid !== elid);
            clearTimeout(timeOutId);
            setSiteList(newSiteList);
            setElidToDelete('');
        } catch (err) {
            setPopupError(err);
        } finally {
            openConfirmDeletePopup(false);
        }
    };

    const promptConfirmDelete = (elid) => {
        openConfirmDeletePopup(true);
        setElidToDelete(elid);
    };

    const chooseNewServiceForSite = ({
        elid, tempSiteName, tempProduct, tempAccess, tempBandwidth,
    }) => {
        clearTimeout(timeOutId);
        setSiteList(siteList.map(site => (site.elid === elid ? {
            ...site,
            siteName: tempSiteName,
            services: chooseNewService({
                services: site.services,
                desiredProduct: tempProduct,
                desiredTechnologyType: tempAccess,
                desiredBandwidth: tempBandwidth,
                desiredTerm: selectedTerm,
            }),
        } : site)));
    };

    const submitRecommendations = async () => {
        const dataToSubmit = getSiteConfigurationsToSubmit(siteList);
        setLoadingStatus(PAGE_LOADING);

        try {
            await api.bulkSiteConfigurationSubmit({ siteConfigurations: dataToSubmit });
            redirectToProposalPage();
        } catch (err) {
            setFullPageError(err);
        }
    };

    useEffect(() => {
        getListOfSites();
    }, []);
    useEffect(() => {
        getAllRecommendations();
    }, [siteList]);

    const KeyDisplayStringMap = useMemo(
        () => siteTypes.reduce((acc, value) => {
            acc[value.siteKey] = value.siteValue;
            return acc;
        }, {}),
        [],
    );
    const terms = useMemo(() => computeUniqueTermsFromSites(siteList), [siteList]);
    const sitesToShow = useMemo(() => filterSitesServices(siteList, selectedTerm), [
        siteList,
        selectedTerm,
    ]);
    const finishedLoadingSites = useMemo(
        () => !!siteList.length && getPendingSites(siteList).length === 0,
        [siteList],
    );
    const preSelectedTerm = computePreSelectedTermFromSites(siteList);

    if (terms.length && !selectedTerm) {
        setSelectedTerm(preSelectedTerm);
    }

    if (loadingStatus === PAGE_FAILED) {
        return <FailureMessage errorMessage={pageErrorMessage} />;
    }

    return (
        <KeyDisplayStringContext.Provider value={KeyDisplayStringMap}>
            <PageLayoutWrapper>
                {loadingStatus === PAGE_LOADING && <FullPageLoader />}
                <Heading1Wrapper>
                    <Heading1>{recommendationTitle}</Heading1>
                </Heading1Wrapper>
                <SectionWrapper>
                    {
                        finishedLoadingSites && (
                            <TermSelectionSection
                                title={termTitle}
                                description={termDescription}
                                options={terms}
                                selectedTerm={selectedTerm}
                                selectTerm={setSelectedTerm}
                            />
                        )
                    }
                </SectionWrapper>
                <SectionWrapper>
                    <RecommendationsSection
                        siteList={sitesToShow}
                        openConfirmDeletePopup={promptConfirmDelete}
                        chooseNewService={chooseNewServiceForSite}
                        addEditingSite={addEditingSite}
                        removeEditingSite={removeEditingSite}
                    />
                </SectionWrapper>

                <ConfirmRejectPopup
                    open={isConfirmDeletePopupOpen}
                    title="Delete Site"
                    content="Are you sure you want to delete this site?"
                    onRequestClose={() => openConfirmDeletePopup(false)}
                    primaryButtonLabel="No"
                    onPrimaryClick={() => openConfirmDeletePopup(false)}
                    secondaryButtonLabel="Yes"
                    onSecondaryClick={() => deleteSite(elidToDelete)}
                />

                <ConfirmRejectPopup
                    open={isCancelPopupOpen}
                    title="Cancel form"
                    content="Are you sure you want to cancel this form?"
                    onRequestClose={() => setCancelPopupOpen(false)}
                    primaryButtonLabel="No"
                    onPrimaryClick={() => setCancelPopupOpen(false)}
                    secondaryButtonLabel="Yes"
                    onSecondaryClick={redirectToDashboardPage}
                />

                <ConfirmRejectPopup
                    open={isErrorPopupOpen}
                    title="Error"
                    content={errorPopupMessage}
                    onRequestClose={() => openErrorPopup(false)}
                    onSecondaryClick={() => openErrorPopup(false)}
                    secondaryButtonLabel="Ok"
                />

                <SnackBar open={!editingSiteCount && finishedLoadingSites} color="theme-color-secondary">
                    <SnackBarSection
                        siteList={sitesToShow}
                        onCancel={() => setCancelPopupOpen(true)}
                        onNext={submitRecommendations}
                    />
                </SnackBar>
            </PageLayoutWrapper>
        </KeyDisplayStringContext.Provider>
    );
}

Recommendation.propTypes = {
    retryDelayDuration: PropTypes.number,
    maxRetriesAllowed: PropTypes.number,
    noOfSitesToLoad: PropTypes.number,
    // eslint-disable-next-line react/forbid-prop-types
    history: PropTypes.object.isRequired,
    termTitle: PropTypes.string,
    termDescription: PropTypes.string,
    recommendationTitle: PropTypes.string,
    siteTypes: PropTypes.arrayOf(PropTypes.shape({
        siteKey: PropTypes.string.isRequired,
        siteValue: PropTypes.string.isRequired,
    })).isRequired,
};

Recommendation.defaultProps = {
    retryDelayDuration: 2,
    maxRetriesAllowed: 5,
    noOfSitesToLoad: 1,
    termTitle: '<termTitle>',
    termDescription: '<termDescription>',
    recommendationTitle: '<recommendationTitle>',
};

export default class RecommendationPage extends Page {
    render() {
        return <Recommendation {...this.props} />;
    }
}

MapTo('mysparkdigital/manageddata/components/content/recommendation')(
    withComponentMappingContext(withRouter(RecommendationPage)),
);
