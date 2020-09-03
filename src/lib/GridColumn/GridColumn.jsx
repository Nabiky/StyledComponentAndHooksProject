import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const GridColumn = ({ columns, className, ...props }) => (
    <Wrapper className={`aem-GridColumn aem-GridColumn--default--${columns} ${className}`} {...props} />
);

const Wrapper = styled.div`
    display: flex;
    flex-direction:column;
`;

export default GridColumn;

GridColumn.propTypes = {
    children: PropTypes.node,
    columns: PropTypes.number,
    className: PropTypes.string,
};

GridColumn.defaultProps = {
    children: undefined,
    columns: 1,
    className: '',
};
