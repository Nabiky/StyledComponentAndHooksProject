export default function makeSiteName(address = '') {
    const splitAddress = address.split(' ');
    const generatedSiteName = splitAddress.length > 1
        ? splitAddress[0] + splitAddress[1].slice(0, 3).toUpperCase()
        : splitAddress[0].slice(0, 3);

    return generatedSiteName;
}
