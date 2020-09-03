import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { theme } from 'styled-tools';
import * as Text from '#lib/Text';
import SparkTheme from '#lib/SparkTheme';

export default function BrowserUnsupportedPage() {
    return (
        <SparkTheme>
            <>
                <GlobalStyle />
                <Text.Body1>
                    Internet Explorer not supported.
                    Please use the latest version of Chrome, Firefox or Edge
                </Text.Body1>
            </>
        </SparkTheme>
    );
}

const GlobalStyle = createGlobalStyle`
    body {
        background-color: ${theme('background-color.bg-grey-0')};
        text-align: center;
    }
`;
