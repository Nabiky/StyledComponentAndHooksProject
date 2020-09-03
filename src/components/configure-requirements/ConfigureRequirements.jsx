import React from 'react';
import { ThemeProvider } from 'styled-components';
import { withRouter } from 'react-router-dom';
import { Page, MapTo, withComponentMappingContext } from '@adobe/cq-react-editable-components';
import { getTheme } from '#constants/styleConstants';
import AddSites from './pages/AddSites';
import SparkTheme from '#lib/SparkTheme/SparkTheme';
import PageLayoutWrapper from '#shared-components/PageLayoutWrapper';
import routes from '#constants/pageRoutes';

import KeyDisplayStringContext from './KeyDisplayStringContext';

export default class ConfigureRequirements extends Page {
    constructor(props) {
        super(props);

        const tempKeyDisplayStringMap = {};

        props.diversity.forEach((mapping) => {
            tempKeyDisplayStringMap[mapping.diversityKey] = mapping.diversityValue;
        });

        props.siteTypes.forEach((mapping) => {
            tempKeyDisplayStringMap[mapping.siteKey] = mapping.siteValue;
        });

        props.workingHours.forEach((mapping) => {
            tempKeyDisplayStringMap[mapping.workingHrsKey] = mapping.workingHrsValue;
        });

        this.keyDisplayStringMap = tempKeyDisplayStringMap;
    }

    redirectToRecommendationPage = () => this.props.history.push(routes.RECOMMENDATION);

    redirectToDashboardPage = () => this.props.history.push(routes.DASHBOARD);

    render() {
        return (
            <SparkTheme>
                <ThemeProvider theme={getTheme()}>
                    <KeyDisplayStringContext.Provider value={this.keyDisplayStringMap}>
                        <PageLayoutWrapper>
                            <AddSites
                                redirectAfterSubmission={this.redirectToRecommendationPage}
                                redirectAfterCancelSubmission={this.redirectToDashboardPage}
                            />
                        </PageLayoutWrapper>
                    </KeyDisplayStringContext.Provider>
                </ThemeProvider>
            </SparkTheme>
        );
    }
}

MapTo('mysparkdigital/manageddata/components/content/sites')(
    withComponentMappingContext(withRouter(ConfigureRequirements)),
);
