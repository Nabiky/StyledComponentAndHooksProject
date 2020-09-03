import React from 'react';
import PropTypes from 'prop-types';
import Input from '#lib/Input';
import Heading2Wrapper from '#shared-components/Heading2Wrapper';
import Heading2 from '#shared-components/Heading2';
import Heading1Wrapper from '#shared-components/Heading1Wrapper';
import Heading1 from '#shared-components/Heading1';
import Grid from '#lib/Grid';
import GridColumn from '#lib/GridColumn';

const TellUsAboutBusiness = ({
    businessName, businessNameHandler, showValidationError, error,
}) => (
    <>
        <Heading1Wrapper>
            <Heading1>Sites</Heading1>
        </Heading1Wrapper>
        <Heading2Wrapper>
            <Heading2>Tell us about your business</Heading2>
        </Heading2Wrapper>
        <Grid>
            <GridColumn columns={5}>
                <Input
                    type="text"
                    dataTextId="businessName"
                    placeholder="What's the business name?"
                    value={businessName}
                    onChange={businessNameHandler}
                    onBlur={() => showValidationError('businessName')}
                    error={error.businessName.show ? error.businessName.description : ''}
                />
            </GridColumn>
        </Grid>
    </>
);

export default TellUsAboutBusiness;

TellUsAboutBusiness.propTypes = {
    businessName: PropTypes.string,
    businessNameHandler: PropTypes.func,
    showValidationError: PropTypes.func,

    error: PropTypes.shape({
        businessName: PropTypes.shape({
            show: PropTypes.bool,
            description: PropTypes.string,
        }),
    }),
};

TellUsAboutBusiness.defaultProps = {
    businessName: '',
    businessNameHandler: () => {},
    showValidationError: () => {},

    error: {
        businessName: {
            show: false,
            description: '',
        },
    },
};
