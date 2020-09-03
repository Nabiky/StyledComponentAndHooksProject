import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, wait } from '@testing-library/react';
import '@testing-library/react/cleanup-after-each';
import React from 'react';
import _ from 'lodash';

import SparkTheme from '#lib/SparkTheme';
import Dashboard from './Dashboard';
import mockApi from '#api';

const mockUserQuotesRetrieve = {
    statusCode: 200,
    redirectUrl: null,
    messages: [
        {
            code: '2000',
            description: 'Operation completed successfully',
            title: null,
            type: 'SUCCESS',
        },
    ],
    userQuotes: [
        {
            cartId: 'ONL0043018121',
            businessName: 'business1',
            createdDate: '2019-06-15',
            stage: 'READY',
        },
        {
            cartId: 'ONL0043018106',
            businessName: 'business2',
            createdDate: '2019-06-16',
            stage: 'READY',
        },
        {
            cartId: 'ONL0043018101',
            businessName: 'business3',
            createdDate: '2019-06-18',
            stage: 'DRAFT',
        },
    ],
    successful: true,
};

jest.mock('#api', () => ({
    __esModule: true,
    default: {
        userQuotesRetrieval: jest.fn(() => Promise.resolve({
            data: mockUserQuotesRetrieve,
        })),
        userQuoteDelete: jest.fn(() => Promise.resolve()),
    },
}));

afterEach(() => {
    mockApi.userQuotesRetrieval.mockClear();
});

function renderDashboard() {
    return render(
        <SparkTheme>
            <Dashboard />
        </SparkTheme>,
    );
}

test('It shows a spinner when loading', () => {
    const { getByText } = renderDashboard();
    getByText('loading...');
});

test('It lists all the proposals after loading', async () => {
    const { getByText } = renderDashboard();
    await wait(() => {
        const businesses = mockUserQuotesRetrieve.userQuotes.map(quote => getByText(quote.businessName));
    });
});

test('Search works', async () => {
    const { getByTitle, getByPlaceholderText, queryByText } = renderDashboard();
    await wait(() => {
        const searchIcon = getByTitle('search');
        fireEvent.click(searchIcon);
        const input = getByPlaceholderText('Search');
        fireEvent.change(input, { target: { value: 'business3' } });
        expect(queryByText('business1')).toBe(null);
        expect(queryByText('business2')).toBe(null);
    });
});

test('Search works with dates', async () => {
    const { getByTitle, getByPlaceholderText, queryByText } = renderDashboard();
    await wait(() => {
        const searchIcon = getByTitle('search');
        fireEvent.click(searchIcon);
        const input = getByPlaceholderText('Search');
        fireEvent.change(input, { target: { value: '06-18' } });
        expect(queryByText('business1')).toBe(null);
        expect(queryByText('business2')).toBe(null);
    });
});

test('If no data is present, it will say so', async () => {
    const {
        getByTitle, getByText, getByPlaceholderText, queryByText,
    } = renderDashboard();
    await wait(() => {
        const searchIcon = getByTitle('search');
        fireEvent.click(searchIcon);
        const input = getByPlaceholderText('Search');
        fireEvent.change(input, { target: { value: 'abc' } });
        getByText('No data');
        expect(queryByText('business1')).toBe(null);
        expect(queryByText('business2')).toBe(null);
        expect(queryByText('business3')).toBe(null);
    });
});

test('There are the right number of icons', async () => {
    const {
        getAllByLabelText,
    } = renderDashboard();
    await wait(() => {
        const downloadIcons = getAllByLabelText('download proposal');
        const editIcons = getAllByLabelText('edit proposal');
        const removeIcons = getAllByLabelText('delete proposal');

        expect(downloadIcons.length).toBe(2);
        expect(editIcons.length).toBe(3);
        expect(removeIcons.length).toBe(3);
    });
});

test('Clicking on the remove icon opens a confirmation dialogue', async () => {
    const {
        getAllByLabelText,
        getByText,
    } = renderDashboard();
    await wait(() => {
        const removeIcons = getAllByLabelText('delete proposal');
        fireEvent.click(removeIcons[0]);
        getByText('Delete Proposal?');
        getByText('Are you sure you want to delete this proposal?');
    });
});

test('Confirmation dialogue for deleting proposal can be dismissed', async () => {
    const {
        getAllByLabelText,
        getByText,
        queryByText,
    } = renderDashboard();
    await wait(() => {
        const removeIcons = getAllByLabelText('delete proposal');
        fireEvent.click(removeIcons[0]);
        fireEvent.click(getByText('No'));
        const confirmationDialogueTitle = queryByText('Delete Proposal?');
        expect(confirmationDialogueTitle).not.toBeInTheDocument();
    });
});

test('Confirmation dialogue triggers a deletion api and another retrieval api call', async () => {
    const {
        getAllByLabelText,
        getByText,
        queryByText,
    } = renderDashboard();
    await wait(async () => {
        expect(queryByText('business1')).toBeInTheDocument();
        const removeIcons = getAllByLabelText('delete proposal');
        fireEvent.click(removeIcons[0]);
        const confirmationDialogueTitle = queryByText('Delete Proposal?');
        mockApi.userQuotesRetrieval.mockReturnValueOnce(
            Promise.resolve({
                data: {
                    ...mockUserQuotesRetrieve,
                    userQuotes: mockUserQuotesRetrieve.userQuotes.slice(1, 4),
                },
            }),
        );
        fireEvent.click(getByText('Yes'));
        await wait(() => {
            expect(confirmationDialogueTitle).not.toBeInTheDocument();
            expect(queryByText('business1')).not.toBeInTheDocument();
            expect(queryByText('business2')).toBeInTheDocument();
            expect(queryByText('business3')).toBeInTheDocument();
            expect(mockApi.userQuoteDelete.mock.calls.length).toBe(1);
            expect(mockApi.userQuotesRetrieval.mock.calls.length).toBe(2);
        });
    });
});
