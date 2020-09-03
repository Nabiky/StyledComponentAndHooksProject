#!/usr/bin/env node
const fs = require('fs');
// Actions
const BYOD = 'BYOD';
const UNDO_BYOD = 'UNDO';
// Constant Data
const NVMRC_DATA = `registry=http://cicdnexus.telecom.tcnz.net/repository/npm-proxy/
sass_binary_site=http://cicdnexus.telecom.tcnz.net/repository/node-sass-release/`;
const YARNRC_DATA = 'registry "http://cicdnexus.telecom.tcnz.net/repository/npm-proxy/"';

const searchTerms = ['proxy', 'registry'];

function replaceAll(target, search, replacement) {
    return target.split(search).join(replacement);
}

const transform = (file, action) => {
    let transformed = `${file.toString()}`;
    if (action === UNDO_BYOD) {
        searchTerms.forEach((term) => {
            transformed = replaceAll(
                transformed,
                'https://registry.yarnpkg.com/',
                `http://cicdnexus.telecom.tcnz.net/repository/npm-${term}/`,
            );
        });
    } else {
        searchTerms.forEach((term) => {
            transformed = replaceAll(
                transformed,
                `http://cicdnexus.telecom.tcnz.net/repository/npm-${term}/`,
                'https://registry.yarnpkg.com/',
            );
        });
    }
    return transformed;
};

const processFiles = (byodOption) => {
    if (byodOption === UNDO_BYOD.toLowerCase()) {
        try {
            fs.writeFileSync('./.npmrc', NVMRC_DATA);
            fs.writeFileSync('./.yarnrc', YARNRC_DATA);
            fs.writeFileSync('./yarn.lock', transform(fs.readFileSync('./yarn.lock'), UNDO_BYOD));
        } catch (err) {
            console.log(err.message);
        }
    } else {
        try {
            if (fs.existsSync('./.npmrc')) {
                fs.unlinkSync('./.npmrc');
            }
            if (fs.existsSync('./.yarnrc')) {
                fs.unlinkSync('./.yarnrc');
            }
            fs.writeFileSync('./yarn.lock', transform(fs.readFileSync('./yarn.lock'), BYOD));
        } catch (err) {
            console.log(err.message);
        }
    }
};

const run = () => {
    processFiles(process.argv[2]);
};

run();
