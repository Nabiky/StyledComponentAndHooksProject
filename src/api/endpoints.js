import production from './endpointsProd.data';
import development from './endpointsDev.data';

const endpoints = {
    production,
    development,
};

export default endpoints[process.env.NODE_ENV];
