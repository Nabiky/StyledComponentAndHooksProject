import React from 'react';
import PropTypes from 'prop-types';

import RecForOneSite from '../RecForOneSite';

const RecommendationsSection = ({ siteList, openConfirmDeletePopup, ...props }) => (
    <>
        {siteList.map(site => (
            <RecForOneSite
                key={site.elid}
                site={site}
                openConfirmDeletePopup={() => openConfirmDeletePopup(site.elid)}
                {...props}
            />
        ))}
    </>
);

export default RecommendationsSection;

RecommendationsSection.propTypes = {
    siteList: PropTypes.arrayOf(PropTypes.shape({
        siteName: PropTypes.string,
        Address: PropTypes.string,
    })),
    openConfirmDeletePopup: PropTypes.func,
};

RecommendationsSection.defaultProps = {
    siteList: [],
    openConfirmDeletePopup: () => {},
};
