import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import SnackBarSectionView from './SnackBarSectionView';
import { SITE_COMPLETED } from '#recommendation/constants/siteLoadingStatus';

function computeFees(sitesToShow) {
    return sitesToShow.reduce((acc, site) => {
        const services = _.get(site, 'services', []);
        const selected = services.find(service => service.preselected) || services[0];
        const oneOff = _.get(selected, 'charges', []).find(charge => charge.type === 'ONEOFF');
        const monthly = _.get(selected, 'charges', []).find(charge => charge.type === 'RECURRING');
        acc.oneOffFees += _.get(oneOff, 'price.value', 0);
        acc.monthlyFees += _.get(monthly, 'price.value', 0);
        return acc;
    }, { monthlyFees: 0, oneOffFees: 0 });
}

function SnackBarSectionContainer({ siteList, onNext, onCancel }) {
    const { monthlyFees, oneOffFees } = useMemo(() => computeFees(siteList), [siteList]);
    const allowSubmit = siteList.some(
        site => site.status === SITE_COMPLETED && site.services.length,
    );
    return (
        <SnackBarSectionView
            monthlyFees={`$${monthlyFees.toFixed(2)}`}
            oneOffFees={`$${oneOffFees.toFixed(2)}`}
            onNext={allowSubmit ? onNext : undefined}
            onCancel={onCancel}
        />
    );
}

SnackBarSectionContainer.propTypes = {
    siteList: PropTypes.arrayOf(PropTypes.shape({
        service: PropTypes.arrayOf(PropTypes.shape({
            charge: PropTypes.arrayOf(PropTypes.shape({
                type: PropTypes.string,
                value: PropTypes.number,
            })),
        })),
    })),
    onNext: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

SnackBarSectionContainer.defaultProps = {
    siteList: [],
};

export default SnackBarSectionContainer;
