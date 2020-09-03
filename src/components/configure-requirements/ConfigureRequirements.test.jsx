import '@testing-library/jest-dom/extend-expect';
import '@testing-library/react/cleanup-after-each';
import React from 'react';
import {
    render, fireEvent, wait, waitForElement,
} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import SparkTheme from '#lib/SparkTheme';
import mockApi from '#api';

import ConfigureRequirements from './ConfigureRequirements';

const mockAddressSearch = {
    retrieveLocationResponse: {
        typeAheadSearch: [
            {
                label: '123 Queen Street East, Hastings 4122',
                elid: '301665902',
                term: '123 queen',
                unVerified: 'N',
            },
            {
                label: '123 Queen Street, Masterton 5810',
                elid: '302175575',
                term: '123 queen',
                unVerified: 'N',
            },
        ],
        businessResult: {
            success: 'Y',
        },
    },
};

const mockSitePreferenceRetrieveValues = {
    businessName: '',
    sitesCount: 20,
    sitesConfiguration: [
        {
            elid: '302246599',
            address: '302246599',
        },
    ],
    possibleValues: {
        bandwidths: [
            {
                value: 30,
                unit: 'mbps',
            },
            {
                value: 20,
                unit: 'mbps',
            },
            {
                value: 10,
                unit: 'mbps',
            },
        ],
        workingHours: ['24/7', '14/7'],
        diversities: ['PHYSICAL', 'MOBILE', 'NO'],
        siteTypes: ['HEAD_OFFICE', 'SITE', 'DATA_CENTRE'],
    },
};

const mockAuthorableProp = {
    workingHours: [
        {
            workingHrsKey: '24/7',
            workingHrsValue: '24 hrs / 7d',
        },
        {
            workingHrsKey: '14/7',
            workingHrsValue: '14 hrs / 7d',
        },
    ],
    diversity: [
        {
            diversityKey: 'PHYSICAL',
            diversityValue: 'Physical',
        },
        {
            diversityKey: 'MOBILE',
            diversityValue: 'Mobile',
        },
        {
            diversityKey: 'NO',
            diversityValue: 'No',
        },
    ],
    bandwidthMultiplier: 2.5,
    siteTypes: [
        {
            siteKey: 'HEAD_OFFICE',
            siteValue: 'Head office',
        },
        {
            siteKey: 'SITE',
            siteValue: 'Site',
        },
        {
            siteKey: 'DATA_CENTRE',
            siteValue: 'Data centre',
        },
    ],
};

jest.mock('#api', () => ({
    __esModule: true,
    default: {
        sitePreferenceRetrieve: jest.fn(() => Promise.resolve({
            data: mockSitePreferenceRetrieveValues,
        })),
        getAddressTypeahead: jest.fn(() => Promise.resolve({
            data: mockAddressSearch,
        })),
        deleteSite: jest.fn(() => Promise.resolve()),
    },
}));

afterEach(() => {
    mockApi.sitePreferenceRetrieve.mockClear();
    mockApi.getAddressTypeahead.mockClear();
    mockApi.deleteSite.mockClear();
});

function renderComponent() {
    const history = createMemoryHistory({ initialEntries: ['/proposal'] });
    const wrapper = render(
        <SparkTheme>
            <ConfigureRequirements history={history} {...mockAuthorableProp} />
        </SparkTheme>,
    );

    return { ...wrapper, history };
}

test('There should be no snackbar if no address is entered', async () => {
    mockApi.sitePreferenceRetrieve.mockReturnValueOnce(
        Promise.resolve({
            data: {
                ...mockSitePreferenceRetrieveValues,
                sitesConfiguration: [],
            },
        }),
    );
    const { queryByText } = renderComponent();
    await wait(() => {
        const submitButton = queryByText('Submit');
        expect(submitButton).toBe(null);
    });
});

test('Business name is required', async () => {
    const {
        getByText, getByPlaceholderText, queryByText, getAllByText,
    } = renderComponent();

    await wait(() => {
        const SubmitButton = getByText('Submit');
        const BusinessNameField = getByPlaceholderText("What's the business name?");

        fireEvent.click(SubmitButton);
        getByText('Business name required');

        const requiredFields = getAllByText('Required');
        expect(requiredFields.length).toBe(4);

        fireEvent.change(BusinessNameField, { target: { value: 'my business' } });
        expect(BusinessNameField.value).toBe('my business');
        expect(queryByText('Business name required')).toBe(null);
    });
});

test('Can handle null business name value', async () => {
    mockApi.sitePreferenceRetrieve.mockReturnValueOnce(
        Promise.resolve({
            data: {
                ...mockSitePreferenceRetrieveValues,
                businessName: null,
            },
        }),
    );

    const { getByText } = renderComponent();
    await wait(() => {
        const SubmitButton = getByText('Submit');
        fireEvent.click(SubmitButton);
        getByText('Business name required');
    });
});

