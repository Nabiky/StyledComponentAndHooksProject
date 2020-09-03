import React from 'react';
import PropTypes from 'prop-types';

import Numbers from './Numbers';
import ThreeDots from './ThreeDots';
import NumberList from './NumberList';

//* **********************************************
// This pagination format displays the first and the last page number
// and the one number before the selected page, and one number after
//* **********************************************
const ComplexPagination = ({ currentPage, pageLabels, selectPage }) => {
    const currentPageIndex = currentPage - 1;
    const groupStart = currentPageIndex - 1;
    const groupEnd = currentPageIndex + 2;

    return (
        <NumberList>
            <Numbers
                array={pageLabels}
                startIndex={0}
                endIndex={1}
                selectPage={selectPage}
                currentPage={currentPage}
            />

            <ThreeDots />
            <Numbers
                array={pageLabels}
                startIndex={groupStart}
                endIndex={groupEnd}
                selectPage={selectPage}
                currentPage={currentPage}
            />

            <ThreeDots />
            <Numbers
                array={pageLabels}
                startIndex={pageLabels.length - 1}
                endIndex={pageLabels.length}
                selectPage={selectPage}
                currentPage={currentPage}
            />
        </NumberList>
    );
};

export default ComplexPagination;

ComplexPagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    pageLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
    selectPage: PropTypes.func.isRequired,

};
