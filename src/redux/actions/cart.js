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
import {
  ADD_ITEMS_START,
  ADD_ITEMS_FINISH,
  ADD_ITEM_START,
  ADD_ITEM_SUCCESS,
  ADD_ITEM_FAILURE,
  ADD_ITEM_FINALLY,
  UPDATE_PROGRESS,
  DONE_EDITING
} from '../actiontypes/cart';

// Let's break some rules
let index = 0;

const startAddingItems = () => ({
  type: ADD_ITEMS_START
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

const next = (items, previousItemIndex, addItemToCart, dispatch) => {
  dispatch(addItemToCart(items));
  return {
    type: ADD_ITEM_FINALLY,
    currentItemIndex: previousItemIndex + 1
  };
};

export const addItemToCart = items => {
  return (dispatch, getState) => {
    // if all items have been added to cart, then stop the recursion.
    const {
      itemsAdded = 0,
      itemsErrored = 0,
      currentItemIndex = 0
    } = getState();
    // console.log(itemsAdded, itemsErrored, currentItemIndex);
    // const itemsProcessed = itemsAdded + itemsErrored;
    if (index === 0) {
      // console.log('started adding items');
      dispatch(startAddingItems());
    }
    // console.log(items.length, itemsProcessed);
    if (items.length === index) {
      dispatch(finishAddingItems());
      return;
    }

    dispatch(start(itemsAdded));

    axios
      .post(AppAtts.CART_URL, items[index])
      .then(response => {
        // console.log(response.data);
        dispatch(success(itemsAdded));
      })
      .catch(error => {
        dispatch(failure(error, itemsErrored));
      })
      .finally(() => {
        index += 1;
        dispatch(next(items, currentItemIndex, addItemToCart, dispatch));
      });
  };
};

export const updatedProgress = stuff => ({
  type: UPDATE_PROGRESS,
  stuff
});

export const doneEditing = () => ({
  type: DONE_EDITING
});