test('There should be one empty row if the api returns no rows', async () => {
    mockApi.sitePreferenceRetrieve.mockReturnValueOnce(
        Promise.resolve({
            data: {
                ...mockSitePreferenceRetrieveValues,
                sitesConfiguration: [],
            },
        }),
    );
    const { getByPlaceholderText, getAllByTestId } = renderComponent();

    await wait(() => {
        const sites = getAllByTestId('site-table-row');
        const addressInput = getByPlaceholderText('Enter site address');
        expect(sites.length).toBe(1);
        expect(addressInput.value).toBe('');
    });
});

test('We should be able to add multiple rows', async () => {
    const { getByText, getAllByTestId } = renderComponent();

    await wait(() => {
        const sites = getAllByTestId('site-table-row');
        const AddButton = getByText('Add a new site');
        fireEvent.click(AddButton);
        fireEvent.click(AddButton);
        fireEvent.click(AddButton);

        expect(sites.length).toBe(4);
    });
});

test('Address input field can changed', async () => {
    mockApi.sitePreferenceRetrieve.mockReturnValueOnce(
        Promise.resolve({
            data: {
                ...mockSitePreferenceRetrieveValues,
                sitesConfiguration: [],
            },
        }),
    );

    const { getByPlaceholderText } = renderComponent();

    await wait(() => {
        const inputField = getByPlaceholderText('Enter site address');
        fireEvent.change(inputField, { target: { value: 'bob' } });
        expect(inputField.value).toEqual('bob');
    });
});

test('Address input field can change be cleared', async () => {
    mockApi.sitePreferenceRetrieve.mockReturnValueOnce(
        Promise.resolve({
            data: {
                ...mockSitePreferenceRetrieveValues,
                sitesConfiguration: [],
            },
        }),
    );

    const { getByPlaceholderText, getByTitle } = renderComponent();

    await wait(() => {
        const inputField = getByPlaceholderText('Enter site address');
        fireEvent.change(inputField, { target: { value: 'bob' } });
        const clearInputIcon = getByTitle('Clear input');
        fireEvent.click(clearInputIcon);
        expect(inputField.value).toEqual('');
    });
});

test('When there are sites from the backend, the address field is a pill, and no input field', async () => {
    const { queryByPlaceholderText } = renderComponent();
    await wait(() => {
        const address = queryByPlaceholderText('Enter site address');
        expect(address).toBe(null);
    });
});

test('Address field turns into a un-editable pill when filled, and turns back to input field when cleared', async () => {
    const {
        getByPlaceholderText,
        getByTitle,
    } = renderComponent();
    await wait(async () => {
        const clearAddressIcon = getByTitle('Clear address field');
        await wait(async () => {
            fireEvent.click(clearAddressIcon);
            const inputField = getByPlaceholderText('Enter site address');
            fireEvent.change(inputField, { target: { value: '123 Queen' } });
            expect(inputField.value).toEqual('123 Queen');
        });
    });
});

test('Changing address in one row doesnt affect the other row', async () => {
    mockApi.sitePreferenceRetrieve.mockReturnValueOnce(
        Promise.resolve({
            data: {
                ...mockSitePreferenceRetrieveValues,
                businessName: null,
            },
        }),
    );

    const { getByText, getAllByPlaceholderText } = renderComponent();
    await wait(() => {
        const AddButton = getByText('Add a new site');
        fireEvent.click(AddButton);
        const InputFields = getAllByPlaceholderText('Enter site address');
        fireEvent.change(InputFields[0], { target: { value: 'bob' } });
        expect(InputFields[0].value).toBe('bob');
        expect(InputFields[1].value).toBe('');

        fireEvent.change(InputFields[1], { target: { value: 'lisa' } });
        expect(InputFields[0].value).toBe('bob');
        expect(InputFields[1].value).toBe('lisa');
    });
});

test('Changing dropdown in one row doesnt affect the other row', async () => {});

test('Entering invalid address shows error message', async () => {
    const { getByText, getByPlaceholderText } = renderComponent();
    await wait(() => {
        const addButton = getByText('Add a new site');

        fireEvent.click(addButton);

        const inputField = getByPlaceholderText('Enter site address');
        fireEvent.change(inputField, { target: { value: 'asdfgea' } });
        fireEvent.blur(inputField);
        getByText(
            'Please selecte a valid address from dropdown. Otherwise this address will be ignored.',
        );
    });
});

test('Entering invalid username shows error message', async () => {
    const { getByText, getByPlaceholderText } = renderComponent();
    await wait(() => {
        const userCount = getByPlaceholderText('Users');
        fireEvent.change(userCount, { target: { value: 'asdfgea' } });
        fireEvent.blur(userCount);
        getByText('Number only');
    });
});

test('The correct message appears in the tool tip', async () => {
    const { getByTitle, getByText } = renderComponent();
    await wait(() => {
        const toolTip = getByTitle('tooltip');
        fireEvent.click(toolTip);
        getByText('Wireless backup - provides access over a mobile connection when access over the fixed connection fails.');
        getByText('High Availability – is the fixed option, providing a secondary access for failover into a customer’s site.');
    });
});
