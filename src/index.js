/**
 * Copyright (c) 2019-present, Brian J. Hayes.
 *
 * https://github.com/joeyred
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// React
import React from 'react';
import ReactDOM from 'react-dom';
// Remote Logging
// import * as Sentry from '@sentry/browser';
// Redux
import { Provider } from 'react-redux';
import uniqid from 'uniqid';
import SimpleCrypto from 'simple-crypto-js';
import store from './redux/store';

// This will do fun stuff outside the scope of React
import CropShopButton from './utils/CropShopButton';
import AppHeight from './utils/onResize';
import { initReporter } from './utils/reporter';
// import { fetchApiKey } from './redux/actions/filestack';
import { externalsToState } from './redux/externalsToState';
import { getConfig } from './redux/config';
import { fetchFrames } from './redux/actions/frame';

import { AppAtts, production } from './globals';

// Components
import App from './App';
// Util
import * as serviceWorker from './serviceWorker';

const key = JSON.stringify(process.env.REACT_APP_SFS_KEY);
const crypto = new SimpleCrypto(key);

// NOTE This is gotten from a globally defined variable.
//      Yes I know this sucks...
//      It's Shopify...
// eslint-disable-next-line no-undef
const siteData = CropshopData;

const initExternalStuff = () => {
  const buttonNodes = document.querySelectorAll('[data-cropshop-open]');
  const appNode = document.getElementById('cropshop_app');

  const buttons = {};

  for (let i = 0; i < buttonNodes.length; i += 1) {
    const buttonId = uniqid();
    buttons[buttonId] = new CropShopButton(
      buttonNodes[i],
      appNode,
      'cropshop_app_modal'
    );

    buttons[buttonId].init();
  }
};

initReporter(production, {
  dsn: 'https://65b9b75ec92e4c0e80342465b9e45c14@sentry.io/1514878',
  release: `cropshop@${process.env.REACT_APP_VERSION}`
});

// Sentry.init({
//   dsn: 'https://65b9b75ec92e4c0e80342465b9e45c14@sentry.io/1514878',
//   release: `cropshop@${process.env.REACT_APP_VERSION}`
// });

const initApp = () => {
  const config = siteData.config || {};
  store.dispatch(
    externalsToState({
      shop: siteData.shop.domain,
      // products: siteData.products,
      cartUrl: siteData.cartUrl,
      filestackApiKey: crypto.decrypt(siteData.shop.filestackApiKey),
      tunnelUrl: crypto.decrypt(siteData.shop.tunnelUrl),
      // eslint-disable-next-line no-unneeded-ternary
      debug: siteData.shop.debug === 'true' ? true : false
    })
  );

  store.dispatch(getConfig(config));

  store.dispatch(fetchFrames(siteData.shop.domain));

  AppHeight.init();

  ReactDOM.render(
    // eslint-disable-next-line react/jsx-filename-extension
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById(AppAtts.ID)
  );

  initExternalStuff();
};

if (siteData) {
  initApp();
}


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
