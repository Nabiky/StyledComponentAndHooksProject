import styled, { css } from 'styled-components';
import { fonts, media } from '#constants/styleConstants';

const basicTextStyles = css`
    padding: 0;
    margin: 0;
`;

const { DemiBold, Regular, Medium } = fonts;

export const Display1 = styled.h1`
    ${basicTextStyles};
    ${DemiBold};

    font-size: 72px;

    ${media.desktopMini} {
        font-size: 64px;
    }

    ${media.tablet} {
        font-size: 56px;
    }

    ${media.mobile} {
        font-size: 48px;
    }
`;

export const Display2 = styled.h1`
    ${basicTextStyles};
    ${DemiBold};

    font-size: 96px;

    ${media.desktopMini} {
        font-size: 80px;
    }

    ${media.tablet} {
        font-size: 72px;
    }

    ${media.mobile} {
        font-size: 64px;
    }
`;

export const H1 = styled.h1`
    ${basicTextStyles};
    ${DemiBold};

    font-size: 48px;
    line-height: 1.25;

    ${media.tablet} {
        font-size: 40px;
        line-height: 1.25;
    }
`;

export const H2 = styled.h2`
    ${basicTextStyles};
    ${DemiBold};

    font-size: 38px;
    line-height: 1.25;

    ${media.tablet} {
        font-size: 32px !important;
        line-height: 1.25;
    }

    ${media.mobile} {
        font-size: 24px !important;
    }
`;

export const H3 = styled.h3`
    ${basicTextStyles};
    ${DemiBold};

    font-size: 30px;
    line-height: 1.25;

    ${media.tablet} {
        font-size: 24px;
        line-height: 1.25;
    }
`;

export const H4 = styled.h4`
    ${basicTextStyles};
    ${DemiBold};

    font-size: 24px;
    line-height: 1.25;

    ${media.tablet} {
        font-size: 18px;
        line-height: 1.25;
    }
`;

export const H5 = styled.h5`
    ${basicTextStyles};
    ${DemiBold};

    font-size: 22px;
    line-height: 1.25;

    ${media.tablet} {
        font-size: 16px;
        line-height: 1.25;
    }
`;

export const Body1 = styled.p`
    ${basicTextStyles};
    ${Medium};
    font-size: 16px;
    line-height: 1.4;

    ${media.tablet} {
        font-size: 14px;
        line-height: 1.4;
    }
`;

export const Body2 = styled.p`
    ${basicTextStyles};
    ${DemiBold};

    font-size: 16px;
    line-height: 1.4;

    ${media.tablet} {
        font-size: 14px;
        line-height: 1.4;
    }
`;

export const Caption1 = styled.p`
    ${basicTextStyles};
    ${Medium};

    font-size: 14px;
    line-height: 1.4;

    ${media.tablet} {
        font-size: 12px;
        line-height: 1.4;
    }
`;

export const Caption2 = styled.p`
    ${basicTextStyles};
    ${DemiBold};

    font-size: 14px;
    line-height: 1.4;

    ${media.tablet} {
        font-size: 12px;
        line-height: 1.4;
    }
`;

export const Caption3 = styled.p`
    ${basicTextStyles};
    ${Regular};

    font-size: 14px;
    line-height: 1.4;

    ${media.tablet} {
        font-size: 12px;
        line-height: 1.4;
    }
`;

export const Label1 = styled.p`
    ${basicTextStyles};
    ${DemiBold};

    font-size: 12px;
    line-height: 1.4;
`;

export const Label2 = styled.p`
    ${basicTextStyles};
    ${Medium};

    font-size: 12px;
    line-height: 1.4;
`;
