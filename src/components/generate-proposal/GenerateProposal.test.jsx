import '@testing-library/react/cleanup-after-each';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, wait } from '@testing-library/react';

import React from 'react';
import SparkTheme from '#lib/SparkTheme';
import { createMemoryHistory } from 'history';
import mockApi from '#api';
import GenerateProposal from './GenerateProposal';

jest.mock('#api', () => ({
    __esModule: true,
    default: {
        sendProposalToEmailAddresses: jest.fn(() => Promise.resolve()),
    },
}));

function renderGenerateProposal() {
    const history = createMemoryHistory({ initialEntries: ['/proposal'] });
    const wrapper = render(
        <SparkTheme>
            <GenerateProposal history={history} />
        </SparkTheme>,
    );

    return { ...wrapper, history };
}

test('email adds new email addresses', () => {
    const { getAllByPlaceholderText, getByText } = renderGenerateProposal();

    let inputs = getAllByPlaceholderText('example@spark.co.nz');
    expect(inputs.length).toBe(1);

    const addNewButton = getByText('Add another email');
    fireEvent.click(addNewButton);

    inputs = getAllByPlaceholderText('example@spark.co.nz');
    expect(inputs.length).toBe(2);

    fireEvent.click(addNewButton);

    inputs = getAllByPlaceholderText('example@spark.co.nz');
    expect(inputs.length).toBe(3);
});

test('email input can be changed', () => {
    const { getAllByPlaceholderText, getByText } = renderGenerateProposal();

    const addNewButton = getByText('Add another email');
    fireEvent.click(addNewButton);
    fireEvent.click(addNewButton);

    const inputs = getAllByPlaceholderText('example@spark.co.nz');
    fireEvent.change(inputs[1], { target: { value: 'hello' } });
    expect(inputs[0]).toHaveValue('');
    expect(inputs[1]).toHaveValue('hello');
    expect(inputs[2]).toHaveValue('');
});

test('Error not to show when simply clicking in and out of the input', () => {
    const { getByTestId, queryByTestId } = renderGenerateProposal();
    const input = getByTestId('email-0');
    fireEvent.focus(input);
    fireEvent.blur(input);
    expect(queryByTestId('email-0-error')).toBeNull();
});

test('When entering value without clicking out, no error shows', () => {
    const { getByTestId, queryByTestId } = renderGenerateProposal();
    const input = getByTestId('email-0');
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'hello' } });
    expect(queryByTestId('email-0-error')).toBeNull();
});

test('When entering wrong value and clicks out, error shows', () => {
    const { getByTestId, queryByTestId } = renderGenerateProposal();
    const input = getByTestId('email-0');
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'hello' } });
    fireEvent.blur(input);
    expect(queryByTestId('email-0-error')).toHaveTextContent('Invalid email');
});

test('If you click out first, and then enter wrong value, error shows', () => {
    const { getByTestId, queryByTestId } = renderGenerateProposal();
    const input = getByTestId('email-0');
    fireEvent.focus(input);
    fireEvent.blur(input);
    fireEvent.change(input, { target: { value: 'hello' } });
    expect(queryByTestId('email-0-error')).toHaveTextContent('Invalid email');
});

test('If you enter wrong value and clear it then error disappears', () => {
    const { getByTestId, queryByTestId } = renderGenerateProposal();
    const input = getByTestId('email-0');
    fireEvent.focus(input);
    fireEvent.blur(input);
    fireEvent.change(input, { target: { value: 'hello' } });
    fireEvent.blur(input);
    fireEvent.change(input, { target: { value: '' } });
    expect(queryByTestId('email-0-error')).toBeNull();
});

test('When error is appearing, changing to correct value makes the error go away', () => {
    const { getByTestId, queryByTestId } = renderGenerateProposal();
    const input = getByTestId('email-0');
    fireEvent.focus(input);
    fireEvent.blur(input);
    fireEvent.change(input, { target: { value: 'hello' } });
    fireEvent.change(input, { target: { value: 'spark@spark.co.nz' } });
    expect(queryByTestId('email-0-error')).toBeNull();
});

test('On submission success, input fields are cleared and success message displays', async () => {
    const { getAllByPlaceholderText, getByText } = renderGenerateProposal();
    const addNewButton = getByText('Add another email');
    const sendButton = getByText('Send');
    fireEvent.click(addNewButton);
    fireEvent.click(addNewButton);
    fireEvent.click(addNewButton);
    const inputs = getAllByPlaceholderText('example@spark.co.nz');
    fireEvent.change(inputs[1], { target: { value: 'david@david.com' } });
    fireEvent.change(inputs[2], { target: { value: 'spark@spark.co.nz' } });
    fireEvent.click(sendButton);
    expect(mockApi.sendProposalToEmailAddresses).toHaveBeenCalledTimes(1);
    expect(mockApi.sendProposalToEmailAddresses).toHaveBeenCalledWith({
        recipients: ['david@david.com', 'spark@spark.co.nz'],
    });

    await wait(() => {
        const postSubmitInputs = getAllByPlaceholderText('example@spark.co.nz');
        expect(postSubmitInputs.length).toBe(1);
        getByText('Email(s) sent');
    });
});

test('On submission, input fields are NOT cleared and error message displays', async () => {
    mockApi.sendProposalToEmailAddresses.mockReturnValueOnce(Promise.reject());
    const { getByPlaceholderText, getByText } = renderGenerateProposal();
    const Input = getByPlaceholderText('example@spark.co.nz');
    fireEvent.change(Input, { target: { value: 'spark@spark.co.nz' } });
    const sendButton = getByText('Send');
    fireEvent.click(sendButton);

    await wait(() => {
        getByText("Can't send now. Please try again");
    });
});
