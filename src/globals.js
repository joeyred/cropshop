/**
 * Copyright (c) 2019-present, Brian J. Hayes.
 *
 * https://github.com/joeyred
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

let appApiUrl = 'https://48c91d68.ngrok.io';
let cartUrl = `${appApiUrl}/api/test/cart`;
if (process.env.NODE_ENV === 'production') {
  // TODO Update this with the URL of the heroku app
  appApiUrl = 'https://cropshop-for-shopify.herokuapp.com';
  cartUrl = '/cart/add.js';
}

export const AppAtts = {
  ID: 'cropshop_app',
  MODAL_ID: 'cropshop_app_modal',
  APP_API_URL: appApiUrl,
  CART_URL: cartUrl
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

export const Frames = {
  byId: {
    '01': {
      id: '01',
      productId: 'kgfkhgfh', // generated by shopify
      productCollectionId: 'picfoams', // generated by shopify
      display: [8, 8],
      exact: [7.75, 7.75],
      price: 9.95
    },
    '02': {
      id: '02',
      productId: 'dfgsadg', // generated by shopify
      productCollectionId: 'picfoams', // generated by shopify
      display: [8, 12],
      exact: [7.75, 11.75],
      price: 9.95
    },
    '03': {
      id: '03',
      productId: 'sadgsadgsafg', // generated by shopify
      productCollectionId: 'picfoams', // generated by shopify
      display: [12, 8],
      exact: [11.75, 7.75],
      price: 9.95
    },
    '04': {
      id: '04',
      productId: 'sdgasdgasdfs', // generated by shopify
      productCollectionId: 'picfoams', // generated by shopify
      display: [8, 16],
      exact: [7.75, 15.75],
      price: 9.95
    },
    '05': {
      id: '05',
      productId: 'sadfasdfsdaf', // generated by shopify
      productCollectionId: 'picfoams', // generated by shopify
      display: [16, 8],
      exact: [15.75, 7.75],
      price: 9.95
    }
  },
  allIds: ['01', '02', '03', '04', '05']
};
