function makeTermString(subscriptionTerm) {
    if (!subscriptionTerm) {
        return '';
    }

    return `${subscriptionTerm.value}${subscriptionTerm.period.slice(0, 1).toLowerCase()}`;
}

export default makeTermString;
