import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, wait } from '@testing-library/react';
import '@testing-library/react/cleanup-after-each';
import React from 'react';
import { createMemoryHistory } from 'history';

import SparkTheme from '#lib/SparkTheme';
import Recommendation from './Recommendation';

const mockSitePreferenceRetrieveValues = {
    businessName: '',
    sitesCount: 20,
    sitesConfiguration: [
        {
            elid: '1234',
            address: '123 Bob Street, Auckland, New Zealand',
            siteType: 'HEAD_OFFICE',
        },
        {
            elid: '2234',
            address: '123Bob',
            siteType: 'SITE',
        },
    ],
    possibleValues: {
        bandwidths: [
            {
                value: 30,
                unit: 'mbps',
            },
            {
                value: 20,
                unit: 'mbps',
            },
            {
                value: 10,
                unit: 'mbps',
            },
        ],
        workingHours: ['7/7/7', '24/7', '7/7/5'],
        diversities: ['PHYSICAL', 'MOBILE', 'NO'],
        siteTypes: ['HEAD_OFFICE', 'SITE', 'DATA_CENTRE'],
    },
};

const mockBulkOfferAvailabilityValues = {
    statusCode: 200,
    redirectUrl: null,
    messages: [
        {
            code: '2000',
            description: 'Operation completed successfully',
            title: null,
            type: 'SUCCESS',
        },
    ],
    availabilityDetails: [
        {
            siteName: null,
            rowId: '1-29V503CC',
            elid: '2234',
            status: 'COMPLETED',
            availabilityMessage: null,
            services: [
                {
                    name: 'WAN Service Standard',
                    bandwidth: '50',
                    offerId: 'WANOffer0003',
                    accessType: 'bitstream2',
                    productId: 'serviceoffer003',
                    subscriptionTerm: {
                        value: 12,
                        period: 'months',
                    },
                    charges: [
                        {
                            type: 'RECURRING',
                            price: {
                                symbol: '$',
                                value: 375.96,
                                formattedValue: '$375.96',
                                currency: 'New Zealand Dollar',
                            },
                            billingFrequency: null,
                        },
                        {
                            type: 'ONEOFF',
                            price: {
                                symbol: '$',
                                value: 1238.46,
                                formattedValue: '$1,238.46',
                                currency: 'New Zealand Dollar',
                            },
                            billingFrequency: null,
                        },
                    ],
                    preselected: false,
                    technologyType: 'Fibre',
                    description: null,
                    accessPriority: 2,
                    installationProductId: 'installation_fibre_1',
                },
                {
                    name: 'WAN Service Premium',
                    bandwidth: '10',
                    offerId: 'WANOffer0005',
                    accessType: 'On-Net',
                    productId: 'serviceoffer001',
                    subscriptionTerm: {
                        value: 36,
                        period: 'months',
                    },
                    charges: [
                        {
                            type: 'RECURRING',
                            price: {
                                symbol: '$',
                                value: 314.04,
                                formattedValue: '$314.04',
                                currency: 'New Zealand Dollar',
                            },
                            billingFrequency: null,
                        },
                        {
                            type: 'ONEOFF',
                            price: {
                                symbol: '$',
                                value: 0,
                                formattedValue: '$0.00',
                                currency: 'New Zealand Dollar',
                            },
                            billingFrequency: null,
                        },
                    ],
                    preselected: true,
                    technologyType: 'Fibre',
                    description: null,
                    accessPriority: 1,
                    installationProductId: 'installation_fibre_1',
                },
                {
                    name: 'WAN Service Standard',
                    bandwidth: '50',
                    offerId: 'WANOffer0003',
                    accessType: 'bitstream2',
                    productId: 'serviceoffer003',
                    subscriptionTerm: {
                        value: 24,
                        period: 'months',
                    },
                    charges: [
                        {
                            type: 'RECURRING',
                            price: {
                                symbol: '$',
                                value: 375.96,
                                formattedValue: '$375.96',
                                currency: 'New Zealand Dollar',
                            },
                            billingFrequency: null,
                        },
                        {
                            type: 'ONEOFF',
                            price: {
                                symbol: '$',
                                value: 619.23,
                                formattedValue: '$619.23',
                                currency: 'New Zealand Dollar',
                            },
                            billingFrequency: null,
                        },
                    ],
                    preselected: false,
                    technologyType: 'Fibre',
                    description: null,
                    accessPriority: 2,
                    installationProductId: 'installation_fibre_1',
                },
                {
                    name: 'WAN Service Standard',
                    bandwidth: '50',
                    offerId: 'WANOffer0003',
                    accessType: 'bitstream2',
                    productId: 'serviceoffer003',
                    subscriptionTerm: {
                        value: 36,
                        period: 'months',
                    },
                    charges: [
                        {
                            type: 'RECURRING',
                            price: {
                                symbol: '$',
                                value: 375.96,
                                formattedValue: '$375.96',
                                currency: 'New Zealand Dollar',
                            },
                            billingFrequency: null,
                        },
                        {
                            type: 'ONEOFF',
                            price: {
                                symbol: '$',
                                value: 0,
                                formattedValue: '$0.00',
                                currency: 'New Zealand Dollar',
                            },
                            billingFrequency: null,
                        },
                    ],
                    preselected: false,
                    technologyType: 'Fibre',
                    description: null,
                    accessPriority: 2,
                    installationProductId: 'installation_fibre_1',
                },
                {
                    name: 'WAN Service Premium',
                    bandwidth: '50',
                    offerId: 'WANOffer0005',
                    accessType: 'On-Net',
                    productId: 'serviceoffer001',
                    subscriptionTerm: {
                        value: 24,
                        period: 'months',
                    },
                    charges: [
                        {
                            type: 'RECURRING',
                            price: {
                                symbol: '$',
                                value: 720.96,
                                formattedValue: '$720.96',
                                currency: 'New Zealand Dollar',
                            },
                            billingFrequency: null,
                        },
                        {
                            type: 'ONEOFF',
                            price: {
                                symbol: '$',
                                value: 619.23,
                                formattedValue: '$619.23',
                                currency: 'New Zealand Dollar',
                            },
                            billingFrequency: null,
                        },
                    ],
                    preselected: false,
                    technologyType: 'Fibre',
                    description: null,
                    accessPriority: 1,
                    installationProductId: 'installation_fibre_1',
                },
                {
                    name: 'WAN Service Premium',
                    bandwidth: '50',
                    offerId: 'WANOffer0005',
                    accessType: 'On-Net',
                    productId: 'serviceoffer001',
                    subscriptionTerm: {
                        value: 12,
                        period: 'months',
                    },
                    charges: [
                        {
                            type: 'RECURRING',
                            price: {
                                symbol: '$',
                                value: 720.96,
                                formattedValue: '$720.96',
                                currency: 'New Zealand Dollar',
                            },
                            billingFrequency: null,
                        },
                        {
                            type: 'ONEOFF',
                            price: {
                                symbol: '$',
                                value: 1238.46,
                                formattedValue: '$1,238.46',
                                currency: 'New Zealand Dollar',
                            },
                            billingFrequency: null,
                        },
                    ],
                    preselected: false,
                    technologyType: 'Fibre',
                    description: null,
                    accessPriority: 1,
                    installationProductId: 'installation_fibre_1',
                },
                {
                    name: 'WAN Service Premium',
                    bandwidth: '50',
                    offerId: 'WANOffer0005',
                    accessType: 'On-Net',
                    productId: 'serviceoffer001',
                    subscriptionTerm: {
                        value: 36,
                        period: 'months',
                    },
                    charges: [
                        {
                            type: 'RECURRING',
                            price: {
                                symbol: '$',
                                value: 720.96,
                                formattedValue: '$720.96',
                                currency: 'New Zealand Dollar',
                            },
                            billingFrequency: null,
                        },
                        {
                            type: 'ONEOFF',
                            price: {
                                symbol: '$',
                                value: 0,
                                formattedValue: '$0.00',
                                currency: 'New Zealand Dollar',
                            },
                            billingFrequency: null,
                        },
                    ],
                    preselected: false,
                    technologyType: 'Fibre',
                    description: null,
                    accessPriority: 1,
                    installationProductId: 'installation_fibre_1',
                },
                {
                    name: 'WAN Service Premium',
                    bandwidth: '100',
                    offerId: 'WANOffer0005',
                    accessType: 'On-Net',
                    productId: 'serviceoffer001',
                    subscriptionTerm: {
                        value: 36,
                        period: 'months',
                    },
                    charges: [
                        {
                            type: 'RECURRING',
                            price: {
                                symbol: '$',
                                value: 844.81,
                                formattedValue: '$844.81',
                                currency: 'New Zealand Dollar',
                            },
                            billingFrequency: null,
                        },
                        {
                            type: 'ONEOFF',
                            price: {
                                symbol: '$',
                                value: 0,
                                formattedValue: '$0.00',
                                currency: 'New Zealand Dollar',
                            },
                            billingFrequency: null,
                        },
                    ],
                    preselected: false,
                    technologyType: 'Fibre',
                    description: null,
                    accessPriority: 1,
                    installationProductId: 'installation_fibre_1',
                },
                {
                    name: 'WAN Service Premium',
                    bandwidth: '100',
                    offerId: 'WANOffer0005',
                    accessType: 'On-Net',
                    productId: 'serviceoffer001',
                    subscriptionTerm: {
                        value: 24,
                        period: 'months',
                    },
                    charges: [
                        {
                            type: 'RECURRING',
                            price: {
                                symbol: '$',
                                value: 844.81,
                                formattedValue: '$844.81',
                                currency: 'New Zealand Dollar',
                            },
                            billingFrequency: null,
                        },
                        {
                            type: 'ONEOFF',
                            price: {
                                symbol: '$',
                                value: 619.23,
                                formattedValue: '$619.23',
                                currency: 'New Zealand Dollar',
                            },
                            billingFrequency: null,
                        },
                    ],
                    preselected: false,
                    technologyType: 'Fibre',
                    description: null,
                    accessPriority: 1,
                    installationProductId: 'installation_fibre_1',
                },
                {
                    name: 'WAN Service Standard',
                    bandwidth: '100',
                    offerId: 'WANOffer0003',
                    accessType: 'bitstream2',
                    productId: 'serviceoffer003',
                    subscriptionTerm: {
                        value: 36,
                        period: 'months',
                    },
                    charges: [
                        {
                            type: 'RECURRING',
                            price: {
                                symbol: '$',
                                value: 473.27,
                                formattedValue: '$473.27',
                                currency: 'New Zealand Dollar',
                            },
                            billingFrequency: null,
                        },
                        {
                            type: 'ONEOFF',
                            price: {
                                symbol: '$',
                                value: 0,
                                formattedValue: '$0.00',
                                currency: 'New Zealand Dollar',
                            },
                            billingFrequency: null,
                        },
                    ],
                    preselected: false,
                    technologyType: 'Fibre',
                    description: null,
                    accessPriority: 2,
                    installationProductId: 'installation_fibre_1',
                },
                {
                    name: 'WAN Service Premium',
                    bandwidth: '100',
                    offerId: 'WANOffer0005',
                    accessType: 'On-Net',
                    productId: 'serviceoffer001',
                    subscriptionTerm: {
                        value: 12,
                        period: 'months',
                    },
                    charges: [
                        {
                            type: 'RECURRING',
                            price: {
                                symbol: '$',
                                value: 844.81,
                                formattedValue: '$844.81',
                                currency: 'New Zealand Dollar',
                            },
                            billingFrequency: null,
                        },
                        {
                            type: 'ONEOFF',
                            price: {
                                symbol: '$',
                                value: 1238.46,
                                formattedValue: '$1,238.46',
                                currency: 'New Zealand Dollar',
                            },
                            billingFrequency: null,
                        },
                    ],
                    preselected: false,
                    technologyType: 'Fibre',
                    description: null,
                    accessPriority: 1,
                    installationProductId: 'installation_fibre_1',
                },
                {
                    name: 'WAN Service Lite',
                    bandwidth: '30',
                    offerId: 'WANOffer0001',
                    accessType: 'bitstream2',
                    productId: 'serviceoffer002',
                    subscriptionTerm: {
                        value: 12,
                        period: 'months',
                    },
                    charges: [
                        {
                            type: 'RECURRING',
                            price: {
                                symbol: '$',
                                value: 153.92,
                                formattedValue: '$153.92',
                                currency: 'New Zealand Dollar',
                            },
                            billingFrequency: null,
                        },
                        {
                            type: 'ONEOFF',
                            price: {
                                symbol: '$',
                                value: 1238.46,
                                formattedValue: '$1,238.46',
                                currency: 'New Zealand Dollar',
                            },
                            billingFrequency: null,
                        },
                    ],
                    preselected: false,
                    technologyType: 'Fibre',
                    description: null,
                    accessPriority: 2,
                    installationProductId: 'installation_fibre_1',
                },
                {
                    name: 'WAN Service Standard',
                    bandwidth: '100',
                    offerId: 'WANOffer0003',
                    accessType: 'bitstream2',
                    productId: 'serviceoffer003',
                    subscriptionTerm: {
                        value: 24,
                        period: 'months',
                    },
                    charges: [
                        {
                            type: 'RECURRING',
                            price: {
                                symbol: '$',
                                value: 473.27,
                                formattedValue: '$473.27',
                                currency: 'New Zealand Dollar',
                            },
                            billingFrequency: null,
                        },
                        {
                            type: 'ONEOFF',
                            price: {
                                symbol: '$',
                                value: 619.23,
                                formattedValue: '$619.23',
                                currency: 'New Zealand Dollar',
                            },
                            billingFrequency: null,
                        },
                    ],
                    preselected: false,
                    technologyType: 'Fibre',
                    description: null,
                    accessPriority: 2,
                    installationProductId: 'installation_fibre_1',
                },
                {
                    name: 'WAN Service Standard',
                    bandwidth: '10',
                    offerId: 'WANOffer0003',
                    accessType: 'bitstream2',
                    productId: 'serviceoffer003',
                    subscriptionTerm: {
                        value: 12,
                        period: 'months',
                    },
                    charges: [
                        {
                            type: 'RECURRING',
                            price: {
                                symbol: '$',
                                value: 216.73,
                                formattedValue: '$216.73',
                                currency: 'New Zealand Dollar',
                            },
                            billingFrequency: null,
                        },
                        {
                            type: 'ONEOFF',
                            price: {
                                symbol: '$',
                                value: 1238.46,
                                formattedValue: '$1,238.46',
                                currency: 'New Zealand Dollar',
                            },
                            billingFrequency: null,
                        },
                    ],
                    preselected: false,
                    technologyType: 'Fibre',
                    description: null,
                    accessPriority: 2,
                    installationProductId: 'installation_fibre_1',
                },
                {
                    name: 'WAN Service Lite',
                    bandwidth: '30',
                    offerId: 'WANOffer0001',
                    accessType: 'bitstream2',
                    productId: 'serviceoffer002',
                    subscriptionTerm: {
                        value: 24,
                        period: 'months',
                    },
                    charges: [
                        {
                            type: 'RECURRING',
                            price: {
                                symbol: '$',
                                value: 153.92,
                                formattedValue: '$153.92',
                                currency: 'New Zealand Dollar',
                            },
                            billingFrequency: null,
                        },
                        {
                            type: 'ONEOFF',
                            price: {
                                symbol: '$',
                                value: 619.23,
                                formattedValue: '$619.23',
                                currency: 'New Zealand Dollar',
                            },
                            billingFrequency: null,
                        },
                    ],
                    preselected: false,
                    technologyType: 'Fibre',
                    description: null,
                    accessPriority: 2,
                    installationProductId: 'installation_fibre_1',
                },
                {
                    name: 'WAN Service Standard',
                    bandwidth: '100',
                    offerId: 'WANOffer0003',
                    accessType: 'bitstream2',
                    productId: 'serviceoffer003',
                    subscriptionTerm: {
                        value: 12,
                        period: 'months',
                    },
                    charges: [
                        {
                            type: 'RECURRING',
                            price: {
                                symbol: '$',
                                value: 473.27,
                                formattedValue: '$473.27',
                                currency: 'New Zealand Dollar',
                            },
                            billingFrequency: null,
                        },
                        {
                            type: 'ONEOFF',
                            price: {
                                symbol: '$',
                                value: 1238.46,
                                formattedValue: '$1,238.46',
                                currency: 'New Zealand Dollar',
                            },
                            billingFrequency: null,
                        },
                    ],
                    preselected: false,
                    technologyType: 'Fibre',
                    description: null,
                    accessPriority: 2,
                    installationProductId: 'installation_fibre_1',
                },
                {
                    name: 'WAN Service Standard',
                    bandwidth: '10',
                    offerId: 'WANOffer0003',
                    accessType: 'bitstream2',
                    productId: 'serviceoffer003',
                    subscriptionTerm: {
                        value: 24,
                        period: 'months',
                    },
                    charges: [
                        {
                            type: 'RECURRING',
                            price: {
                                symbol: '$',
                                value: 216.73,
                                formattedValue: '$216.73',
                                currency: 'New Zealand Dollar',
                            },
                            billingFrequency: null,
                        },
                        {
                            type: 'ONEOFF',
                            price: {
                                symbol: '$',
                                value: 619.23,
                                formattedValue: '$619.23',
                                currency: 'New Zealand Dollar',
                            },
                            billingFrequency: null,
                        },
                    ],
                    preselected: false,
                    technologyType: 'Fibre',
                    description: null,
                    accessPriority: 2,
                    installationProductId: 'installation_fibre_1',
                },
                {
                    name: 'WAN Service Lite',
                    bandwidth: '100',
                    offerId: 'WANOffer0001',
                    accessType: 'bitstream2',
                    productId: 'serviceoffer002',
                    subscriptionTerm: {
                        value: 36,
                        period: 'months',
                    },
                    charges: [
                        {
                            type: 'RECURRING',
                            price: {
                                symbol: '$',
                                value: 260.96,
                                formattedValue: '$260.96',
                                currency: 'New Zealand Dollar',
                            },
                            billingFrequency: null,
                        },
                        {
                            type: 'ONEOFF',
                            price: {
                                symbol: '$',
                                value: 0,
                                formattedValue: '$0.00',
                                currency: 'New Zealand Dollar',
                            },
                            billingFrequency: null,
                        },
                    ],
                    preselected: false,
                    technologyType: 'Fibre',
                    description: null,
                    accessPriority: 2,
                    installationProductId: 'installation_fibre_1',
                },
                {
                    name: 'WAN Service Lite',
                    bandwidth: '30',
                    offerId: 'WANOffer0001',
                    accessType: 'bitstream2',
                    productId: 'serviceoffer002',
                    subscriptionTerm: {
                        value: 36,
                        period: 'months',
                    },
                    charges: [
                        {
                            type: 'RECURRING',
                            price: {
                                symbol: '$',
                                value: 153.92,
                                formattedValue: '$153.92',
                                currency: 'New Zealand Dollar',
                            },
                            billingFrequency: null,
                        },
                        {
                            type: 'ONEOFF',
                            price: {
                                symbol: '$',
                                value: 0,
                                formattedValue: '$0.00',
                                currency: 'New Zealand Dollar',
                            },
                            billingFrequency: null,
                        },
                    ],
                    preselected: false,
                    technologyType: 'Fibre',
                    description: null,
                    accessPriority: 2,
                    installationProductId: 'installation_fibre_1',
                },
                {
                    name: 'WAN Service Standard',
                    bandwidth: '10',
                    offerId: 'WANOffer0003',
                    accessType: 'bitstream2',
                    productId: 'serviceoffer003',
                    subscriptionTerm: {
                        value: 36,
                        period: 'months',
                    },
                    charges: [
                        {
                            type: 'RECURRING',
                            price: {
                                symbol: '$',
                                value: 216.73,
                                formattedValue: '$216.73',
                                currency: 'New Zealand Dollar',
                            },
                            billingFrequency: null,
                        },
                        {
                            type: 'ONEOFF',
                            price: {
                                symbol: '$',
                                value: 0,
                                formattedValue: '$0.00',
                                currency: 'New Zealand Dollar',
                            },
                            billingFrequency: null,
                        },
                    ],
                    preselected: false,
                    technologyType: 'Fibre',
                    description: null,
                    accessPriority: 2,
                    installationProductId: 'installation_fibre_1',
                },
                {
                    name: 'WAN Service Premium',
                    bandwidth: '10',
                    offerId: 'WANOffer0005',
                    accessType: 'On-Net',
                    productId: 'serviceoffer001',
                    subscriptionTerm: {
                        value: 12,
                        period: 'months',
                    },
                    charges: [
                        {
                            type: 'RECURRING',
                            price: {
                                symbol: '$',
                                value: 314.04,
                                formattedValue: '$314.04',
                                currency: 'New Zealand Dollar',
                            },
                            billingFrequency: null,
                        },
                        {
                            type: 'ONEOFF',
                            price: {
                                symbol: '$',
                                value: 1238.46,
                                formattedValue: '$1,238.46',
                                currency: 'New Zealand Dollar',
                            },
                            billingFrequency: null,
                        },
                    ],
                    preselected: false,
                    technologyType: 'Fibre',
                    description: null,
                    accessPriority: 1,
                    installationProductId: 'installation_fibre_1',
                },
                {
                    name: 'WAN Service Lite',
                    bandwidth: '100',
                    offerId: 'WANOffer0001',
                    accessType: 'bitstream2',
                    productId: 'serviceoffer002',
                    subscriptionTerm: {
                        value: 24,
                        period: 'months',
                    },
                    charges: [
                        {
                            type: 'RECURRING',
                            price: {
                                symbol: '$',
                                value: 260.96,
                                formattedValue: '$260.96',
                                currency: 'New Zealand Dollar',
                            },
                            billingFrequency: null,
                        },
                        {
                            type: 'ONEOFF',
                            price: {
                                symbol: '$',
                                value: 619.23,
                                formattedValue: '$619.23',
                                currency: 'New Zealand Dollar',
                            },
                            billingFrequency: null,
                        },
                    ],
                    preselected: false,
                    technologyType: 'Fibre',
                    description: null,
                    accessPriority: 2,
                    installationProductId: 'installation_fibre_1',
                },
                {
                    name: 'WAN Service Premium',
                    bandwidth: '10',
                    offerId: 'WANOffer0005',
                    accessType: 'On-Net',
                    productId: 'serviceoffer001',
                    subscriptionTerm: {
                        value: 24,
                        period: 'months',
                    },
                    charges: [
                        {
                            type: 'RECURRING',
                            price: {
                                symbol: '$',
                                value: 314.04,
                                formattedValue: '$314.04',
                                currency: 'New Zealand Dollar',
                            },
                            billingFrequency: null,
                        },
                        {
                            type: 'ONEOFF',
                            price: {
                                symbol: '$',
                                value: 619.23,
                                formattedValue: '$619.23',
                                currency: 'New Zealand Dollar',
                            },
                            billingFrequency: null,
                        },
                    ],
                    preselected: false,
                    technologyType: 'Fibre',
                    description: null,
                    accessPriority: 1,
                    installationProductId: 'installation_fibre_1',
                },
                {
                    name: 'WAN Service Lite',
                    bandwidth: '100',
                    offerId: 'WANOffer0001',
                    accessType: 'bitstream2',
                    productId: 'serviceoffer002',
                    subscriptionTerm: {
                        value: 12,
                        period: 'months',
                    },
                    charges: [
                        {
                            type: 'RECURRING',
                            price: {
                                symbol: '$',
                                value: 260.96,
                                formattedValue: '$260.96',
                                currency: 'New Zealand Dollar',
                            },
                            billingFrequency: null,
                        },
                        {
                            type: 'ONEOFF',
                            price: {
                                symbol: '$',
                                value: 1238.46,
                                formattedValue: '$1,238.46',
                                currency: 'New Zealand Dollar',
                            },
                            billingFrequency: null,
                        },
                    ],
                    preselected: false,
                    technologyType: 'Fibre',
                    description: null,
                    accessPriority: 2,
                    installationProductId: 'installation_fibre_1',
                },
            ],
        },
        {
            siteName: null,
            rowId: '1-29V503CC',
            elid: '1234',
            status: 'COMPLETED',
            availabilityMessage: null,
            services: [
                {
                    name: 'WAN Service Standard',
                    bandwidth: '50',
                    offerId: 'WANOffer0003',
                    accessType: 'bitstream2',
                    productId: 'serviceoffer003',
                    subscriptionTerm: {
                        value: 12,
                        period: 'months',
                    },
                    charges: [
                        {
                            type: 'RECURRING',
                            price: {
                                symbol: '$',
                                value: 375.96,
                                formattedValue: '$375.96',
                                currency: 'New Zealand Dollar',
                            },
                            billingFrequency: null,
                        },
                        {
                            type: 'ONEOFF',
                            price: {
                                symbol: '$',
                                value: 1238.46,
                                formattedValue: '$1,238.46',
                                currency: 'New Zealand Dollar',
                            },
                            billingFrequency: null,
                        },
                    ],
                    preselected: false,
                    technologyType: 'Fibre',
                    description: null,
                    accessPriority: 2,
                    installationProductId: 'installation_fibre_1',
                },
                {
                    name: 'WAN Service Premium',
                    bandwidth: '10',
                    offerId: 'WANOffer0005',
                    accessType: 'On-Net',
                    productId: 'serviceoffer001',
                    subscriptionTerm: {
                        value: 36,
                        period: 'months',
                    },
                    charges: [
                        {
                            type: 'RECURRING',
                            price: {
                                symbol: '$',
                                value: 314.04,
                                formattedValue: '$314.04',
                                currency: 'New Zealand Dollar',
                            },
                            billingFrequency: null,
                        },
                        {
                            type: 'ONEOFF',
                            price: {
                                symbol: '$',
                                value: 0,
                                formattedValue: '$0.00',
                                currency: 'New Zealand Dollar',
                            },
                            billingFrequency: null,
                        },
                    ],
                    preselected: true,
                    technologyType: 'Fibre',
                    description: null,
                    accessPriority: 1,
                    installationProductId: 'installation_fibre_1',
                },
                {
                    name: 'WAN Service Standard',
                    bandwidth: '50',
                    offerId: 'WANOffer0003',
                    accessType: 'bitstream2',
                    productId: 'serviceoffer003',
                    subscriptionTerm: {
                        value: 24,
                        period: 'months',
                    },
                    charges: [
                        {
                            type: 'RECURRING',
                            price: {
                                symbol: '$',
                                value: 375.96,
                                formattedValue: '$375.96',
                                currency: 'New Zealand Dollar',
                            },
                            billingFrequency: null,
                        },
                        {
                            type: 'ONEOFF',
                            price: {
                                symbol: '$',
                                value: 619.23,
                                formattedValue: '$619.23',
                                currency: 'New Zealand Dollar',
                            },
                            billingFrequency: null,
                        },
                    ],
                    preselected: false,
                    technologyType: 'Fibre',
                    description: null,
                    accessPriority: 2,
                    installationProductId: 'installation_fibre_1',
                },
                {
                    name: 'WAN Service Standard',
                    bandwidth: '50',
                    offerId: 'WANOffer0003',
                    accessType: 'bitstream2',
                    productId: 'serviceoffer003',
                    subscriptionTerm: {
                        value: 36,
                        period: 'months',
                    },
                    charges: [
                        {
                            type: 'RECURRING',
                            price: {
                                symbol: '$',
                                value: 375.96,
                                formattedValue: '$375.96',
                                currency: 'New Zealand Dollar',
                            },
                            billingFrequency: null,
                        },
                        {
                            type: 'ONEOFF',
                            price: {
                                symbol: '$',
                                value: 0,
                                formattedValue: '$0.00',
                                currency: 'New Zealand Dollar',
                            },
                            billingFrequency: null,
                        },
                    ],
                    preselected: false,
                    technologyType: 'Fibre',
                    description: null,
                    accessPriority: 2,
                    installationProductId: 'installation_fibre_1',
                },
                {
                    name: 'WAN Service Premium',
                    bandwidth: '50',
                    offerId: 'WANOffer0005',
                    accessType: 'On-Net',
                    productId: 'serviceoffer001',
                    subscriptionTerm: {
                        value: 24,
                        period: 'months',
                    },
                    charges: [
                        {
                            type: 'RECURRING',
                            price: {
                                symbol: '$',
                                value: 720.96,
                                formattedValue: '$720.96',
                                currency: 'New Zealand Dollar',
                            },
                            billingFrequency: null,
                        },
                        {
                            type: 'ONEOFF',
                            price: {
                                symbol: '$',
                                value: 619.23,
                                formattedValue: '$619.23',
                                currency: 'New Zealand Dollar',
                            },
                            billingFrequency: null,
                        },
                    ],
                    preselected: false,
                    technologyType: 'Fibre',
                    description: null,
                    accessPriority: 1,
                    installationProductId: 'installation_fibre_1',
                },
                {
                    name: 'WAN Service Premium',
                    bandwidth: '50',
                    offerId: 'WANOffer0005',
                    accessType: 'On-Net',
                    productId: 'serviceoffer001',
                    subscriptionTerm: {
                        value: 12,
                        period: 'months',
                    },
                    charges: [
                        {
                            type: 'RECURRING',
                            price: {
                                symbol: '$',
                                value: 720.96,
                                formattedValue: '$720.96',
                                currency: 'New Zealand Dollar',
                            },
                            billingFrequency: null,
                        },
                        {
                            type: 'ONEOFF',
                            price: {
                                symbol: '$',
                                value: 1238.46,
                                formattedValue: '$1,238.46',
                                currency: 'New Zealand Dollar',
                            },
                            billingFrequency: null,
                        },
                    ],
                    preselected: false,
                    technologyType: 'Fibre',
                    description: null,
                    accessPriority: 1,
                    installationProductId: 'installation_fibre_1',
                },
                {
                    name: 'WAN Service Premium',
                    bandwidth: '50',
                    offerId: 'WANOffer0005',
                    accessType: 'On-Net',
                    productId: 'serviceoffer001',
                    subscriptionTerm: {
                        value: 36,
                        period: 'months',
                    },
                    charges: [
                        {
                            type: 'RECURRING',
                            price: {
                                symbol: '$',
                                value: 720.96,
                                formattedValue: '$720.96',
                                currency: 'New Zealand Dollar',
                            },
                            billingFrequency: null,
                        },
                        {
                            type: 'ONEOFF',
                            price: {
                                symbol: '$',
                                value: 0,
                                formattedValue: '$0.00',
                                currency: 'New Zealand Dollar',
                            },
                            billingFrequency: null,
                        },
                    ],
                    preselected: false,
                    technologyType: 'Fibre',
                    description: null,
                    accessPriority: 1,
                    installationProductId: 'installation_fibre_1',
                },
                {
                    name: 'WAN Service Premium',
                    bandwidth: '100',
                    offerId: 'WANOffer0005',
                    accessType: 'On-Net',
                    productId: 'serviceoffer001',
                    subscriptionTerm: {
                        value: 36,
                        period: 'months',
                    },
                    charges: [
                        {
                            type: 'RECURRING',
                            price: {
                                symbol: '$',
                                value: 844.81,
                                formattedValue: '$844.81',
                                currency: 'New Zealand Dollar',
                            },
                            billingFrequency: null,
                        },
                        {
                            type: 'ONEOFF',
                            price: {
                                symbol: '$',
                                value: 0,
                                formattedValue: '$0.00',
                                currency: 'New Zealand Dollar',
                            },
                            billingFrequency: null,
                        },
                    ],
                    preselected: false,
                    technologyType: 'Fibre',
                    description: null,
                    accessPriority: 1,
                    installationProductId: 'installation_fibre_1',
                },
                {
                    name: 'WAN Service Premium',
                    bandwidth: '100',
                    offerId: 'WANOffer0005',
                    accessType: 'On-Net',
                    productId: 'serviceoffer001',
                    subscriptionTerm: {
                        value: 24,
                        period: 'months',
                    },
                    charges: [
                        {
                            type: 'RECURRING',
                            price: {
                                symbol: '$',
                                value: 844.81,
                                formattedValue: '$844.81',
                                currency: 'New Zealand Dollar',
                            },
                            billingFrequency: null,
                        },
                        {
                            type: 'ONEOFF',
                            price: {
                                symbol: '$',
                                value: 619.23,
                                formattedValue: '$619.23',
                                currency: 'New Zealand Dollar',
                            },
                            billingFrequency: null,
                        },
                    ],
                    preselected: false,
                    technologyType: 'Fibre',
                    description: null,
                    accessPriority: 1,
                    installationProductId: 'installation_fibre_1',
                },
                {
                    name: 'WAN Service Standard',
                    bandwidth: '100',
                    offerId: 'WANOffer0003',
                    accessType: 'bitstream2',
                    productId: 'serviceoffer003',
                    subscriptionTerm: {
                        value: 36,
                        period: 'months',
                    },
                    charges: [
                        {
                            type: 'RECURRING',
                            price: {
                                symbol: '$',
                                value: 473.27,
                                formattedValue: '$473.27',
                                currency: 'New Zealand Dollar',
                            },
                            billingFrequency: null,
                        },
                        {
                            type: 'ONEOFF',
                            price: {
                                symbol: '$',
                                value: 0,
                                formattedValue: '$0.00',
                                currency: 'New Zealand Dollar',
                            },
                            billingFrequency: null,
                        },
                    ],
                    preselected: false,
                    technologyType: 'Fibre',
                    description: null,
                    accessPriority: 2,
                    installationProductId: 'installation_fibre_1',
                },
                {
                    name: 'WAN Service Premium',
                    bandwidth: '100',
                    offerId: 'WANOffer0005',
                    accessType: 'On-Net',
                    productId: 'serviceoffer001',
                    subscriptionTerm: {
                        value: 12,
                        period: 'months',
                    },
                    charges: [
                        {
                            type: 'RECURRING',
                            price: {
                                symbol: '$',
                                value: 844.81,
                                formattedValue: '$844.81',
                                currency: 'New Zealand Dollar',
                            },
                            billingFrequency: null,
                        },
                        {
                            type: 'ONEOFF',
                            price: {
                                symbol: '$',
                                value: 1238.46,
                                formattedValue: '$1,238.46',
                                currency: 'New Zealand Dollar',
                            },
                            billingFrequency: null,
                        },
                    ],
                    preselected: false,
                    technologyType: 'Fibre',
                    description: null,
                    accessPriority: 1,
                    installationProductId: 'installation_fibre_1',
                },
                {
                    name: 'WAN Service Lite',
                    bandwidth: '30',
                    offerId: 'WANOffer0001',
                    accessType: 'bitstream2',
                    productId: 'serviceoffer002',
                    subscriptionTerm: {
                        value: 12,
                        period: 'months',
                    },
                    charges: [
                        {
                            type: 'RECURRING',
                            price: {
                                symbol: '$',
                                value: 153.92,
                                formattedValue: '$153.92',
                                currency: 'New Zealand Dollar',
                            },
                            billingFrequency: null,
                        },
                        {
                            type: 'ONEOFF',
                            price: {
                                symbol: '$',
                                value: 1238.46,
                                formattedValue: '$1,238.46',
                                currency: 'New Zealand Dollar',
                            },
                            billingFrequency: null,
                        },
                    ],
                    preselected: false,
                    technologyType: 'Fibre',
                    description: null,
                    accessPriority: 2,
                    installationProductId: 'installation_fibre_1',
                },
                {
                    name: 'WAN Service Standard',
                    bandwidth: '100',
                    offerId: 'WANOffer0003',
                    accessType: 'bitstream2',
                    productId: 'serviceoffer003',
                    subscriptionTerm: {
                        value: 24,
                        period: 'months',
                    },
                    charges: [
                        {
                            type: 'RECURRING',
                            price: {
                                symbol: '$',
                                value: 473.27,
                                formattedValue: '$473.27',
                                currency: 'New Zealand Dollar',
                            },
                            billingFrequency: null,
                        },
                        {
                            type: 'ONEOFF',
                            price: {
                                symbol: '$',
                                value: 619.23,
                                formattedValue: '$619.23',
                                currency: 'New Zealand Dollar',
                            },
                            billingFrequency: null,
                        },
                    ],
                    preselected: false,
                    technologyType: 'Fibre',
                    description: null,
                    accessPriority: 2,
                    installationProductId: 'installation_fibre_1',
                },
                {
                    name: 'WAN Service Standard',
                    bandwidth: '10',
                    offerId: 'WANOffer0003',
                    accessType: 'bitstream2',
                    productId: 'serviceoffer003',
                    subscriptionTerm: {
                        value: 12,
                        period: 'months',
                    },
                    charges: [
                        {
                            type: 'RECURRING',
                            price: {
                                symbol: '$',
                                value: 216.73,
                                formattedValue: '$216.73',
                                currency: 'New Zealand Dollar',
                            },
                            billingFrequency: null,
                        },
                        {
                            type: 'ONEOFF',
                            price: {
                                symbol: '$',
                                value: 1238.46,
                                formattedValue: '$1,238.46',
                                currency: 'New Zealand Dollar',
                            },
                            billingFrequency: null,
                        },
                    ],
                    preselected: false,
                    technologyType: 'Fibre',
                    description: null,
                    accessPriority: 2,
                    installationProductId: 'installation_fibre_1',
                },
                {
                    name: 'WAN Service Lite',
                    bandwidth: '30',
                    offerId: 'WANOffer0001',
                    accessType: 'bitstream2',
                    productId: 'serviceoffer002',
                    subscriptionTerm: {
                        value: 24,
                        period: 'months',
                    },
                    charges: [
                        {
                            type: 'RECURRING',
                            price: {
                                symbol: '$',
                                value: 153.92,
                                formattedValue: '$153.92',
                                currency: 'New Zealand Dollar',
                            },
                            billingFrequency: null,
                        },
                        {
                            type: 'ONEOFF',
                            price: {
                                symbol: '$',
                                value: 619.23,
                                formattedValue: '$619.23',
                                currency: 'New Zealand Dollar',
                            },
                            billingFrequency: null,
                        },
                    ],
                    preselected: false,
                    technologyType: 'Fibre',
                    description: null,
                    accessPriority: 2,
                    installationProductId: 'installation_fibre_1',
                },
                {
                    name: 'WAN Service Standard',
                    bandwidth: '100',
                    offerId: 'WANOffer0003',
                    accessType: 'bitstream2',
                    productId: 'serviceoffer003',
                    subscriptionTerm: {
                        value: 12,
                        period: 'months',
                    },
                    charges: [
                        {
                            type: 'RECURRING',
                            price: {
                                symbol: '$',
                                value: 473.27,
                                formattedValue: '$473.27',
                                currency: 'New Zealand Dollar',
                            },
                            billingFrequency: null,
                        },
                        {
                            type: 'ONEOFF',
                            price: {
                                symbol: '$',
                                value: 1238.46,
                                formattedValue: '$1,238.46',
                                currency: 'New Zealand Dollar',
                            },
                            billingFrequency: null,
                        },
                    ],
                    preselected: false,
                    technologyType: 'Fibre',
                    description: null,
                    accessPriority: 2,
                    installationProductId: 'installation_fibre_1',
                },
                {
                    name: 'WAN Service Standard',
                    bandwidth: '10',
                    offerId: 'WANOffer0003',
                    accessType: 'bitstream2',
                    productId: 'serviceoffer003',
                    subscriptionTerm: {
                        value: 24,
                        period: 'months',
                    },
                    charges: [
                        {
                            type: 'RECURRING',
                            price: {
                                symbol: '$',
                                value: 216.73,
                                formattedValue: '$216.73',
                                currency: 'New Zealand Dollar',
                            },
                            billingFrequency: null,
                        },
                        {
                            type: 'ONEOFF',
                            price: {
                                symbol: '$',
                                value: 619.23,
                                formattedValue: '$619.23',
                                currency: 'New Zealand Dollar',
                            },
                            billingFrequency: null,
                        },
                    ],
                    preselected: false,
                    technologyType: 'Fibre',
                    description: null,
                    accessPriority: 2,
                    installationProductId: 'installation_fibre_1',
                },
                {
                    name: 'WAN Service Lite',
                    bandwidth: '100',
                    offerId: 'WANOffer0001',
                    accessType: 'bitstream2',
                    productId: 'serviceoffer002',
                    subscriptionTerm: {
                        value: 36,
                        period: 'months',
                    },
                    charges: [
                        {
                            type: 'RECURRING',
                            price: {
                                symbol: '$',
                                value: 260.96,
                                formattedValue: '$260.96',
                                currency: 'New Zealand Dollar',
                            },
                            billingFrequency: null,
                        },
                        {
                            type: 'ONEOFF',
                            price: {
                                symbol: '$',
                                value: 0,
                                formattedValue: '$0.00',
                                currency: 'New Zealand Dollar',
                            },
                            billingFrequency: null,
                        },
                    ],
                    preselected: false,
                    technologyType: 'Fibre',
                    description: null,
                    accessPriority: 2,
                    installationProductId: 'installation_fibre_1',
                },
                {
                    name: 'WAN Service Lite',
                    bandwidth: '30',
                    offerId: 'WANOffer0001',
                    accessType: 'bitstream2',
                    productId: 'serviceoffer002',
                    subscriptionTerm: {
                        value: 36,
                        period: 'months',
                    },
                    charges: [
                        {
                            type: 'RECURRING',
                            price: {
                                symbol: '$',
                                value: 153.92,
                                formattedValue: '$153.92',
                                currency: 'New Zealand Dollar',
                            },
                            billingFrequency: null,
                        },
                        {
                            type: 'ONEOFF',
                            price: {
                                symbol: '$',
                                value: 0,
                                formattedValue: '$0.00',
                                currency: 'New Zealand Dollar',
                            },
                            billingFrequency: null,
                        },
                    ],
                    preselected: false,
                    technologyType: 'Fibre',
                    description: null,
                    accessPriority: 2,
                    installationProductId: 'installation_fibre_1',
                },
                {
                    name: 'WAN Service Standard',
                    bandwidth: '10',
                    offerId: 'WANOffer0003',
                    accessType: 'bitstream2',
                    productId: 'serviceoffer003',
                    subscriptionTerm: {
                        value: 36,
                        period: 'months',
                    },
                    charges: [
                        {
                            type: 'RECURRING',
                            price: {
                                symbol: '$',
                                value: 216.73,
                                formattedValue: '$216.73',
                                currency: 'New Zealand Dollar',
                            },
                            billingFrequency: null,
                        },
                        {
                            type: 'ONEOFF',
                            price: {
                                symbol: '$',
                                value: 0,
                                formattedValue: '$0.00',
                                currency: 'New Zealand Dollar',
                            },
                            billingFrequency: null,
                        },
                    ],
                    preselected: false,
                    technologyType: 'Fibre',
                    description: null,
                    accessPriority: 2,
                    installationProductId: 'installation_fibre_1',
                },
                {
                    name: 'WAN Service Premium',
                    bandwidth: '10',
                    offerId: 'WANOffer0005',
                    accessType: 'On-Net',
                    productId: 'serviceoffer001',
                    subscriptionTerm: {
                        value: 12,
                        period: 'months',
                    },
                    charges: [
                        {
                            type: 'RECURRING',
                            price: {
                                symbol: '$',
                                value: 314.04,
                                formattedValue: '$314.04',
                                currency: 'New Zealand Dollar',
                            },
                            billingFrequency: null,
                        },
                        {
                            type: 'ONEOFF',
                            price: {
                                symbol: '$',
                                value: 1238.46,
                                formattedValue: '$1,238.46',
                                currency: 'New Zealand Dollar',
                            },
                            billingFrequency: null,
                        },
                    ],
                    preselected: false,
                    technologyType: 'Fibre',
                    description: null,
                    accessPriority: 1,
                    installationProductId: 'installation_fibre_1',
                },
                {
                    name: 'WAN Service Lite',
                    bandwidth: '100',
                    offerId: 'WANOffer0001',
                    accessType: 'bitstream2',
                    productId: 'serviceoffer002',
                    subscriptionTerm: {
                        value: 24,
                        period: 'months',
                    },
                    charges: [
                        {
                            type: 'RECURRING',
                            price: {
                                symbol: '$',
                                value: 260.96,
                                formattedValue: '$260.96',
                                currency: 'New Zealand Dollar',
                            },
                            billingFrequency: null,
                        },
                        {
                            type: 'ONEOFF',
                            price: {
                                symbol: '$',
                                value: 619.23,
                                formattedValue: '$619.23',
                                currency: 'New Zealand Dollar',
                            },
                            billingFrequency: null,
                        },
                    ],
                    preselected: false,
                    technologyType: 'Fibre',
                    description: null,
                    accessPriority: 2,
                    installationProductId: 'installation_fibre_1',
                },
                {
                    name: 'WAN Service Premium',
                    bandwidth: '10',
                    offerId: 'WANOffer0005',
                    accessType: 'On-Net',
                    productId: 'serviceoffer001',
                    subscriptionTerm: {
                        value: 24,
                        period: 'months',
                    },
                    charges: [
                        {
                            type: 'RECURRING',
                            price: {
                                symbol: '$',
                                value: 314.04,
                                formattedValue: '$314.04',
                                currency: 'New Zealand Dollar',
                            },
                            billingFrequency: null,
                        },
                        {
                            type: 'ONEOFF',
                            price: {
                                symbol: '$',
                                value: 619.23,
                                formattedValue: '$619.23',
                                currency: 'New Zealand Dollar',
                            },
                            billingFrequency: null,
                        },
                    ],
                    preselected: false,
                    technologyType: 'Fibre',
                    description: null,
                    accessPriority: 1,
                    installationProductId: 'installation_fibre_1',
                },
                {
                    name: 'WAN Service Lite',
                    bandwidth: '100',
                    offerId: 'WANOffer0001',
                    accessType: 'bitstream2',
                    productId: 'serviceoffer002',
                    subscriptionTerm: {
                        value: 12,
                        period: 'months',
                    },
                    charges: [
                        {
                            type: 'RECURRING',
                            price: {
                                symbol: '$',
                                value: 260.96,
                                formattedValue: '$260.96',
                                currency: 'New Zealand Dollar',
                            },
                            billingFrequency: null,
                        },
                        {
                            type: 'ONEOFF',
                            price: {
                                symbol: '$',
                                value: 1238.46,
                                formattedValue: '$1,238.46',
                                currency: 'New Zealand Dollar',
                            },
                            billingFrequency: null,
                        },
                    ],
                    preselected: false,
                    technologyType: 'Fibre',
                    description: null,
                    accessPriority: 2,
                    installationProductId: 'installation_fibre_1',
                },
            ],
        },
    ],
    successful: true,
};

