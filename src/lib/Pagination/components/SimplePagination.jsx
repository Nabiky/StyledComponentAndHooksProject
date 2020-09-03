import React from 'react';
import PropTypes from 'prop-types';
import Numbers from './Numbers';

//* **********************************************
// This pagination format displays all page numbers are shown
//* **********************************************
const SimplePagination = ({ pageLabels, selectPage, currentPage }) => (
    <Numbers
        array={pageLabels}
        startIndex={0}
        endIndex={pageLabels.length}
        selectPage={selectPage}
        currentPage={currentPage}
    />
);

export default SimplePagination;

SimplePagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    pageLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
    selectPage: PropTypes.func.isRequired,

};
