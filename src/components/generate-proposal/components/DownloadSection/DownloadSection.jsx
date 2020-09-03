import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Icon from '#lib/FontIcons';
import Heading1 from '#shared-components/Heading1';
import Heading1Wrapper from '#shared-components/Heading1Wrapper';
import Button, { ButtonGroup } from '#lib/Button';
import * as Text from '#lib/Text';
import Description from '#shared-components/Description';
import downloadProposal from '#utils/downloadProposal';

function DownloadSection({ onDone }) {
    const [pdfMessage, setPdfMessage] = useState('');

    const onDownloadClick = () => {
        setPdfMessage('');
        downloadProposal().catch(() => {
            setPdfMessage('PDF is currently being generated, please try again in 5 minutes');
        });
    };

    return (
        <>
            <Heading1Wrapper>
                <Heading1>Success</Heading1>
                <Description>WAN Proposal generated successfully</Description>
            </Heading1Wrapper>
            <ButtonGroupFlexStart>
                <Button onClick={onDone}>Done</Button>
                <div>
                    <DownloadButton onClick={onDownloadClick}>
                        <Icon name="download-f" marginRight="8px" />
                        Download
                    </DownloadButton>
                    {pdfMessage && <Text.Label1>{pdfMessage}</Text.Label1>}
                </div>
            </ButtonGroupFlexStart>
        </>
    );
}

export default DownloadSection;

DownloadSection.propTypes = {
    onDone: PropTypes.func.isRequired,
};

const DownloadButton = styled(Button)`
    margin-bottom: 8px;
`;

const ButtonGroupFlexStart = styled(ButtonGroup)`
    align-items: flex-start;
`;
