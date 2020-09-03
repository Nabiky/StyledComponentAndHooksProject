export default function makeInitial(string1 = '', string2 = '') {
    const string1Trimmed = string1.trim();
    const string2Trimmed = string2.trim();

    if (!string1Trimmed && !string2Trimmed) {
        return '';
    }

    if (string2Trimmed) {
        return `${string1Trimmed.charAt(0)}${string2Trimmed.charAt(0)}`.toUpperCase();
    }

    return /(\w)\w*\s*(\w?)/
        .exec(string1Trimmed)
        .slice(1, 3)
        .join('')
        .toUpperCase();
}
