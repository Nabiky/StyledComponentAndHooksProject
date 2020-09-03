import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Icon from '#lib/FontIcons';

import ComplexPaginationEndsSelected from './components/ComplexPaginationEndsSelected';
import ComplexPagination from './components/ComplexPagination';
import SimplePagination from './components/SimplePagination';

const Pagination = ({
    currentPage,
    pageLabels,
    disableLeftArrow,
    onLeftArrowClick,
    disableRightArrow,
    onRightArrowClick,
    ...props
}) => {
    const currentIndex = currentPage - 1;
    let pageNumbers = (
        <ComplexPaginationEndsSelected
            currentPage={currentPage}
            pageLabels={pageLabels}
            {...props}
        />
    );

    if (pageLabels.length < 9) {
        pageNumbers = (
            <SimplePagination
                currentPage={currentPage}
                pageLabels={pageLabels}
                {...props}
            />
        );
    }

    if (currentIndex >= 3 && currentIndex <= pageLabels.length - 4) {
        pageNumbers = (
            <ComplexPagination
                currentPage={currentPage}
                pageLabels={pageLabels}
                {...props}
            />
        );
    }

    return (
        <Wrapper>
            <Icon
                name="arrow-left"
                color={disableLeftArrow ? 'theme.darkGray' : 'theme.secondary.blue'}
                cursor={disableLeftArrow ? 'default' : 'pointer'}
                margin="0 16px"
                onClick={!disableLeftArrow && onLeftArrowClick}
            />
            {pageNumbers}
            <Icon
                name="arrow-right"
                color={disableRightArrow ? 'theme.darkGray' : 'theme.secondary.blue'}
                cursor={disableRightArrow ? 'default' : 'pointer'}
                margin="0 16px"
                onClick={!disableRightArrow && onRightArrowClick}
            />
        </Wrapper>
    );
};

export default Pagination;

Pagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    pageLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
    disableLeftArrow: PropTypes.bool.isRequired,
    disableRightArrow: PropTypes.bool.isRequired,
    onLeftArrowClick: PropTypes.func.isRequired,
    onRightArrowClick: PropTypes.func.isRequired,
};

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 32px;
    align-items: center;
`;
