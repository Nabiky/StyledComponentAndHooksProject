import React from 'react';
import styled from 'styled-components';
import { theme } from 'styled-tools';
import Popup from '#lib/Popup';
import * as Text from '#lib/Text';
import Button, { ButtonGroup } from '#lib/Button';

interface IProps {
    open: boolean,
    onRequestClose: ()=>{},
    onPrimaryClick?: ()=>{},
    onSecondaryClick?: ()=>{},
    primaryButtonLabel?: string,
    secondaryButtonLabel?: string,
    content?: string,
    title: string,
}


const ConfirmRejectPopup = ({
    open = false,
    onRequestClose,
    onPrimaryClick,
    onSecondaryClick,
    content,
    title,
    primaryButtonLabel,
    secondaryButtonLabel,
}: IProps) => (
    <Popup open={open} onRequestClose={onRequestClose}>
        <Wrapper>
            <TitleWrapper>
                <Title>{title}</Title>
                <UnderLine />
            </TitleWrapper>
            <ParagraphWrapper>
                <Paragraph>{content}</Paragraph>
            </ParagraphWrapper>
            <ButtonGroup>
                { secondaryButtonLabel && (
                    <Button secondary onClick={onSecondaryClick}>
                        {secondaryButtonLabel}
                    </Button>
                )}

                { primaryButtonLabel && (
                    <Button onClick={onPrimaryClick}>
                        {primaryButtonLabel}
                    </Button>
                )}
            </ButtonGroup>
        </Wrapper>
    </Popup>
);

export default ConfirmRejectPopup;

const Title = styled(Text.H3)`
    color: ${theme('mainColorOne')};
    margin-bottom: 8px;
    text-align: left;
`;

const UnderLine = styled.div`
    width: 71px;
    border-bottom: 5px solid;
    color: ${theme('mainColorOne')};
`;

const TitleWrapper = styled.div`
    margin-bottom: 24px;
`;

const ParagraphWrapper = styled.div`
    margin-bottom: 48px;
`;

const Paragraph = styled(Text.Body1)`
    color: ${theme('text-color.text-grey-5')};
    text-align: left;
`;

const Wrapper = styled.div`
    width: 640px;
    display: flex;
    flex-direction: column;
`;
