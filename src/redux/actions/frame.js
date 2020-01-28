/**
 * Copyright (c) 2019-present, Brian J. Hayes.
 *
 * https://github.com/joeyred
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import axios from 'axios';
import uniqid from 'uniqid';

import {
  UPDATE_SELECTED_FRAME,
  UPDATE_SELECTED_COLLECTION,
  ADD_FRAME
} from '../actiontypes/frame';
import { AppAtts } from '../../globals';
// import Debug from '../../utils/debug';

export const FETCH_FRAMES_START = 'frame/FETCH_FRAMES_START';
export const FETCH_FRAMES_SUCCESS = 'frame/FETCH_FRAMES_SUCCESS';
export const FETCH_FRAMES_FAILURE = 'frame/FETCH_FRAMES_FAILURE';

export const updateSelectedFrame = id => ({
  type: UPDATE_SELECTED_FRAME,
  id
});
export const updateSelectedCollection = collectionName => {
  return {
    type: UPDATE_SELECTED_COLLECTION,
    collectionName
  };
};

export const addFrame = frame => {
  const { id, price, collections, variants, customFields } = frame;
  const formatedPrice = price / 100;
  const fields = JSON.parse(customFields);
  const width = fields.print.width * 1;
  const height = fields.print.height * 1;
  const display = {
    width: fields.display.width * 1,
    height: fields.display.height * 1
  };
  return {
    type: ADD_FRAME,
    payload: {
      id: uniqid(),
      productId: id,
      variantId: variants[0].id,
      price: formatedPrice.toFixed(2),
      collections,
      // TODO convert this to object with explicit keys
      dimensions: [width, height],
      display,
      aspectRatio: width / height,
      width,
      height
    }
  };
};
const parseJSON = json => {
  try {
    return JSON.parse(json);
  } catch (error) {
    console.log(`JSON FAILED TO PARSE: ${error}`);
    return false;
  }
};
const productToFrame = (id, product) => {
  const { collections, variants, customFields } = product;
  const fields = parseJSON(customFields);
  if (!fields) {
    return false;
  }
  const width = fields.print.width * 1;
  const height = fields.print.height * 1;
  const display = {
    width: fields.display.width * 1,
    height: fields.display.height * 1
  };

  return {
    id,
    productId: product.id,
    variantId: variants[0].id,
    price: variants[0].price,
    collections,
    dimensions: [width, height],
    display,
    aspectRatio: width / height,
    width,
    height
  };

  // console.log('all is lost');
};

const productsToFrames = products => {
  const byId = {};
  const allIds = [];
  let id;
  let frame;
  // console.log(products.length);
  for (let i = 0; products.length > i; i += 1) {
    id = uniqid();
    frame = productToFrame(id, products[i]);
    // console.log(`Frame: ${id} ${frame}`);
    if (frame) {
      byId[id] = frame;
      allIds.push(id);
    }
  }
  return {
    byId,
    allIds
  };
};

const start = () => ({
  type: FETCH_FRAMES_START
});

const success = response => ({
  type: FETCH_FRAMES_SUCCESS,
  payload: response
});

const failure = error => ({
  type: FETCH_FRAMES_FAILURE,
  payload: {
    error
  }
});

export const fetchFrames = store => {
  return dispatch => {
    dispatch(start());
    axios
      .get(`${AppAtts.APP_API_URL}/api/${store}/products`)
      .then(response => {
        // console.log(response);
        const products = response.data;
        // console.log(products.data);
        const frames = productsToFrames(products.data);
        // console.log(frames);
        dispatch(success(frames));
      })
      .catch(error => {
        dispatch(failure(error));
      });
  };
};
