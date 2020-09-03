import React, { Component } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import SiteTableSection from '#configure-requirements/components/SiteTableSection';
import TellusAboutBusinessSection from '../components/TellUsAboutBusiness';

import SnackBar from '#lib/SnackBar/SnackBar';
import Button, { ButtonGroup } from '#lib/Button/Button';
import { media } from '#constants/styleConstants';
import FailureMessage from '#lib/FailureMessage';
import ConfirmRejectPopup from '#lib/ConfirmRejectPopup';

import SectionWrapper from '#shared-components/SectionWrapper';
import FullPageLoader from '#shared-components/FullPageLoader';

import api from '#api';
import { PAGE_LOADING, PAGE_FAILED, PAGE_LOADED } from '#constants/pageLoadingStatus';
import FALLBACK_ERROR_MESSAGE from '#constants/fallbackErrorMessage';
import Icon from '#lib/FontIcons';
import * as Text from '#lib/Text';

const tempPrefix = 'temp-';

const errorTemplate = {
    address: { description: '', show: false },
    users: { description: '', show: false },
    bandwidth: { description: '', show: false },
    workingHours: { description: '', show: false },
    diversity: { description: '', show: false },
    siteType: { description: '', show: false },
};

function makeEmptySite() {
    return {
        address: '',
        elid: `${tempPrefix}${uuid.v4()}`,
        errorInfo: {
            ...errorTemplate,
        },
        users: '',
        workingHours: '',
        diversity: '',
        siteType: '',
        bandwidth: {},
    };
}

class AddSites extends Component {
    state = {
        businessName: '',
        loadingStatus: PAGE_LOADING,
        pageErrorMessage: '',
        isErrorPopupOpen: false,
        addressTypeAheadArray: [],
        sitesConfiguration: [],
        possibleValues: {},
        isConfirmDeletePopupOpen: false,
        elidToDelete: '',
        errorPopupMessage: '',
        isCancelPopupOpen: false,
        error: {
            businessName: {
                show: false,
                description: '',
            },
        },
    };

    componentDidMount() {
        api.sitePreferenceRetrieve()
            .then(({ data }) => {
                const sitesArray = data.sitesConfiguration.length > 0
                    ? data.sitesConfiguration.map(site => ({ ...makeEmptySite(), ...site }))
                    : [{ ...makeEmptySite(), siteType: data.possibleValues.siteTypes[0] }];

                this.setState({
                    loadingStatus: PAGE_LOADED,
                    businessName: data.businessName,
                    sitesConfiguration: sitesArray,
                    possibleValues: data.possibleValues,
                });
            })
            .catch(err => this.setState({
                loadingStatus: PAGE_FAILED,
                pageErrorMessage: _.get(
                    err,
                    'response.data.messages[0].description',
                    FALLBACK_ERROR_MESSAGE,
                ),
            }));
    }

    businessNameHandler = (e) => {
        const newName = e.target.value;
        this.setState(prevState => ({
            businessName: newName,
            error: {
                ...prevState.error,
                businessName: {
                    ...prevState.error.businessName,
                    description: this.validateValue(newName, 'businessName'),
                },
            },
        }));
    };

    ifElidExist = () => {
        const { sitesConfiguration } = this.state;
        return sitesConfiguration.some(
            site => site.elid && !site.elid.includes(tempPrefix),
        );
    };

    setSiteDropdownValueByType = (value, type, site) => {
        this.setState(prevState => ({
            sitesConfiguration: prevState.sitesConfiguration.map((oldSite) => {
                if (oldSite.elid !== site.elid) {
                    return oldSite;
                }
                return {
                    ...oldSite,
                    [type]: value,
                    errorInfo: {
                        ...oldSite.errorInfo,
                        [type]: {
                            ...oldSite.errorInfo[type],
                            description: this.validateValue(value, type, site.elid),
                        },
                    },
                };
            }),
        }));
    };

    onAddressInputChange = (value, site) => {
        this.setState(prevState => ({
            sitesConfiguration: prevState.sitesConfiguration.map((oldSite) => {
                if (oldSite.elid !== site.elid) {
                    return oldSite;
                }
                return { ...site, address: value };
            }),
        }));
    };

