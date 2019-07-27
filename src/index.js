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
// Redux
import { Provider } from 'react-redux';
// import smoothscroll from 'smoothscroll-polyfill';
import uniqid from 'uniqid';
import map from 'lodash/map';
import SimpleCrypto from 'simple-crypto-js';
import store from './redux/store';

// This will do fun stuff outside the scope of React
import CropShopButton from './utils/CropShopButton';
import AppHeight from './utils/onResize';
// import { fetchApiKey } from './redux/actions/filestack';
import { externalsToState } from './redux/externalsToState';
import { addFrame } from './redux/actions/frame';
import { AppAtts } from './globals';

// Components
import App from './App';
// Util
import * as serviceWorker from './serviceWorker';
// Styles
// import "./index.css";
const key = JSON.stringify(process.env.REACT_APP_SFS_KEY);
const crypto = new SimpleCrypto(key);

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

// NOTE This is gotten from a globally defined variable.
//      Yes I know this sucks...
//      It's Shopify...
// eslint-disable-next-line no-undef
const siteData = CropshopData;
// store.dispatch(setStorefrontDomain(storeDomain));
store.dispatch(
  externalsToState({
    shop: siteData.shop.domain,
    products: siteData.products,
    cartUrl: siteData.cartUrl,
    filestackApiKey: crypto.decrypt(siteData.shop.filestackApiKey),
    // eslint-disable-next-line no-unneeded-ternary
    debug: siteData.shop.debug === 'true' ? true : false
  })
);
// console.log(siteData.cartUrl);
// store.dispatch(fetchApiKey(siteData.shop.domain));
// store.dispatch(fetchStorefrontToken(storeDomain));

map(siteData.products, product => {
  store.dispatch(addFrame(product));
});

AppHeight.init();
// smoothscroll.polyfill();

ReactDOM.render(
  // eslint-disable-next-line react/jsx-filename-extension
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById(AppAtts.ID)
);

initExternalStuff();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
