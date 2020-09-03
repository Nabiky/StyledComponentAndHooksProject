import axiosCustom, { axiosCustomNoCache } from './customAxios';
import endpoints from './endpoints';

const api = {
    getAddressTypeahead: value => axiosCustom({
        method: 'get',
        url: endpoints.ADDRESS_AUTOCOMPLETE_URL,
        params: {
            term: value,
            isAddressChecker: true,
        },
    }),


    sitePreferenceRetrieve: () => axiosCustomNoCache({
        method: 'get',
        url: endpoints.SITE_PREFERENCE,
    }),


    sitePreferenceSubmit: data => axiosCustom({
        method: 'post',
        url: endpoints.SITE_PREFERENCE,
        data,
    }),

    siteOffersAvailability: params => axiosCustom({
        method: 'get',
        url: endpoints.OFFERS_AVAILABILITY,
        params,
    }),

    deleteSite: params => axiosCustom({
        method: 'delete',
        url: endpoints.DELETE_SITE,
        params,
    }),

    getBulkOfferAvailability: async params => axiosCustom({
        method: 'get',
        url: endpoints.BULK_OFFER_AVAILABILITY,
        params,
    }),

    sendProposalToEmailAddresses: data => axiosCustom({
        method: 'post',
        url: endpoints.PROPOSAL,
        data,
    }),

    downloadProposal: params => axiosCustom({
        method: 'get',
        url: endpoints.PROPOSAL,
        params,
        responseType: 'arraybuffer',
    }),

    bulkSiteConfigurationSubmit: data => axiosCustom({
        method: 'post',
        url: endpoints.BULK_SITE_CONFIGURATION_SUBMIT,
        data,
    }),

    userQuotesRetrieval: () => axiosCustomNoCache({
        method: 'get',
        url: endpoints.USER_QUOTES_RETRIEVAL,
    }),

    userQuoteRestore: params => axiosCustom({
        method: 'post',
        url: endpoints.USER_QUOTE_RESTORE,
        params,
    }),

    userQuoteDelete: params => axiosCustom({
        method: 'delete',
        url: endpoints.USER_QUOTE_DELETE,
        params,
    }),
};

export default api;
