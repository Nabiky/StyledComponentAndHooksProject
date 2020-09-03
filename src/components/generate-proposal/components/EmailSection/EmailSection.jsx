import React, { useMemo, useReducer } from 'react';
import styled from 'styled-components';
import isEmail from 'validator/lib/isEmail';
import { theme } from 'styled-tools';
import uuid from 'uuid';

import api from '#api';

import Button from '#lib/Button';
import Input from '#lib/Input';
import MarginBottomDiv from '#lib/MarginBottomDiv';
import Icon from '#lib/FontIcons';
import * as Text from '#lib/Text';
import Grid from '#lib/Grid';
import GridColumn from '#lib/GridColumn';

import Heading2 from '#shared-components/Heading2';
import Heading2Wrapper from '#shared-components/Heading2Wrapper';

const emailStatuses = {
    NO_STATUS: 'NO_STATUS',
    SENT: 'SENT',
    FAILED: 'FAILED',
};

const initialState = {
    emails: [{
        id: uuid.v4(), value: '', error: '', showError: false,
    }],
    emailStatus: emailStatuses.NO_STATUS,
};

const UPDATE_EMAIL_BY_INDEX = 'UPDATE_EMAIL_BY_INDEX';
const SHOW_ERROR_BY_INDEX = 'SHOW_ERROR_BY_INDEX';
const SHOW_ERROR_FOR_ALL = 'SHOW_ERROR_FOR_ALL';
const ADD_NEW_EMAIL = 'ADD_NEW_EMAIL';
const SHOW_SEND_EMAIL_SUCCESS = 'SHOW_SEND_EMAIL_SUCCESS';
const SHOW_SEND_EMAIL_ERROR = 'SHOW_SEND_EMAIL_ERROR';

const sendEmailFailureMessage = "Can't send now. Please try again";
const sendEmailSuccessMessage = 'Email(s) sent';

function validate(email) {
    return email && !isEmail(email) ? 'Invalid email' : '';
}

function updateArrayAtIndex(array, index, key, value) {
    return array.map((el, i) => (i === index ? ({
        ...el,
        [key]: value,
        error: key === 'value' ? validate(value) : el.error,
    }) : el));
}

function reducer(state, action) {
    switch (action.type) {
        case SHOW_ERROR_BY_INDEX:
            if (state.emails[action.index]) {
                return {
                    ...state,
                    emails: updateArrayAtIndex(state.emails, action.index, 'showError', true),
                };
            }
            return state;
        case SHOW_ERROR_FOR_ALL:
            return {
                ...state,
                emails: state.emails.map(email => ({ ...email, showError: true })),
            };
        case ADD_NEW_EMAIL:
            return {
                emails: [
                    ...state.emails,
                    {
                        id: uuid.v4(),
                        error: '',
                        showError: false,
                        value: '',
                    },
                ],
            };
        case UPDATE_EMAIL_BY_INDEX:
            return {
                ...state,
                emails: updateArrayAtIndex(state.emails, action.index, 'value', action.value),
                emailStatus: emailStatuses.NO_STATUS,
            };
        case SHOW_SEND_EMAIL_SUCCESS:
            return {
                ...initialState,
                emailStatus: emailStatuses.SENT,
            };
        case SHOW_SEND_EMAIL_ERROR:
            return {
                ...state,
                emailStatus: emailStatuses.FAILED,
            };
        default:
            return state;
    }
}

function EmailSection() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const {
        emails, emailStatus,
    } = state;
    const hasEmail = useMemo(() => emails.some(email => email.value.length), [emails]);

    function updateEmail(index, value) {
        dispatch({
            type: UPDATE_EMAIL_BY_INDEX,
            index,
            value,
        });
    }

    function showErrorFor(index) {
        dispatch({
            type: SHOW_ERROR_BY_INDEX,
            index,
        });
    }

    function addEmail() {
        dispatch({
            type: ADD_NEW_EMAIL,
        });
    }

    async function submitEmailList() {
        const isAllEmailValid = emails.every(email => email.error === '');
        const emailsToSend = emails.filter(email => !!email.value).map(email => email.value);

        if (isAllEmailValid) {
            try {
                await api.sendProposalToEmailAddresses({ recipients: emailsToSend });
                dispatch({ type: SHOW_SEND_EMAIL_SUCCESS });
            } catch (error) {
                dispatch({ type: SHOW_SEND_EMAIL_ERROR });
            }
        } else {
            dispatch({ type: SHOW_ERROR_FOR_ALL });
        }
    }

    return (
        <>
            <Heading2Wrapper>
                <Heading2>Would you like to email the proposal?</Heading2>
            </Heading2Wrapper>

            <MarginBottomDiv marginSize={2}>
                {emails.map((email, i) => (
                    <Grid key={email.id}>
                        <GridColumn columns={4}>
                            <Input
                                dataTestId={`email-${i}`}
                                value={email.value}
                                placeholder="example@spark.co.nz"
                                onChange={evt => updateEmail(i, evt.target.value)}
                                error={email.showError ? email.error : ''}
                                onBlur={() => showErrorFor(i)}
                            />
                        </GridColumn>
                    </Grid>
                ))}
            </MarginBottomDiv>

            <MarginBottomDiv>
                <Button noStyle onClick={addEmail}>
                    <Icon name="add-f" marginRight="8px" />
                    <Text.Body2>Add another email</Text.Body2>
                </Button>
            </MarginBottomDiv>

            <MarginBottomDiv marginSize={2}>

                <Button secondary disabled={!hasEmail} onClick={submitEmailList}>
                    Send
                </Button>
            </MarginBottomDiv>

            { emailStatus === emailStatuses.FAILED
                     && <FailedMessage>{sendEmailFailureMessage}</FailedMessage>
            }

            {emailStatus === emailStatuses.SENT
                    && <SuccessMessage>{sendEmailSuccessMessage}</SuccessMessage>
            }
        </>
    );
}

export default EmailSection;

const SuccessMessage = styled(Text.Body2)`
    color: ${theme('text-color.text-green')}
`;

const FailedMessage = styled(Text.Body2)`
    color: ${theme('text-color.text-red')}
`;
