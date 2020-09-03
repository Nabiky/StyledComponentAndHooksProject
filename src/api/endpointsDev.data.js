const localEndpoint = 'http://localhost:3002';

const endpoint = {
    ADDRESS_AUTOCOMPLETE_URL: `${localEndpoint}/addressSearch`,
    SITE_PREFERENCE: `${localEndpoint}/site-preferences-retrieve`,
    OFFERS_AVAILABILITY: `${localEndpoint}/offerAvaliability`,
    DELETE_SITE: `${localEndpoint}/deleteSite`,
    BULK_OFFER_AVAILABILITY: `${localEndpoint}/bulk-offer-availability`,
    PROPOSAL: `${localEndpoint}/proposal`,
    BULK_SITE_CONFIGURATION_SUBMIT: `${localEndpoint}/bulk-site-configuration-submit`,
    USER_QUOTES_RETRIEVAL: `${localEndpoint}/user-quotes-retrieval`,
    USER_QUOTE_RESTORE: `${localEndpoint}/user-quote-restore`,
    USER_QUOTE_DELETE: `${localEndpoint}/user-quote-delete`,
};

export default endpoint;
