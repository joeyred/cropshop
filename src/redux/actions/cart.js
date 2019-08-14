/**
 * Copyright (c) 2019-present, Brian J. Hayes.
 *
 * https://github.com/joeyred
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import axios from 'axios';
import { AppAtts } from '../../globals';

export const ADD_ITEM_START = 'cart/ADD_ITEM_START';
export const ADD_ITEM_SUCCESS = 'cart/ADD_ITEM_SUCCESS';
export const ADD_ITEM_FAILURE = 'cart/ADD_ITEM_FAILURE';
export const ADD_ITEM_FINALLY = 'cart/ADD_ITEM_FINALLY';
export const ADD_ITEMS_START = 'cart/ADD_ITEMS_START';
export const ADD_ITEMS_FINISH = 'cart/ADD_ITEMS_FINISH';
export const UPDATE_PROGRESS = 'cart/UPDATE_PROGRESS';
export const DONE_EDITING = 'cart/DONE_EDITING';
export const RESET_ITEMS = 'cart/RESET_ITEMS';

// Let's break some rules
let index = 0;

const startAddingItems = itemsToAdd => ({
  type: ADD_ITEMS_START,
  itemsToAdd
});

const finishAddingItems = () => ({
  type: ADD_ITEMS_FINISH
});

const start = item => ({
  type: ADD_ITEM_START,
  item
});

const success = previousItemsAdded => ({
  type: ADD_ITEM_SUCCESS,
  itemsAdded: previousItemsAdded + 1
});

const failure = (error, previousItemsErrored) => ({
  type: ADD_ITEM_FAILURE,
  error,
  itemsErrored: previousItemsErrored + 1
});

const next = (items, addItemToCart, dispatch) => {
  dispatch(addItemToCart(items));
  return {
    type: ADD_ITEM_FINALLY,
    currentItemIndex: index
  };
};

export const resetItems = () => ({
  type: RESET_ITEMS
});

export const addItemToCart = items => {
  return dispatch => {
    // console.log(itemsAdded, itemsErrored, currentItemIndex);
    // const itemsProcessed = itemsAdded + itemsErrored;
    if (index === 0) {
      // console.log('started adding items');
      dispatch(startAddingItems(items.length));
    }
    // console.log(items.length, itemsProcessed);

    // if all items have been added to cart, then stop the recursion.
    if (items.length === index) {
      dispatch(finishAddingItems());
      index = 0;
      return;
    }

    dispatch(start(items[index]));

    axios
      .post(AppAtts.CART_URL, items[index])
      .then(() => {
        // console.log(response.data);
        dispatch(success());
        index += 1;
        dispatch(next(items, addItemToCart, dispatch));
      })
      .catch(error => {
        dispatch(failure(error));
        index += 1;
        dispatch(next(items, addItemToCart, dispatch));
      });
    // .finally(() => {
    //   index += 1;
    //   dispatch(next(items, addItemToCart, dispatch));
    // });
  };
};

export const updatedProgress = stuff => ({
  type: UPDATE_PROGRESS,
  stuff
});

export const doneEditing = () => ({
  type: DONE_EDITING
});
