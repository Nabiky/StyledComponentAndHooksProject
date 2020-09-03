import React from 'react';
import styled from 'styled-components';
import { withProp, theme } from 'styled-tools';
import { transparentize } from 'polished';
import Loader from '#lib/Loader';
import GiantFullScreenDiv from '#lib/GiantFullScreenDiv';

function FullPageLoader(props) {
    return (
        <TransparentOverlay>
            <Loader {...props} />
        </TransparentOverlay>
    );
}

const TransparentOverlay = styled(GiantFullScreenDiv)`
    background-color: ${withProp(theme('background-color.bg-white'), transparentize(0.2))};
    display: flex;
    flex-direction:column;
    justify-content: center;
    align-items: center;
`;

export default FullPageLoader;
