import React from 'react';
import PropTypes from 'prop-types';

import ThreeDots from './ThreeDots';
import Numbers from './Numbers';
import NumberList from './NumberList';

//* **********************************************
// This pagination format displays the first 3 and last 3 page numbers
// Except when the 3rd number is selected in which case the 4th page number
// Also displays
//* **********************************************

const ComplexPaginationEndsSelected = ({ pageLabels, selectPage, currentPage }) => {
    const currentPageIndex = currentPage - 1;
    const firstGroupEnd = currentPageIndex === 2 ? 4 : 3;
    const labelCount = pageLabels.length;
    const secondGroupStart = currentPageIndex === labelCount - 3 ? labelCount - 4 : labelCount - 3;
    return (
        <NumberList>
            <Numbers
                array={pageLabels}
                startIndex={0}
                endIndex={firstGroupEnd}
                selectPage={selectPage}
                currentPage={currentPage}
            />
            <ThreeDots />

            <Numbers
                array={pageLabels}
                startIndex={secondGroupStart}
                endIndex={labelCount}
                selectPage={selectPage}
                currentPage={currentPage}
            />

        </NumberList>
    );
};

export default ComplexPaginationEndsSelected;

ComplexPaginationEndsSelected.propTypes = {
    currentPage: PropTypes.number.isRequired,
    pageLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
    selectPage: PropTypes.func.isRequired,
};
