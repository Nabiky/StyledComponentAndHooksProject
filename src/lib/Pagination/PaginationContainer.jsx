import React from 'react';
import PropTypes from 'prop-types';

import Pagination from './Pagination';

const PaginationContainer = ({ pages, page, onPageChange }) => {
    if (pages > 1) {
        const pageLabels = [];

        for (let i = 0; i < pages; i += 1) {
            pageLabels.push(i + 1);
        }

        const decrementPage = () => {
            if (page > 0) {
                onPageChange(page - 1);
            }
        };

        const incrementPage = () => {
            if (page < pages - 1) {
                onPageChange(page + 1);
            }
        };

        const onPageChangeByLabel = (label) => {
            onPageChange(label - 1);
        };

        return (
            <Pagination
                pageLabels={pageLabels}
                selectPage={onPageChangeByLabel}
                currentPage={page + 1}
                disableLeftArrow={page === 0}
                disableRightArrow={page === pages - 1}
                onLeftArrowClick={decrementPage}
                onRightArrowClick={incrementPage}
            />
        );
    }
    return false;
};

export default PaginationContainer;

PaginationContainer.propTypes = {
    pages: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
};
