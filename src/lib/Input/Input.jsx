import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import styled, { withTheme } from 'styled-components';
import { theme } from 'styled-tools';
import uuid from 'uuid';
import * as Text from '#lib/Text';
import Icon from '../FontIcons';
import { fonts } from '#constants/styleConstants';

class Input extends Component {
    constructor(props) {
        super(props);
        const { type } = this.props;
        this.labelPairUuid = uuid.v4();

        this.state = {
            fieldType: type === 'password' ? 'password' : 'text',
            showPassword: false,
            focused: false,
        };
    }

    setFocus = () => {
        const { onFocus } = this.props;
        onFocus();
        this.setState({ focused: true });
    };

    setBlur = () => {
        const { onBlur } = this.props;
        if (onBlur) {
            onBlur();
        }
        this.setState({ focused: false });
    };

    toggleFieldType = () => {
        const { showPassword, fieldType } = this.state;
        this.setState({
            showPassword: !showPassword,
            fieldType: fieldType === 'password' ? 'text' : 'password',
        });
    };

    onButtonClick = ({ disabled, button }) => {
        if (!disabled) {
            button.onClick();
        }
    };

    render() {
        const {
            value,
            onChange,
            onClear,
            type,
            secondary,
            disabled,
            button,
            innerRef,
            className,
            placeholder,
            marginBottom,
            dataTestId,
            label,
            error,
            message,
            theme: colorTheme,
        } = this.props;

        const { focused, showPassword, fieldType } = this.state;

        const primaryColor = {
            label: colorTheme['text-color']['text-grey-3'],
            text: colorTheme['text-color']['text-grey-5'],
            underline: colorTheme['text-color']['text-grey-3'],
            button: colorTheme['text-color']['interaction-color'],
            link: colorTheme['text-color']['interaction-color'],
            message: colorTheme['text-color']['text-grey-3'],
            error: colorTheme['text-color']['text-red'],
        };

        const primaryColorFocused = {
            ...primaryColor,
            label: colorTheme['text-color']['interaction-color'],
            underline: colorTheme['text-color']['interaction-color'],
            button: colorTheme['text-color']['interaction-color'],
        };

        const primaryColorDisabled = {
            ...primaryColor,
            label: colorTheme['background-color']['bg-grey-2'],
            text: colorTheme['background-color']['bg-grey-2'],
            underline: ['background-color']['bg-grey-2'],
            button: colorTheme['background-color']['bg-grey-2'],
        };

        const secondaryColor = {
            label: colorTheme['text-color']['text-white'],
            text: colorTheme['text-color']['text-white'],
            underline: colorTheme['background-color']['bg-grey-2'],
            button: colorTheme['text-color']['text-white'],
            link: colorTheme['text-color']['text-white'],
            message: colorTheme['text-color']['text-white'],
            error: colorTheme['text-color']['text-red'],
        };

        const secondaryColorFocused = {
            ...secondaryColor,
            label: colorTheme['text-color']['interaction-color'],
            underline: colorTheme['text-color']['interaction-color'],
            button: colorTheme['text-color']['interaction-color'],
        };

        const secondaryColorDisabled = {
            ...secondaryColor,
            label: colorTheme['background-color']['bg-grey-2'],
            text: colorTheme['background-color']['bg-grey-2'],
            underline: colorTheme['text-color']['text-grey-3'],
            button: colorTheme['background-color']['bg-grey-2'],
        };

        let colorPalette = primaryColor;

        if (secondary) {
            if (disabled) {
                colorPalette = secondaryColorDisabled;
            } else if (focused) {
                colorPalette = secondaryColorFocused;
            } else {
                colorPalette = secondaryColor;
            }
        } else if (disabled) {
            colorPalette = primaryColorDisabled;
        } else if (focused) {
            colorPalette = primaryColorFocused;
        }

        const visibility = showPassword ? (
            <Icon
                name="visible-off-f"
                title="Toggle password visibility on"
                height="24"
                width="24"
                onClick={this.toggleFieldType}
            />
        ) : (
            <Icon
                name="visible-f"
                title="Toggle password visibility off"
                height="24"
                width="24"
                onClick={this.toggleFieldType}
            />
        );
        return (
            <Wrapper className={className}>
                <InputWrapper focused={focused} lineColor={colorPalette.underline}>
                    <LeftWrapper marginBottom={marginBottom}>
                        <Field
                            ref={innerRef}
                            onFocus={this.setFocus}
                            onBlur={this.setBlur}
                            disabled={disabled}
                            value={_.isNil(value) ? '' : value}
                            onChange={onChange}
                            name={label}
                            type={fieldType}
                            textColor={colorPalette.text}
                            buttonMovable={type === 'password'}
                            placeholder={placeholder}
                            data-testid={dataTestId}
                            id={this.labelPairUuid}
                        />
                        <Label
                            data-testid={`${dataTestId}-label`}
                            color={colorPalette.label}
                            htmlFor={this.labelPairUuid}
                            moveUp={
                                focused || (value !== '' && value !== undefined && value !== null)
                            }
                        >
                            {label}
                        </Label>
                    </LeftWrapper>

                    {(type === 'password' || onClear || button) && (
                        <RightWrapper className={className}>
                            <IconWrapper className="iconWrapper" showIcon={focused || value}>
                                {type === 'password' && visibility}
                                {onClear && (
                                    <Icon
                                        onClick={onClear}
                                        title="Clear input"
                                        color="theme.text-color.text-grey-3"
                                        name="close"
                                        size="16px"
                                    />
                                )}
                            </IconWrapper>

                            {button && (
                                <InputButton
                                    href={button.href ? button.href : '#'}
                                    disabled={disabled}
                                    onClick={this.onButtonClick}
                                    color={colorPalette.button}
                                    underline={button.underline}
                                    focused={focused}
                                    moveUp={focused || (value !== '' && value !== undefined)}
                                >
                                    {button.text}
                                </InputButton>
                            )}
                        </RightWrapper>
                    )}
                </InputWrapper>
                {error && (
                    <Error data-testid={`${dataTestId}-error`} color={colorPalette.error}>
                        {error}
                    </Error>
                )}
                {message && (
                    <Message data-testid={`${dataTestId}-message`} color={colorPalette.message}>
                        {message}
                    </Message>
                )}
            </Wrapper>
        );
    }
}
export default withTheme(Input);

