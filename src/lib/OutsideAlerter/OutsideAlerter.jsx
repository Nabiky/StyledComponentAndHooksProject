import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Component that alerts if you click outside of it
 */
export default class OutsideAlerter extends Component {
    constructor(props) {
        super(props);

        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        const { onMouseDownOutside, onClickOutside } = this.props;
        if (onMouseDownOutside) {
            document.addEventListener('mousedown', this.handleClickOutside);
        } else if (onClickOutside) {
            document.addEventListener('click', this.handleClickOutside);
        }
    }

    componentWillUnmount() {
        const { onMouseDownOutside, onClickOutside } = this.props;
        if (onMouseDownOutside) {
            document.removeEventListener('mousedown', this.handleClickOutside);
        } else if (onClickOutside) {
            document.removeEventListener('click', this.handleClickOutside);
        }
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    handleClickOutside(event) {
        const { onMouseDownOutside, onClickOutside } = this.props;
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            if (onClickOutside) {
                onClickOutside();
            } else if (onMouseDownOutside) {
                onMouseDownOutside();
            }
        }
    }

    render() {
        const { children } = this.props;
        return <div ref={this.setWrapperRef}>{children}</div>;
    }
}

OutsideAlerter.propTypes = {
    children: PropTypes.element.isRequired,
    onMouseDownOutside: PropTypes.func,
    onClickOutside: PropTypes.func,
};

OutsideAlerter.defaultProps = {
    onMouseDownOutside: () => {},
    onClickOutside: () => {},
};
