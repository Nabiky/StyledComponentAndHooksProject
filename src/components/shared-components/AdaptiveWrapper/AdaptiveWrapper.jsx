import React from 'react';
import Responsive from 'react-responsive';
import PropTypes from 'prop-types';
import { breakpoints } from '#src/constants/styleConstants';

const Desktop = props => (
    <Responsive {...props} minWidth={breakpoints.desktopMini} />
);
const Tablet = props => (
    <Responsive
        {...props}
        minWidth={breakpoints.tablet}
        maxWidth={breakpoints.desktopMini}
    />
);
const Mobile = props => <Responsive {...props} maxWidth={breakpoints.tablet} />;

const AdaptiveWrapper = ({ children }) => (
    <div>
        <Desktop>{children.desktop}</Desktop>
        <Tablet>{children.tablet}</Tablet>
        <Mobile>{children.mobile}</Mobile>
    </div>
);

export default AdaptiveWrapper;

AdaptiveWrapper.propTypes = {
    children: PropTypes.shape({
        desktop: PropTypes.element.isRequired,
        tablet: PropTypes.element.isRequired,
        mobile: PropTypes.element.isRequired,
    }),
};

AdaptiveWrapper.defaultProps = {
    children: PropTypes.shape({
        desktop: '',
        tablet: '',
        mobile: '',
    }),
};
