import React from 'react';
import _ from 'lodash';

import GridColumn from '#lib/GridColumn';
import PlaceHolderDiv from '#lib/PlaceHolderDiv';

import ServiceWrapperGrid from '#recommendation/components/ServiceWrapperGrid';

function ServiceLoading() {
    return _.times(3, i => (
        <ServiceWrapperGrid key={i}>
            <GridColumn columns={9}>
                <PlaceHolderDiv width="60%" />
            </GridColumn>

            {_.times(3, j => (
                <GridColumn columns={1} key={j}>
                    <PlaceHolderDiv />
                </GridColumn>
            ))}
        </ServiceWrapperGrid>
    ));
}

export default ServiceLoading;
