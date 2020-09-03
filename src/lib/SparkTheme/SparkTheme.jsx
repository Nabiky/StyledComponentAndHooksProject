import React from 'react';
import { ThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';

window.tokens = {
    'text-color': {
        'text-alert-red': '#DF1F00',
        'text-green-dark': '#028237',
        'text-green': '#00AF55',
        'text-blue-light': '#6ed2ff',
        'text-purple-light': '#75529d',
        'text-grey-3': '#999999',
        'text-grey-4': '#666666',
        'text-grey-5': '#333333',
        'text-purple-dark': '#352364',
        'text-blue-dark': '#007CBD',
        'text-white': '#FFFFFF',
        'text-green-light': '#82c86e',
        'text-pink-dark': '#c0087f',
        'text-orange': '#FF9B00',
        'text-orange-dark': '#F26823',
        'text-pink': '#EC008C',
        'text-orange-light': '#f9b104',
        'text-alert-notify': '#CFEEFF',
        'text-purple': '#5F259F',
        'text-pink-light': '#f07db4',
        'text-black': '#000000',
        'text-red': '#ff0000',
        'interaction-color': '#0096E6',

    },
    'background-color': {
        'bg-white': '#FFFFFF',
        'bg-alert-notify': '#CFEEFF',
        'bg-green-light': '#82c86e',
        'bg-purple': '#5F259F',
        'bg-pink-dark': '#c0087f',
        'bg-pink-light': '#f07db4',
        'bg-green-dark': '#028237',
        'interaction-color': '#0096E6',
        'bg-grey-0': '#fafafa',
        'bg-grey-1': '#e8e8e8',
        'bg-grey-2': '#B2B2B2',
        'bg-purple-light': '#75529d',
        'bg-orange-dark': '#F26823',
        'bg-grey-3': '#999999',
        'bg-grey-4': '#666666',
        'bg-grey-5': '#333333',
        'bg-orange': '#FF9B00',
        'bg-black': '#000000',
        'bg-alert-red': '#DF1F00',
        'bg-green': '#00AF55',
        'bg-pink': '#EC008C',
        'bg-orange-light': '#f9b104',
        'bg-purple-dark': '#352364',
        'bg-nostalgic-blue': '#0096e6',
    },
};

export const theme = Object.assign(
    {
        primary: {
            orange: '#ff9b00',
            pink: '#ec008c',
            green: '#00af55',
            purple: '#5f259f',
        },
        secondary: {
            blue: '#0096e6',
            lightBlue: '#6ed2ff',
            darkBlue: '#007cbd',
        },
        accent: {
            lightOrange: '#f9b104',
            darkOrange: '#f26823',
            lightPink: '#f07db4',
            darkPink: '#c0087f',
            lightGreen: '#86c86e',
            darkGreen: '#028237',
            lightPurple: '#75529d',
            darkPurple: '#352364',
        },
        gradient: {
            orangeCentre: 'rgb(255,185,77)',
            orangeEdge: 'rgb(255,155,0)',
            pinkCentre: 'rgb(255,142,201)',
            pinkEdge: 'rgb(255, 94, 178)',
            greenCentre: 'rgb(150, 220, 160)',
            greenEdge: 'rgb(115, 200, 130)',
            purpleCentre: 'rgb(177, 148, 208)',
            purpleEdge: 'rgb(143, 102, 188)',
        },
        black: '#000000',
        darkestGray: '#333333',
        darkerGray: '#666666',
        darkGray: '#999999',
        gray: '#b2b2b2',
        lightGray: '#e8e8e8',
        lighterGray: '#fafafa',
        white: '#ffffff',
    },
    window.tokens,
);

const SparkTheme = ({ children }) => (
    <ThemeProvider theme={theme}>
        <div>{children}</div>
    </ThemeProvider>
);

SparkTheme.propTypes = {
    children: PropTypes.element.isRequired,
};

export default SparkTheme;
