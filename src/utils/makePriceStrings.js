function makePriceStrings(chargeObj) {
    if (!chargeObj) {
        return { oneOffChargeString: '─', recurringChargeString: '─' };
    }

    const oneOffCharge = chargeObj.find(charge => charge.type === 'ONEOFF');
    const recurringCharge = chargeObj.find(charge => charge.type === 'RECURRING');
    const oneOffChargeString = oneOffCharge.price.value > 0
        ? `${oneOffCharge.price.formattedValue}`
        : '─';
    const recurringChargeString = recurringCharge.price.value > 0
        ? `${recurringCharge.price.formattedValue}`
        : '─';
    return { oneOffChargeString, recurringChargeString };
}

export default makePriceStrings;
