import React from 'react';
import styled from 'styled-components';
import { switchProp, prop } from 'styled-tools';
import PropTypes from 'prop-types';
import sizePixelMap from '#constants/sizePixelMap';

const Grid = ({
    gutter, marginBottom, className, ...props
}) => (
    <Wrapper marginBottom={marginBottom} gutterSize={gutter} className={`aem-Grid aem-Grid--12 ${className}`} {...props} />
);

export default Grid;

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    box-sizing: border-box;
    margin-bottom: ${switchProp(prop('marginBottom', '0'), sizePixelMap)};

    > .aem-GridColumn {
        padding-right: ${switchProp(prop('gutterSize', '2'), sizePixelMap)};

        &:last-child {
            padding-right: 0
        }
    }
`;

Grid.propTypes = {
    children: PropTypes.node,
    gutter: PropTypes.string,
    marginBottom: PropTypes.string,
    className: PropTypes.string,
};

Grid.defaultProps = {
    children: undefined,
    gutter: '2',
    marginBottom: '0',
    className: '',
};
