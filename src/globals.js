/**
 * Copyright (c) 2019-present, Brian J. Hayes.
 *
 * https://github.com/joeyred
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import SimpleCrypto from 'simple-crypto-js';

const production = process.env.NODE_ENV === 'production';
const key = JSON.stringify(process.env.REACT_APP_SFS_KEY);
const crypto = new SimpleCrypto(key);

// NOTE This is gotten from a globally defined variable.
//      Yes I know this sucks...
//      It's Shopify...
// eslint-disable-next-line no-undef
const siteData = CropshopData;

let appApiUrl = 'https://ded1e8ec.ngrok.io';
let cartUrl = `${appApiUrl}/api/test/cart`;
let storeUrl = '';
// let ajaxEndpoint = '/pages/cropshop-api';

if (production && siteData) {
  cartUrl = '/cart/add.js';
  appApiUrl = crypto.decrypt(siteData.shop.tunnelUrl);
  storeUrl = siteData.shop.domain;
}

// if (!production) {
//   ajaxEndpoint = `https://${storeUrl}${ajaxEndpoint}`;
// }

// eslint-disable-next-line no-unneeded-ternary
export const DEBUG = siteData.shop.debug === 'true' ? true : false;

export const AppAtts = {
  ID: 'cropshop_app',
  MODAL_ID: 'cropshop_app_modal',
  APP_API_URL: appApiUrl,
  CART_URL: cartUrl,
  STORE_URL: storeUrl,
  AJAX_ENDPOINT: '/pages/cropshop-api'
};

export const ExternalDataAtts = {
  MODAL_OPEN: 'data-cropshop-open',
  MODAL_CLOSE: 'data-cropshop-close',
  COLLECTION: 'data-cropshop-collection'
};

export const Views = {
  UPLOAD: 'upload',
  EDIT: 'edit',
  GALLERY: 'gallery',
  PREVIEW: 'preview',
  ADDING_TO_CART: 'adding-to-cart'
};

export const Breakpoints = {
  sm: 0,
  md: 640,
  lg: 740,
  xl: 1200,
  xxl: 1440
};

export {production};
