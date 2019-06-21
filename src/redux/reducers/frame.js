/**
 * Copyright (c) 2019-present, Brian J. Hayes.
 *
 * https://github.com/joeyred
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  UPDATE_SELECTED_FRAME,
  UPDATE_SELECTED_COLLECTION,
  ADD_FRAME
} from '../actiontypes/frame';

const initialState = {
  frames: {
    byId: {},
    allIds: []
  },
  loaded: false,
  loading: false,
  selectedFrameId: null,
  selectedCollectionId: null,
  error: null
};

export default function Frame(state = initialState, action) {
  switch (action.type) {
    case UPDATE_SELECTED_FRAME: {
      return {
        ...state,
        selectedFrameId: action.id
      };
    }
    case UPDATE_SELECTED_COLLECTION: {
      return {
        ...state,
        selectedCollectionId: action.collectionName
      };
    }
    case ADD_FRAME: {
      const {
        id,
        productId,
        variantId,
        collections,
        price,
        dimensions,
        aspectRatio,
        width,
        height
      } = action.payload;
      return {
        ...state,
        frames: {
          byId: {
            ...state.frames.byId,
            [id]: {
              id,
              productId,
              variantId,
              collections,
              price,
              dimensions,
              aspectRatio,
              width,
              height
            }
          },
          allIds: [...state.frames.allIds, id]
        }
      };
    }
    default: {
      return state;
    }
  }
}