Input.propTypes = {
    type: PropTypes.string,
    onChange: PropTypes.func,
    onClear: PropTypes.func,
    onFocus: PropTypes.func,
    value: PropTypes.string,
    innerRef: PropTypes.func,
    secondary: PropTypes.string,
    disabled: PropTypes.bool,
    button: PropTypes.string,
    onBlur: PropTypes.func,
    className: PropTypes.string,
    placeholder: PropTypes.string,
    marginBottom: PropTypes.string,
    dataTestId: PropTypes.string,
    label: PropTypes.string,
    error: PropTypes.string,
    message: PropTypes.string,
    // eslint-disable-next-line react/forbid-prop-types
    theme: PropTypes.object.isRequired,
};

Input.defaultProps = {
    type: '',
    secondary: '',
    onChange: () => {},
    onClear: undefined,
    onFocus: () => {},
    value: '',
    innerRef: () => {},
    disabled: false,
    button: '',
    onBlur: () => {},
    className: '',
    placeholder: '',
    marginBottom: '',
    dataTestId: '',
    label: '',
    error: '',
    message: '',
};

const Wrapper = styled.div`
    ${fonts.Medium};
    position: relative;
    margin-top: 8px;
    min-width: 100%;
    width: 100%;
`;
const LeftWrapper = styled.div`
    height: 32px;
    margin-bottom: ${props => props.marginBottom || '0'};
    position: relative;
    width: 100%;
`;
const InputWrapper = styled.div`
    border-bottom: ${props => (props.focused ? '2px' : '1px')} solid;
    border-color: ${props => props.lineColor};
    display: flex;
    margin-bottom: ${props => (props.focused ? '3px' : '4px')};
`;
const IconWrapper = styled.div`
    display: ${props => (props.showIcon ? 'flex' : 'none')};
    height: 24px;
    width: 24px;
    align-items: center;
`;

const RightWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-around;
    padding: 0 8px;
`;
export const Field = styled.input`
    ${fonts.Medium};
    border: none;
    font-size: 16px;
    line-height: 1.4;
    width: 100%;
    height: 100%;
    padding: 0;
    outline: none;
    position: relative;
    background: transparent;
    box-shadow: none;
    color: ${props => props.textColor};
    ::-ms-clear {
        display: none;
    }
    ::-ms-reveal {
        display: none;
    }
    ::placeholder {
        color: ${theme('text-color.text-grey-3')};
    }
`;
const Label = styled.label`
    ${fonts.Medium};
    top: 8px;
    left: 0px;
    margin: 0px;
    position: absolute;
    color: ${props => props.color};
    font-size: ${props => (props.moveUp ? '12px' : '16px')};
    transform: ${props => (props.moveUp ? 'translateY(-20px)' : '')};
    transition: transform 0.15s ease 0s, font-size 0.1s;
    will-change: transform, font-size;
    z-index: 1;
`;
const Error = styled(Text.Label1)`
    position: absolute;
    text-align: left;
    color: ${props => props.color};
    background-color: ${theme('background-color.bg-white')};
    margin: 0;
`;
const Message = styled(Text.Label1)`
    position: absolute;
    text-align: left;
    color: ${props => props.color};
    margin: 0;
`;
export const InputButton = styled.a`
    ${fonts.Medium};
    white-space: nowrap;
    position: absolute;
    color: ${props => props.color};
    cursor: ${props => (props.disabled ? 'default' : 'pointer')};
    transform: ${props => (props.moveUp ? 'translateY(-20px)' : '')};
    font-size: ${props => (props.moveUp ? '12px' : '16px')};
    text-decoration: ${props => (props.underline ? 'underline' : 'none')};
    transition: transform 0.15s ease 0s, font-size 0.1s;
    will-change: transform, font-size;
`;
