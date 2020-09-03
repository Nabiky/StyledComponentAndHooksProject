import * as React from 'react';
import styled, { css } from 'styled-components';
import { prop } from 'styled-tools';

interface BaseFontIconProps {
    inline?: boolean;
    size?: string;
    color?: string;
    cursor?: string;
    marginTop?: string;
    marginRight?: string;
    marginBottom?: string;
    marginLeft?: string;
    margin?: string;
    hoverColor?: string;
    role: string;
}

const BaseFontIcon = (styled.span) < BaseFontIconProps >`
    font-family: 'spark-icon-family', arial, sans-serif;
    speak: none;
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    display: ${props => (props.inline ? 'inline' : 'block')};
    background-color: transparent;
    text-decoration: none;
    padding: 0;
    width: ${({ size }) => size || '16px'};
    height: ${({ size }) => size || '16px'};
    font-size: ${({ size }) => size || '16px'};
    color: ${({ color }) => prop(color || 'theme.text-color.text-grey-5')};
    cursor: ${({ cursor }) => cursor || 'pointer'};
    margin: ${({ margin }) => margin || ''};
    margin-top: ${({ marginTop }) => marginTop || '0'};
    margin-right: ${({ marginRight }) => marginRight || '0'};
    margin-bottom: ${({ marginBottom }) => marginBottom || '0'};
    margin-left: ${({ marginLeft }) => marginLeft || '0'};
    line-height: 1;
    ${({ hoverColor }) => hoverColor
        && css`
            &:hover {
                color: ${prop(hoverColor, '')};
            }
        `};
`;

interface IIconProps {
    name: string,
    ariaLabel: string,
    title?: string,
    role?: string;
    className?: string,
}

const Icon = ({
    name, ariaLabel, className, role, title, ...props
}: IIconProps) => {
    const lowerCaseName = name.toLowerCase();
    const iconClassName = `icon icon-${lowerCaseName}`;
    const classNameExtracted = `${className || ''} ${iconClassName}`;
    const finalClassName = classNameExtracted.trim();

    if (lowerCaseName !== name && process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.warn(
            `<Icon>'s 'name' prop should not contain uppercase. It is currently set as '${name}'.`,
        );
    }

    return (
        <BaseFontIcon
            className={finalClassName}
            role={role || 'button'}
            title={title || 'icon'}
            aria-label={ariaLabel}
            {...props}
        />
    );
};

export default Icon;
