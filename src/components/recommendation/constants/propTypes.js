import PropTypes from 'prop-types';

export const SHAPE_OF_BANDWIDTH = PropTypes.shape({
    value: PropTypes.number,
    unit: PropTypes.string,
});

export const SHAPE_OF_ERROR_OBJECT = PropTypes.shape({
    show: PropTypes.bool.isRequired,
    description: PropTypes.string.isRequired,
});

export const SHAPE_OF_SERVICE = PropTypes.shape({
    name: PropTypes.string,
    bandwidth: PropTypes.string,
    technologyType: PropTypes.string,
});

export const SHAPE_OF_SITE = PropTypes.shape({
    address: PropTypes.string,
    siteName: PropTypes.string,
    rowId: PropTypes.string,
    elid: PropTypes.string,
    status: PropTypes.string,
    users: PropTypes.number,
    bandwidth: SHAPE_OF_BANDWIDTH,
    workingHours: PropTypes.string,
    diversity: PropTypes.string,
    siteType: PropTypes.string,
    availabilityMessage: PropTypes.string,
    services: PropTypes.arrayOf(SHAPE_OF_SERVICE),
});
