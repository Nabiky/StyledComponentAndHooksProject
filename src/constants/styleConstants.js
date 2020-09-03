import { theme } from '#lib/SparkTheme';

export const breakpoints = {
    tablet: 939,
    desktopMini: 1199,
    mobile: 639,
    miniMobile: 319,
};

export const desktopContentWidth = 1170;
export const desktopContentMaxiWidth = 2000;

export const media = Object.keys(breakpoints).reduce(
    (sum, breakpoint) => Object.assign(sum, {
        [breakpoint]: `@media screen and (max-width: ${breakpoints[breakpoint]}px)`,
    }),
    {},
);

// Until we sort out how themes ie purple-orange going to work this should stays.
// Remove colors from here and replace it with somesorta token implementation.
const colors = {
    orange: theme.primary.orange,
    green: theme.primary.green,
    pink: theme.primary.pink,
    purple: theme.primary.purple,
};

export const bgColours = {
    purple_bg: theme.primary.purple,
    pink_bg: theme.primary.pink,
    orange_bg: theme.primary.orange,
    green_bg: theme.primary.green,
};

export const themes = {
    'purple-orange': {
        mainColorOne: colors.purple,
        mainColorTwo: colors.orange,
    },
    'pink-green': {
        mainColorOne: colors.pink,
        mainColorTwo: colors.green,
    },
    'green-orange': {
        mainColorOne: colors.green,
        mainColorTwo: colors.orange,
    },
    'pink-purple': {
        mainColorOne: colors.pink,
        mainColorTwo: colors.purple,
    },
    'purple-green': {
        mainColorOne: colors.purple,
        mainColorTwo: colors.green,
    },
    'orange-pink': {
        mainColorOne: colors.orange,
        mainColorTwo: colors.pink,
    },
};

export function getTheme() {
    const themeName = window.theme || 'pink-green';
    return themes[themeName];
}

const fontFamily = 'font-family: AvenirNext, Helvetica, Arial, sans-serif;';

export const fonts = {
    Regular: `${fontFamily} font-weight: 400;`,
    Medium: `${fontFamily} font-weight: 500;`,
    DemiBold: `${fontFamily} font-weight: 600;`,
    Bold: `${fontFamily} font-weight: 700;`,
};
