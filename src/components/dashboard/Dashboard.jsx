import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { DateTime } from 'luxon';
import { theme } from 'styled-tools';
import { Page, MapTo, withComponentMappingContext } from '@adobe/cq-react-editable-components';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import PropTypes from 'prop-types';

import Heading1 from '#shared-components/Heading1';
import Heading1Wrapper from '#shared-components/Heading1Wrapper';
import PageLayoutWrapper from '#shared-components/PageLayoutWrapper';
import SectionWrapper from '#shared-components/SectionWrapper';
import FullPageLoader from '#shared-components/FullPageLoader';

import api from '#api';
import * as Text from '#lib/Text';
import Button from '#lib/Button';
import SearchBar from '#lib/SearchBar';
import FailureMessage from '#lib/FailureMessage';
import ConfirmRejectPopup from '#lib/ConfirmRejectPopup';

import { PAGE_LOADING, PAGE_FAILED, PAGE_LOADED } from '#constants/pageLoadingStatus';
import FALLBACK_ERROR_MESSAGE from '#constants/fallbackErrorMessage';
import routes from '#constants/pageRoutes';

import ProposalTableContainer from './components/ProposalTableContainer';

import downloadProposal from '#utils/downloadProposal';

function Dashboard({ history }) {
    const [quotes, setQuotes] = useState([]);
    const [loadingStatus, setLoadingStatus] = useState(PAGE_LOADING);
    const [pageErrorMessage, setPageErrorMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = useState(false);
    const [proposalToDeleteId, setProposalToDeleteId] = useState();

    const redirectToSitesPage = () => {
        history.push(routes.ADD_SITES);
    };

    const setFullPageError = (err) => {
        const errorMessage = _.get(
            err,
            'response.data.messages[0].description',
            FALLBACK_ERROR_MESSAGE,
        );
        setLoadingStatus(PAGE_FAILED);
        setPageErrorMessage(errorMessage);
    };

    const getListOfQuotes = async () => {
        try {
            const userQuotes = await api.userQuotesRetrieval();
            const { userQuotes: allQuotes } = userQuotes.data;

            setQuotes(allQuotes.map((quote) => {
                const createdDateObj = DateTime.fromISO(_.toString(quote.createdDate));
                return {
                    ...quote,
                    createdDate: createdDateObj.toFormat('dd-MM-yyyy'),
                    createdDateObj,
                };
            }));
            setLoadingStatus(PAGE_LOADED);
        } catch (err) {
            setFullPageError(err);
        }
    };

    const editProposal = async (quoteId) => {
        try {
            setLoadingStatus(PAGE_LOADING);
            await api.userQuoteRestore({ quoteId });
            setLoadingStatus(PAGE_LOADED);
            redirectToSitesPage();
        } catch (err) {
            setFullPageError(err);
        }
    };

    const deleteProposal = async (quoteId) => {
        try {
            setLoadingStatus(PAGE_LOADING);
            await api.userQuoteDelete({ quoteId });
            setLoadingStatus(PAGE_LOADED);
            getListOfQuotes();
        } catch (err) {
            setFullPageError(err);
        } finally {
            setIsConfirmDeletePopupOpen(false);
        }
    };

    const filteredQuotes = quotes.filter(item => [item.createdDate, item.businessName, item.stage]
        .some(value => _.toString(value).toLowerCase().includes(searchTerm.toLowerCase())));

    const openConfirmDeletePopup = (quoteId) => {
        setProposalToDeleteId(quoteId);
        setIsConfirmDeletePopupOpen(true);
    };

    useEffect(() => { getListOfQuotes(); }, []);

    if (loadingStatus === PAGE_FAILED) {
        return <FailureMessage errorMessage={pageErrorMessage} />;
    }

    return (
        <PageLayoutWrapper>

            <SectionWraperRightAlign>
                <Button primary onClick={() => editProposal('')}>
                    Create new
                </Button>
            </SectionWraperRightAlign>

            <Heading1Wrapper>
                <Heading1>
                    My Proposals
                    <ProposalCount as="span">
                        {`(${filteredQuotes.length})`}
                    </ProposalCount>
                </Heading1>
            </Heading1Wrapper>

            <SearchFilterWrapper>
                <SearchBar
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    onRequestClear={() => setSearchTerm('')}
                />
            </SearchFilterWrapper>

            <SectionWrapper>
                <ProposalTableContainer
                    data={filteredQuotes}
                    downloadProposalForQuote={downloadProposal}
                    editProposal={editProposal}
                    deleteProposal={openConfirmDeletePopup}
                />
            </SectionWrapper>

            <ConfirmRejectPopup
                open={isConfirmDeletePopupOpen}
                title="Delete Proposal?"
                content="Are you sure you want to delete this proposal?"
                onRequestClose={() => setIsConfirmDeletePopupOpen(false)}
                primaryButtonLabel="No"
                onPrimaryClick={() => setIsConfirmDeletePopupOpen(false)}
                secondaryButtonLabel="Yes"
                onSecondaryClick={() => deleteProposal(proposalToDeleteId)}
            />

            {loadingStatus === PAGE_LOADING && <FullPageLoader />}

        </PageLayoutWrapper>
    );
}

Dashboard.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    history: PropTypes.object.isRequired,
};

export default class DashboardPage extends Page {
    render() {
        return <Dashboard {...this.props} />;
    }
}

MapTo('mysparkdigital/manageddata/components/content/dashboard')(
    withComponentMappingContext(withRouter(DashboardPage)),
);

const SectionWraperRightAlign = styled(SectionWrapper)`
    display: flex;
    justify-content: flex-end;
    padding-bottom: 24px;
    border-bottom: 1px solid ${theme('background-color.bg-grey-1')};
`;

const ProposalCount = styled(Text.Body1)`
    color: ${theme('text-color.text-grey-4')};
    margin-left: 8px;
`;

const SearchFilterWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
`;
