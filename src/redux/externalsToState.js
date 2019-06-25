/**
 * Copyright (c) 2019-present, Brian J. Hayes.
 *
 * https://github.com/joeyred
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const EXTERNALS_TO_STATE = 'externals/EXTERNALS_TO_STATE';

const initialState = {
  shop: '',
  products: '',
  cartUrl: ''
};

export const externalsToState = data => ({
  type: EXTERNALS_TO_STATE,
  data
});

export function ExternalsReducer(state = initialState, action) {
  switch (action.type) {
    case EXTERNALS_TO_STATE: {
      // console.log(action.data.cartUrl);
      return {
        ...state,
        shop: action.data.shop,
        products: action.data.products,
        cartUrl: action.data.cartUrl
      };
    }
    default: {
      return state;
    }
  }
}
