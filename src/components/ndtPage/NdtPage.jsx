import { Page, MapTo, withComponentMappingContext } from '@adobe/cq-react-editable-components';
import styled from 'styled-components';
import { withRoute } from '../../utils/RouteHelper';
import { desktopContentWidth, media } from '#constants/styleConstants';

class NdtPage extends Page {
    get containerProps() {
        const attrs = super.containerProps;
        attrs.className = `${attrs.className || ''} NdtPage ${this.props.cssClassNames || ''} ${
            this.props.className
        }`;
        return attrs;
    }
}

const StyledPage = styled(NdtPage)`
    max-width: ${desktopContentWidth}px;
    margin: 0 auto;
    padding: 0px;
    width: 100%;
    position: relative;
    box-sizing: border-box;

    ${media.desktopMini} {
        padding: 0px 40px;
    }
    ${media.tablet} {
        padding: 0px 40px;
    }
    ${media.mobile} {
        padding: 0px 24px;
    }
`;

MapTo('spark-common/components/structure/page')(
    withComponentMappingContext(withRoute(StyledPage)),
);
