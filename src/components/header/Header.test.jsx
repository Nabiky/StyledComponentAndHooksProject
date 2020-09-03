import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, wait } from '@testing-library/react';
import '@testing-library/react/cleanup-after-each';
import React from 'react';

import SparkTheme from '#lib/SparkTheme';
import Header from './Header';

const mockProps = {
    title: 'Network Design Tool',
    logoUrl: 'www.mysparkdigital.co.nz',
    logOutUrl: 'https://mysparkdigital.co.nz/vdesk/hangup.php3',
    firstName: 'Bob',
    lastName: 'Dylan',
};

function renderHeader() {
    return render(
        <SparkTheme>
            <Header {...mockProps} />
        </SparkTheme>,
    );
}

test('Display the title of the page', () => {
    const { getByText } = renderHeader();
    getByText('Network Design Tool');
});

test('Expect sign in nav appear when initial circle clicked', () => {
    const { getAllByText, getByText } = renderHeader();
    const initialCircles = getAllByText('BD');
    const fullName = getByText('Bob Dylan');
    const title = getByText('Network Design Tool');

    expect(initialCircles[0]).toBeVisible();
    expect(initialCircles[1]).not.toBeVisible();
    expect(fullName).not.toBeVisible();

    fireEvent.click(initialCircles[0]);

    expect(initialCircles[0]).toBeVisible();
    expect(initialCircles[1]).toBeVisible();
    expect(fullName).toBeVisible();

    fireEvent.click(initialCircles[0]);

    expect(initialCircles[0]).toBeVisible();
    expect(initialCircles[1]).not.toBeVisible();
    expect(fullName).not.toBeVisible();
});
