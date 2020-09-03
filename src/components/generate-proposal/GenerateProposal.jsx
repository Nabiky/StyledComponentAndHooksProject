import React from 'react';
import styled from 'styled-components';
import { theme } from 'styled-tools';
import {
    Page,
    MapTo,
    withComponentMappingContext,
} from '@adobe/cq-react-editable-components';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';


import FullWidth from '#lib/FullWidthDiv';

import PageLayoutWrapper from '#shared-components/PageLayoutWrapper';
import SectionWrapper from '#shared-components/SectionWrapper';

import routes from '#constants/pageRoutes';

import DownloadSection from '#generate-proposal/components/DownloadSection';
import EmailSection from '#generate-proposal/components/EmailSection';

function GenerateProposal({ history }) {
    const redirectToDashboardPage = () => history.push(routes.DASHBOARD);
    return (
        <PageLayoutWrapper>
            <SectionWrapper>
                <DownloadSection onDone={redirectToDashboardPage} />
            </SectionWrapper>
            <LightGreyFullSizeDiv as="hr" />
            <SectionWrapper>
                <EmailSection />
            </SectionWrapper>
        </PageLayoutWrapper>
    );
}

GenerateProposal.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    history: PropTypes.object.isRequired,
};


export default class GenerateProposalPage extends Page {
    render() {
        return <GenerateProposal {...this.props} />;
    }
}

MapTo('mysparkdigital/manageddata/components/content/wanproposal')(
    withComponentMappingContext(withRouter(GenerateProposal)),
);

const LightGreyFullSizeDiv = styled(FullWidth)`
    border: 1px solid ${theme('background-color.bg-grey-1')};
    margin-bottom: 40px;
    background: yellow;
`;