jest.mock('#api', () => ({
    __esModule: true,
    default: {
        sitePreferenceRetrieve: jest.fn(() => Promise.resolve({
            data: mockSitePreferenceRetrieveValues,
        })),
        getBulkOfferAvailability: jest.fn(() => Promise.resolve({
            data: mockBulkOfferAvailabilityValues,
        })),
    },
}));

const mockAuthorableProp = {
    siteTypes: [
        {
            siteKey: 'HEAD_OFFICE',
            siteValue: 'Head office',
        },
        {
            siteKey: 'SITE',
            siteValue: 'Site',
        },
        {
            siteKey: 'DATA_CENTRE',
            siteValue: 'Data centre',
        },
    ],
    retryDelayDuration: 5000,
    maxRetriesAllowed: 10,
    noOfSitesToLoad: 5,
    termTitle: 'Term',
    termDescription: 'Term Description',
    recommendationTitle: 'Recommendation',
};

function renderRecommendation() {
    const history = createMemoryHistory({ initialEntries: ['/recommendation'] });
    const wrapper = render(
        <SparkTheme>
            <Recommendation {...mockAuthorableProp} history={history} />
        </SparkTheme>,
    );
    return { ...wrapper, history };
}

test('Each site have the correct site name and address', async () => {
    const { getAllByLabelText } = renderRecommendation();
    await wait(() => {
        const siteNamesNodes = getAllByLabelText('Site name');
        expect(siteNamesNodes.map(siteName => siteName.textContent)).toEqual(['123BOB', '123']);
        const addressNodes = getAllByLabelText('Address');
        expect(addressNodes.map(address => address.textContent)).toEqual([
            '123 Bob Street, Auckland, New Zealand - Head office',
            '123Bob - Site',
        ]);
    });
});

