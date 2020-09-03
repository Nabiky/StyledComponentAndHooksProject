const path = require('path');
const paths = require('./config/paths');
const webpack = require('./config/webpack.config.js');

const src = path.resolve(paths.appSrc);
module.exports = {
template: {
    head: {
      links: [
        {
          rel: 'stylesheet',
          href:
            'http://www-staging.spark.co.nz/content/dam/onespark/spark-icon-family/styles.css'
        }
      ]
    }
  },
    webpackConfig: webpack,
    components: [`${src}/components/**/[A-Z]*.jsx`, `${src}/lib/**/[A-Z]*.jsx`],
    ignore: [
        `${src}/components/*/[A-Z]*.jsx`,
        `${src}/MappedComponents.js`,
        '**/__tests__/**',
        '**/*.test.{js,jsx,ts,tsx}',
        '**/*.spec.{js,jsx,ts,tsx}',
        '**/*.d.ts',
    ],
    styleguideComponents: {
        Wrapper: `${src}/lib/SparkTheme`,
    },
};


