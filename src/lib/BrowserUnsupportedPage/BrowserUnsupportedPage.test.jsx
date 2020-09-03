import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, wait } from '@testing-library/react';
import '@testing-library/react/cleanup-after-each';
import React from 'react';

import SparkTheme from '#lib/SparkTheme';
import BrowserUnsupportedPage from './BrowserUnsupportedPage';

function renderDashboard() {
    return render(
        <SparkTheme>
            <BrowserUnsupportedPage />
        </SparkTheme>,
    );
}

test('it works', () => {
    renderDashboard();
});