    calculateBandwidthFromUsers = (users, possibleValues) => {
        const possibleBandwidthsValues = possibleValues.bandwidths
            .map(el => el.value)
            .sort((a, b) => a - b);
        const MbpsConstant = 1.2;
        const minBandwidthRequired = users * MbpsConstant;
        const maxNumber = Math.max(...possibleBandwidthsValues);

        if (Number.isNaN(Number(users))) {
            return {};
        }

        const bandwidhtUnit = possibleValues.bandwidths[0].unit;

        if (minBandwidthRequired >= maxNumber) {
            return {
                value: maxNumber,
                unit: bandwidhtUnit,
            };
        }
        return {
            value: possibleBandwidthsValues.find(e => e > minBandwidthRequired),
            unit: bandwidhtUnit,
        };
    };

    onUserCountChange = (Inputvalue, site) => {
        this.setState(prevState => ({
            sitesConfiguration: prevState.sitesConfiguration.map((oldSite) => {
                if (oldSite.elid !== site.elid) {
                    return oldSite;
                }

                const userError = this.validateValue(Inputvalue, 'users', site.elid);

                const newBandwidth = userError
                    ? {}
                    : this.calculateBandwidthFromUsers(Inputvalue, prevState.possibleValues);

                return {
                    ...oldSite,
                    users: Inputvalue,
                    bandwidth: newBandwidth,
                    errorInfo: {
                        ...oldSite.errorInfo,
                        users: {
                            ...oldSite.errorInfo.users,
                            description: userError,
                        },
                        bandwidth: {
                            ...oldSite.errorInfo.bandwidth,
                            description: this.validateValue(newBandwidth, 'bandwidth', site.elid),
                        },
                    },
                };
            }),
        }));
    };

    onAddressSuggestion = (suggestion, site) => {
        const { sitesConfiguration } = this.state;

        const elidIsTaken = sitesConfiguration.some(
            el => el.elid && el.elid.includes(suggestion.elid),
        );

        if (elidIsTaken) {
            this.setState({
                sitesConfiguration: sitesConfiguration.map((oldSite) => {
                    if (oldSite.elid !== site.elid) {
                        return oldSite;
                    }
                    return {
                        ...oldSite,
                        errorInfo: {
                            ...oldSite.errorInfo,
                            address: {
                                description:
                                    'Address already selected, you can add more products in recommendation page',
                                show: true,
                            },
                        },
                    };
                }),
            });
        } else {
            this.setState(prevState => ({
                sitesConfiguration: prevState.sitesConfiguration.map((oldSite) => {
                    if (oldSite.elid !== site.elid) {
                        return oldSite;
                    }

                    return {
                        ...site,
                        elid: suggestion.elid,
                        address: suggestion.label,
                        errorInfo: { ...errorTemplate },
                    };
                }),
            }));

            api.siteOffersAvailability({
                elid: suggestion.elid,
                address: suggestion.label,
                requestType: 'TRIGGER',
            });
        }
    };


    clearAddressTypeAhead = () => {
        this.setState({ addressTypeAheadArray: [] });
    };

    validateAllSites = () => {
        const { sitesConfiguration } = this.state;

        const FieldsValidation = sitesConfiguration.map((site) => {
            const validatedErrorInfo = {
                address: {
                    description: this.validateValue(site.address, 'address', site.elid),
                    show: true,
                },
                users: {
                    description: this.validateValue(site.users, 'users', site.elid),
                    show: true,
                },
                bandwidth: {
                    description: this.validateValue(site.bandwidth, 'bandwidth', site.elid),
                    show: true,
                },
                workingHours: {
                    description: this.validateValue(site.workingHours, 'workingHours', site.elid),
                    show: true,
                },
                diversity: {
                    description: this.validateValue(site.diversity, 'diversity', site.elid),
                    show: true,
                },
                siteType: {
                    description: this.validateValue(site.siteType, 'siteType', site.elid),
                    show: true,
                },
            };
            return {
                ...site,
                errorInfo: validatedErrorInfo,
            };
        });

        return FieldsValidation;
    };

    toggleCancelPopup = () => {
        this.setState(prevState => ({
            isCancelPopupOpen: !prevState.isCancelPopupOpen,
        }));
    };

