import axios from 'axios';

const requiredHeader = {
    'X-Requested-With': 'XMLHTTPRequest',
};

const axiosCustom = axios.create({
    headers: requiredHeader,
});

export default axiosCustom;

export const axiosCustomNoCache = axios.create({
    headers: {
        ...requiredHeader,
        'Cache-Control': 'no-cache',
    },
});
