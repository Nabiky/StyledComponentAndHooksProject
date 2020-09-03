import "@testing-library/jest-dom/extend-expect";
import { render } from '@testing-library/react';
import '@testing-library/react/cleanup-after-each';
import React from 'react';

import SparkTheme from '#lib/SparkTheme';
import Banner from './Banner';

test('Displays fallback text when no welcome message or name is passed in', () => {
    const { getByText } = render(
        <SparkTheme>
            <Banner />
        </SparkTheme>,
    );

    getByText('<welcomeTitle>');
    getByText('<firstName> <lastName>');
});

test('Displays passed in name and welcome message', () => {
    const { getByText, queryByText } = render(
        <SparkTheme>
            <Banner welcomeTitle="Hi" firstName="Bob" lastName="Smith" />
        </SparkTheme>,
    );

    getByText('Hi');
    getByText('Bob Smith');

    // No Placeholder text displays
    expect(queryByText('<welcomeTitle>')).toBeNull();
    expect(queryByText('<firstName>')).toBeNull();
    expect(queryByText('<lastName>')).toBeNull();
});
