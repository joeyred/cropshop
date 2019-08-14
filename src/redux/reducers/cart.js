/**
 * Copyright (c) 2019-present, Brian J. Hayes.
 *
 * https://github.com/joeyred
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  ADD_ITEMS_START,
  ADD_ITEMS_FINISH,
  ADD_ITEM_START,
  ADD_ITEM_SUCCESS,
  ADD_ITEM_FAILURE,
  ADD_ITEM_FINALLY,
  // UPDATE_PROGRESS,
  DONE_EDITING,
  RESET_ITEMS
} from '../actions/cart';

const initialState = {
  itemsToAdd: 0,
  itemsAdded: 0,
  itemsErrored: 0,
  currentItemIndex: 0,
  errors: [],
  addingItems: false,
  currentItem: null
};

export default function Cart(state = initialState, action) {
  switch (action.type) {
    case ADD_ITEMS_START: {
      const { itemsToAdd } = action;
      return {
        ...state,
        addingItems: true,
        itemsToAdd
      };
    }
    case ADD_ITEMS_FINISH: {
      return {
        ...state,
        addingItems: false,
        currentItemIndex: 0
      };
    }
    case ADD_ITEM_START: {
      const { item } = action;
      return {
        ...state,
        currentItem: item
      };
    }
    case ADD_ITEM_SUCCESS: {
      // const { itemsAdded } = action;
      return {
        ...state,
        itemsAdded: state.itemsAdded + 1
      };
    }
    case ADD_ITEM_FAILURE: {
      const { error } = action;
      return {
        ...state,
        itemsErrored: state.itemsErrored + 1,
        errors: [...state.errors, error]
      };
    }
    case ADD_ITEM_FINALLY: {
      const { currentItemIndex } = action;
      return {
        ...state,
        currentItemIndex
      };
    }
    case DONE_EDITING: {
      return {
        ...state,
        errors: null,
        itemsAdded: 0,
        itemsErrored: 0
      };
    }
    case RESET_ITEMS: {
      return {
        ...initialState
      };
    }
    default: {
      return state;
    }
  }
}
