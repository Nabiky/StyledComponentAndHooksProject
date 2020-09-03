import React, { Component } from 'react';
import { areComponentsEqual } from 'react-hot-loader';
import styled, { css } from 'styled-components';
import { theme, ifProp } from 'styled-tools';
import PropTypes from 'prop-types';
import _ from 'lodash';
import * as Text from '#lib/Text';
import GiantFullScreenDiv from '../GiantFullScreenDiv/GiantFullScreenDiv';

const DropdownOption = ({
    onOptionClick,
    onButtonClick,
    value,
    children,
    buttonText,
    showButton,
}) => (
    <OptionWrapper name="OptionWrapper" onClick={() => onOptionClick(value)}>
        <OptionTextWrapper>
            <Option>{children}</Option>
            {showButton && (
                <ActionButton
                    name="OptionActionButton"
                    onClick={() => onButtonClick(value)}
                >
                    {buttonText}
                </ActionButton>
            )}
        </OptionTextWrapper>
        <Underline />
    </OptionWrapper>
);

DropdownOption.propTypes = {
    onOptionClick: PropTypes.func,
    onButtonClick: PropTypes.func,
    buttonText: PropTypes.string,
    showButton: PropTypes.bool,
    children: PropTypes.node,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

DropdownOption.defaultProps = {
    onOptionClick: () => {},
    onButtonClick: undefined,
    buttonText: '',
    showButton: false,
    children: '',
    value: '',
};

/**
 * This is a dropdown component
 */
class Dropdown extends Component {
    static Option = DropdownOption;

    constructor(props) {
        super(props);

        const value = this.props;
        this.state = {
            open: false,
            displayInfoFor: value,
        };

        this.selectOptionAndCloseDropdown = this.selectOptionAndCloseDropdown.bind(
            this,
        );
    }

    toggleDropdown = () => {
        const { onOpenClose, open, disabled } = this.props;
        if (!disabled) {
            if (onOpenClose) {
                onOpenClose(!open);
            } else {
                this.setState(state => ({ open: !state.open }));
            }
        }
    };

    closeDropdown = () => {
        const { onBlur, onOpenClose } = this.props;
        if (onBlur) {
            onBlur();
        }

        if (onOpenClose) {
            onOpenClose(false);
        } else {
            this.setState({ open: false });
        }
    };

    selectOptionAndCloseDropdown = (clickedValue) => {
        const { disabled, onSelect } = this.props;
        this.closeDropdown();
        if (!disabled) {
            onSelect(clickedValue);
        }
    };

    showInfoForOption = (clickedValue) => {
        this.setState({ displayInfoFor: clickedValue });
    };

    deriveDataFromChildren = (propsChildren) => {
        let displayTextFromChildren = '';
        const children = [];
        let info = <div />;

        React.Children.forEach(propsChildren, (child) => {
            const { withInfoBox, value } = this.props;
            const { displayInfoFor } = this.state;
            const {
                value: childPropsValue,
                info: childPropsInfo,
            } = child.props;

            if (areComponentsEqual(child.type, DropdownOption)) {
                if (_.isEqual(childPropsValue, value)) {
                    displayTextFromChildren = child.props.children;
                }

                if (_.isEqual(childPropsValue, displayInfoFor)) {
                    info = childPropsInfo;
                }

                children.push(
                    React.cloneElement(child, {
                        onOptionClick: withInfoBox
                            ? this.showInfoForOption
                            : this.selectOptionAndCloseDropdown,
                        showButton:
                            withInfoBox && childPropsValue === displayInfoFor,
                        onButtonClick: this.selectOptionAndCloseDropdown,
                    }),
                );
            } else {
                children.push(child);
            }
        });

        return {
            displayTextFromChildren,
            children,
            info,
        };
    };

    render() {
        const {
            dropdownWidth,
            value,
            placeholder,
            disabled,
            error,
            custom,
            customHeight,
            withInfoBox,
            open: propOpen,
            displayText: propDisplayText,
            label,
            children: propsChildren,
        } = this.props;
        const {
            children,
            info,
            displayTextFromChildren,
        } = this.deriveDataFromChildren(propsChildren);
        const displayText = propDisplayText || displayTextFromChildren || placeholder;
        const { open: stateOpen } = this.state;

        const open = propOpen === undefined ? stateOpen : propOpen;
        return (
            <Wrapper tabIndex="0">
                {open && <CloseDropdownDiv onClick={this.closeDropdown} /> }
                <SelectedWrapper
                    focus={open}
                    width={dropdownWidth}
                    onClick={this.toggleDropdown}
                >
                    <Label moveUp={open || value || value === 0 || propDisplayText}>
                        <LabelText
                            as="label"
                            focus={open}
                            hasValue={value || value === 0 || propDisplayText}
                        >
                            {label}
                        </LabelText>
                    </Label>
                    <SelectedText
                        name="SelectedText"
                        dullText={displayText === placeholder || disabled}
                    >
                        {displayText}
                    </SelectedText>
                    <Arrow name="Arrow" open={open} />
                </SelectedWrapper>
                <Error>{error}</Error>
                <DropdownRelativeWrapper tabIndex="0">
                    <DropdownContentWrapper
                        open={open}
                        fitContent={custom}
                        customHeight={customHeight}
                    >
                        <OptionsList>{children}</OptionsList>
                        {withInfoBox && (
                            <InfoSpace name="DropdownInfoSpace">
                                {info}
                            </InfoSpace>
                        )}
                    </DropdownContentWrapper>
                </DropdownRelativeWrapper>
            </Wrapper>
        );
    }
}
const Wrapper = styled.div`
    width: 100%;
    margin-top: 8px;
    outline: none;
    position: relative;
`;

const Error = styled(Text.Label1)`
    position: absolute;
    color: ${theme('text-color.text-red')};
    background-color: ${theme('background-color.bg-white')};
    margin: 0;
`;

export const CloseDropdownDiv = styled(GiantFullScreenDiv)`
    background-color: transparent;
`;

export const SelectedWrapper = styled.div`
    outline: none;
    cursor: pointer;
    width: ${({ width }) => width || '100%'};
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 32px;
    background-color: transparent;
    border-bottom: ${ifProp('focus', '2px', '1px')} solid;
    border-color: ${ifProp('focus',
        theme('text-color.interaction-color'),
        theme('text-color.text-grey-3'))};
    padding: 0 10px 0 0;
    margin-bottom:${ifProp('focus', '3px', '4px')};
`;

const Label = styled.div`
    position: absolute;
    transform: ${({ moveUp }) => (moveUp ? 'translateY(-20px)' : '')};
    transition: transform 0.15s ease 0s, font-size 0.1s;
    will-change: transform, font-size;
    z-index: 1;
`;

const LabelText = styled(Text.Body1)`
    color: ${({ focus }) => (focus ? theme('text-color.interaction-color') : theme('text-color.text-grey-3'))};
    ${({ focus, hasValue }) => (focus || hasValue)
        && css`
            font-size: 12px;
        `}
`;

const SelectedText = styled(Text.Body1)`
    color: ${({ dullText }) => (dullText ? theme('text-color.text-grey-3') : theme('text-color.text-grey-5'))};
`;

const Arrow = styled.span`
    height: 8px;
    width: 8px;
    border-right: 1.5px solid ${theme('text-color.text-grey-3')};
    border-bottom: 1.5px solid ${theme('text-color.text-grey-3')};
    transform: ${({ open }) => (open
        ? 'translateY(4px) rotate(-135deg)'
        : 'translateY(-2px )rotate(45deg)')};
`;

const DropdownRelativeWrapper = styled.div`
    outline: none;
    position: relative;
    z-index: 999;
`;

const DropdownContentWrapper = styled.div`
    outline: none;
    display: ${({ open }) => (open ? 'inline-block' : 'none')};
    position: absolute;
    background-color: white;
    width: ${({ fitContent }) => (fitContent ? 'fit-content' : '100%')};
    box-shadow: 1.5px 1.5px 4px 1.5px rgba(0, 0, 0, 0.2);
    height: ${({ customHeight }) => customHeight || ''};
    max-height: 360px;
    overflow: auto;
    top: 0;
    left: 0;
`;

const OptionsList = styled.div`
    margin: 0px;
    flex: 1;
`;

const Underline = styled.div`
    padding: 0;
    border-bottom: 1px solid ${theme('background-color.bg-grey-1')}; 
    height: 0;
`;

const OptionWrapper = styled.div`
    padding: 0 8px;
    cursor: pointer;

    &:hover {
        background-color: ${theme('background-color.bg-grey-1')};
    }

    &:last-child {
        ${Underline} {
            display: none;
        }
    }
`;

const OptionTextWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const InfoSpace = styled.div`
    min-height: 300px;
    background-color: ${theme('background-color.bg-grey-1')};
    flex: 3;
    padding: 16px 32px;
`;

const Option = styled(Text.Caption1)`
    padding: 0 8px;
    height: 40px;
    display: flex;
    align-items: center;
    border-bottom: ${({ showLine }) => (showLine
        ? `solid 1px ${theme('text-color.text-grey-3')}`
        : 'none')};
    color: ${theme('text-color.text-grey-4')};
`;

const ActionButton = styled(Text.Caption1)`
    color: ${theme('text-color.text-blue-light')};
    cursor: pointer;
`;


export default Dropdown;

Dropdown.propTypes = {
    children: PropTypes.node,
    displayText: PropTypes.string,
    dropdownWidth: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    placeholder: PropTypes.string,
    open: PropTypes.bool,
    disabled: PropTypes.bool,
    error: PropTypes.string,
    customHeight: PropTypes.string,
    withInfoBox: PropTypes.bool,
    custom: PropTypes.bool,
    onSelect: PropTypes.func,
    onBlur: PropTypes.func,
    onOpenClose: PropTypes.bool,
    label: PropTypes.string,
};

Dropdown.defaultProps = {
    children: '',
    displayText: '',
    dropdownWidth: '',
    value: '',
    placeholder: '',
    open: undefined,
    disabled: false,
    error: '',
    customHeight: '',
    withInfoBox: undefined,
    custom: false,
    onSelect: undefined,
    onBlur: undefined,
    onOpenClose: undefined,
    label: '',
};