test('The pricing in the snackbar is correct', async () => {
    const { getByLabelText } = renderRecommendation();
    await wait(() => {
        const monthlyFee = getByLabelText('Total monthly fees');
        const oneOffFee = getByLabelText('Total one off fees');
        expect(monthlyFee.textContent).toEqual('$628.08');
        expect(oneOffFee.textContent).toEqual('$0.00');
    });
});

test('Hamburger menu opens, and contain Edit and Remove options', async () => {
    const { getAllByTitle, getByText } = renderRecommendation();
    await wait(() => {
        const optionMenus = getAllByTitle('more options');
        expect(optionMenus.length).toEqual(2);
        fireEvent.click(optionMenus[0]);
        getByText('Edit');
        getByText('Remove');
    });
});

test('Can go in to edit mode', async () => {
    const { getAllByTitle, getByText, getAllByLabelText } = renderRecommendation();
    await wait(async () => {
        const optionMenus = getAllByTitle('more options');
        fireEvent.click(optionMenus[0]);
        const editButton = getByText('Edit');
        await wait(() => {
            fireEvent.click(editButton);
            const siteNameFields = getAllByLabelText('Site name');
            expect(siteNameFields[0].value).toEqual('123BOB');
            getByText('Cancel');
            getByText('Done');
        });
    });
});

test('Changing site name in edit mode gets saved', async () => {
    const { getAllByTitle, getByText, getAllByLabelText } = renderRecommendation();
    await wait(async () => {
        const optionMenus = getAllByTitle('more options');
        fireEvent.click(optionMenus[0]);
        const editButton = getByText('Edit');
        fireEvent.click(editButton);
        await wait(async () => {
            const siteNameFields = getAllByLabelText('Site name');
            fireEvent.change(siteNameFields[0], { target: { value: 'Bob Bob Bob 123' } });
            const saveButton = getByText('Done');
            await wait(() => {
                fireEvent.click(saveButton);
                const siteNamesNodes = getAllByLabelText('Site name');
                expect(siteNamesNodes[0].textContent).toEqual('Bob Bob Bob 123');
                expect(siteNamesNodes[1].textContent).toEqual('123');
            });
        });
    });
});
