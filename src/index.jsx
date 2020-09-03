import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Bowser from 'bowser';

import { ModelManager, Constants } from '@adobe/cq-spa-page-model-manager';
import App from './App';
import './MappedComponents';
import ScrollToTop from '#utils/RouteHelper';
import BrowserUnsupportedPage from '#lib/BrowserUnsupportedPage';

const browser = Bowser.getParser(window.navigator.userAgent);
const browserName = browser.getBrowserName();

function render(model) {
    ReactDOM.render(
        <BrowserRouter>
            <ScrollToTop>
                <App
                    cqChildren={model[Constants.CHILDREN_PROP]}
                    cqItems={model[Constants.ITEMS_PROP]}
                    cqItemsOrder={model[Constants.ITEMS_ORDER_PROP]}
                    cqPath={ModelManager.rootPath}
                    locationPathname={window.location.pathname}
                />
            </ScrollToTop>
        </BrowserRouter>,
        document.getElementById('root'),
    );
}

if (browserName === 'Internet Explorer') {
    ReactDOM.render(<BrowserUnsupportedPage />, document.getElementById('root'));
} else {
    ModelManager.initialize({ path: process.env.REACT_APP_PAGE_MODEL_PATH }).then(render);
}