    submitForm = () => {
        const { sitesConfiguration, businessName } = this.state;
        const { redirectAfterSubmission } = this.props;

        const sitesConfigWithUpdatedErrorInfo = this.validateAllSites();
        const businessNameError = {
            description: this.validateValue(businessName, 'businessName'),
            show: true,
        };

        const errorExistInSites = sitesConfigWithUpdatedErrorInfo.some(
            site => !site.elid.includes(tempPrefix)
                && Object.values(site.errorInfo).some(error => error.description),
        );

        if (errorExistInSites || businessNameError.description) {
            this.setState(prevState => ({
                error: {
                    ...prevState.error,
                    businessName: businessNameError,
                },
                sitesConfiguration: sitesConfigWithUpdatedErrorInfo,
            }));
        } else {
            const sitesToSend = sitesConfiguration.filter(site => !site.elid.includes(tempPrefix));

            const sitesToSendWithoutError = sitesToSend.map(element => ({
                ...element,
                errorInfo: undefined,
            }));
            const dataToSubmit = {
                businessName,
                sitesCount: sitesToSend.length,
                sitesConfiguration: sitesToSendWithoutError,
            };
            this.setState({ loadingStatus: PAGE_LOADING });
            api.sitePreferenceSubmit(dataToSubmit)
                .then(redirectAfterSubmission)
                .catch((err) => {
                    this.toogleErrorMessagePopup();
                    this.setState({
                        loadingStatus: PAGE_LOADED,
                        errorPopupMessage: _.get(
                            err,
                            'response.data.messages[0].description',
                            FALLBACK_ERROR_MESSAGE,
                        ),
                    });
                });
        }
    };

    validateValue = (value, type, elid = '') => {
        if (type === 'address' && elid.includes('temp') && value) {
            return 'Please selecte a valid address from dropdown. Otherwise this address will be ignored.';
        }

        if (elid.includes('temp')) {
            return '';
        }

        switch (type) {
            case 'businessName':
                if (value && value.length > 1) {
                    return '';
                }
                if (value) {
                    return 'Please enter a valid business name';
                }
                return 'Business name required';
            case 'users':
                if (/^([0-9])*$/.test(value)) {
                    return '';
                }
                if (value) {
                    return 'Number only';
                }
                return '';
            case 'bandwidth':
                if (value && value.value) {
                    return '';
                }
                return 'Required';
            case 'siteType':
            case 'diversity':
            case 'workingHours':
                if (value) {
                    return '';
                }
                return 'Required';
            default:
                return '';
        }
    };

    showValidationError = (type, elid) => {
        if (type === 'businessName') {
            this.setState(prevState => ({
                error: {
                    businessName: {
                        description: this.validateValue(prevState.businessName, 'businessName'),
                        show: true,
                    },
                },
            }));
        } else {
            this.setState(prevState => ({
                sitesConfiguration: prevState.sitesConfiguration.map((oldSite) => {
                    if (oldSite.elid !== elid) {
                        return oldSite;
                    }
                    return {
                        ...oldSite,
                        errorInfo: {
                            ...oldSite.errorInfo,
                            [type]: {
                                description: this.validateValue(oldSite[type], type, oldSite.elid),
                                show: true,
                            },
                        },
                    };
                }),
            }));
        }
    };

    toogleErrorMessagePopup = () => {
        this.setState(prevState => ({
            isErrorPopupOpen: !prevState.isErrorPopupOpen,
        }));
    };

    ConfirmDeleteOpenPopup = seletedElid => this.setState(prevState => ({
        isConfirmDeletePopupOpen: !prevState.isConfirmDeletePopupOpen,
        elidToDelete: seletedElid,
    }));

    ConfirmDeleteClosePopup = () => this.setState(prevState => ({
        isConfirmDeletePopupOpen: !prevState.isConfirmDeletePopupOpen,
    }));

    removeRowFromState = (elid) => {
        const isNotElid = item => item.elid !== elid;
        this.setState(prevState => ({
            ...prevState,
            sitesConfiguration: prevState.sitesConfiguration.filter(isNotElid),
        }));
    };

    onRowDelete = (selectedElidToDelete) => {
        if (!selectedElidToDelete.includes('temp')) {
            this.ConfirmDeleteOpenPopup(selectedElidToDelete);
        } else {
            this.removeRowFromState(selectedElidToDelete);
        }
    };

    onConfirmRowDelete = (elidToDelete) => {
        api.deleteSite({ elid: elidToDelete })
            .then(() => {
                this.removeRowFromState(elidToDelete);
                this.ConfirmDeleteClosePopup();
            })
            .catch((err) => {
                this.ConfirmDeleteClosePopup();
                this.toogleErrorMessagePopup();
                this.setState({
                    errorPopupMessage: _.get(
                        err,
                        'response.data.messages[0].description',
                        FALLBACK_ERROR_MESSAGE,
                    ),
                });
            });
    };

    onAddressValueClear = async (elidToClear) => {
        const isTempElid = elidToClear.includes('temp');
        if (!isTempElid) {
            await api.deleteSite({ elid: elidToClear });
        }

        this.setState(prevState => ({
            sitesConfiguration: prevState.sitesConfiguration.map((oldSite) => {
                if (oldSite.elid !== elidToClear) {
                    return oldSite;
                }
                return {
                    ...oldSite,
                    address: '',
                    elid: isTempElid ? oldSite.elid : `${tempPrefix}${uuid.v4()}`,
                    errorInfo: { ...errorTemplate },
                };
            }),
        }));
    };

