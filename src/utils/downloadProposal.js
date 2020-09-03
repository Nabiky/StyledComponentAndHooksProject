import download from 'downloadjs';
import api from '#api';

async function downloadProposal(cartId) {
    const response = await api.downloadProposal({ quoteId: cartId });
    if (response.headers['content-type'].includes('application/pdf')) {
        const linkSource = new Blob([response.data], { type: 'application/pdf' });
        const fileName = 'network_design_proposal.pdf';
        download(linkSource, fileName, 'application/pdf');
    } else {
        const dataView = new DataView(response.data);
        const decoder = new TextDecoder('utf8');
        const responseObj = JSON.parse(decoder.decode(dataView));
        const pdfNotReadyMessage = responseObj.messages[0].title;
        throw Error(pdfNotReadyMessage);
    }
}

export default downloadProposal;
