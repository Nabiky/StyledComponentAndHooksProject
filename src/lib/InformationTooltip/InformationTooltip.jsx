import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import * as T from '#lib/Text/Text';
import Icon from '#lib/FontIcons';
import Popover from '#lib/Popover/Popover';

const InformationWrapper = styled.div`
    margin-right: 20px;
    line-height: 28px;
    outline: none;
    position: relative;
`;

const WindowPadding = styled.div`
    padding: 40px;
    overflow-wrap: break-word;
    width: 312px;
`;

export const WindowHeader = styled(T.Body2)`
    color: ${props => props.theme.darkerGray};
    margin-bottom: 20px;
`;

export const WindowDetails = styled(T.Caption1)`
    color: ${props => props.theme.darkGray};
`;

export default class InformationTooltip extends React.Component {
    state = {
        showTooltip: false,
    };

    toggleTooltip = () => {
        this.setState(prevState => ({
            showTooltip: !prevState.showTooltip,
        }));
    };

    closeTooltip = () => this.setState({ showTooltip: false });

    render() {
        const { showTooltip } = this.state;
        const {
            title, information, marginTop, marginLeft,
        } = this.props;
        return (
            <InformationWrapper tabIndex="0" onBlur={this.closeTooltip}>
                <Icon
                    marginTop={marginTop}
                    marginLeft={marginLeft}
                    name="information-f"
                    size="32px"
                    color="theme.gray"
                    cursor="pointer"
                    onClick={this.toggleTooltip}
                    title="tooltip"
                />
                <Popover popLeft isDisplayed={showTooltip}>
                    <WindowPadding>
                        {title && <WindowHeader>{title}</WindowHeader>}
                        {typeof information === 'string'
                            ? <WindowDetails>{information}</WindowDetails>
                            : information()}
                    </WindowPadding>
                </Popover>
            </InformationWrapper>
        );
    }
}

InformationTooltip.propTypes = {
    title: PropTypes.string,
    information: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    marginTop: PropTypes.string,
    marginLeft: PropTypes.string,
};

InformationTooltip.defaultProps = {
    title: '',
    information: '',
    marginTop: '',
    marginLeft: '',
};