    addNewSiteFunc = () => {
        this.setState(prevState => ({
            sitesConfiguration: [...prevState.sitesConfiguration, { ...makeEmptySite() }],
        }));
    };

    render() {
        const {
            sitesConfiguration,
            possibleValues,
            loadingStatus,
            pageErrorMessage,
            errorPopupMessage,
            addressTypeAheadArray,
            isConfirmDeletePopupOpen,
            isErrorPopupOpen,
            elidToDelete,
            isCancelPopupOpen,
            businessName,
            error,
        } = this.state;

        const { redirectAfterCancelSubmission } = this.props;

        if (loadingStatus === PAGE_FAILED) {
            return <FailureMessage errorMessage={pageErrorMessage} />;
        }

        return (
            <MainWrapper>
                {loadingStatus === PAGE_LOADING && <FullPageLoader />}

                <SectionWrapper>
                    <TellusAboutBusinessSection
                        businessName={businessName}
                        businessNameHandler={this.businessNameHandler}
                        showValidationError={this.showValidationError}
                        error={error}
                    />
                </SectionWrapper>
                <SectionWrapper>
                    <SiteTableSection
                        sites={sitesConfiguration}
                        possibleValues={possibleValues}
                        setSiteDropdownValueByType={this.setSiteDropdownValueByType}
                        onAddressInputChange={this.onAddressInputChange}
                        onUserCountChange={this.onUserCountChange}
                        addressTypeAheadArray={addressTypeAheadArray}
                        clearAddressTypeAhead={this.clearAddressTypeAhead}
                        onAddressValueClear={this.onAddressValueClear}
                        onAddressSuggestion={this.onAddressSuggestion}
                        onRowDelete={this.onRowDelete}
                        showValidationError={this.showValidationError}
                    />

                </SectionWrapper>
                <Button noStyle onClick={this.addNewSiteFunc}>
                    <Icon inline name="add-f" size="18px" marginRight="8px" />
                    <Text.Body2>Add a new site</Text.Body2>
                </Button>

                <SnackBar
                    open={this.ifElidExist()
                                 && !isCancelPopupOpen
                                 && !isConfirmDeletePopupOpen
                                 && !isErrorPopupOpen}
                    color="theme-color-secondary"
                >
                    <FlexRowViewExtended>
                        <Button secondary onClick={this.toggleCancelPopup}>
                            Cancel
                        </Button>
                        <Button onClick={this.submitForm}>Submit</Button>
                    </FlexRowViewExtended>
                </SnackBar>
                <ConfirmRejectPopup
                    open={isCancelPopupOpen}
                    title="Cancel form"
                    content="Are you sure you want to cancel this form?"
                    onRequestClose={this.toggleCancelPopup}
                    primaryButtonLabel="No"
                    onPrimaryClick={this.toggleCancelPopup}
                    secondaryButtonLabel="Yes"
                    onSecondaryClick={redirectAfterCancelSubmission}
                />
                <ConfirmRejectPopup
                    open={isConfirmDeletePopupOpen}
                    title="Delete site"
                    content="Are you sure you want to delete this site?"
                    onRequestClose={this.ConfirmDeleteClosePopup}
                    primaryButtonLabel="No"
                    onPrimaryClick={this.ConfirmDeleteClosePopup}
                    secondaryButtonLabel="Yes"
                    onSecondaryClick={() => this.onConfirmRowDelete(elidToDelete)}
                />
                <ConfirmRejectPopup
                    title="Error"
                    open={isErrorPopupOpen}
                    content={errorPopupMessage}
                    onRequestClose={this.toogleErrorMessagePopup}
                    onSecondaryClick={this.toogleErrorMessagePopup}
                    secondaryButtonLabel="Ok"
                />
            </MainWrapper>
        );
    }
}

export default AddSites;

AddSites.propTypes = {
    redirectAfterSubmission: PropTypes.func,
    redirectAfterCancelSubmission: PropTypes.func,
};

AddSites.defaultProps = {
    redirectAfterSubmission: () => {},
    redirectAfterCancelSubmission: () => {},
};

const FlexRowViewExtended = styled(ButtonGroup)`
    justify-content: flex-end;

    ${media.mobile} {
        align-items: center;
        justify-content: center;
    }
`;

const MainWrapper = styled.div`
    margin-bottom: 14rem;
`;
