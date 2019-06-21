/**
 * Copyright (c) 2019-present, Brian J. Hayes.
 *
 * https://github.com/joeyred
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  TOGGLE_OPTION,
  UPDATE_ROTATION,
  UPDATE_CROP,
  UPDATE_ZOOM,
  STORE_IMAGE_DIMENSIONS,
  UPDATE_CROP_FULL_CENTERED
} from '../actiontypes/editor';

const initialState = {
  scaleX: 0,
  scaleY: 0,
  rotate: 0,
  zoom: 1,
  flip: false,
  flop: false,
  crop: {
    aspect: 0,
    width: 0,
    x: 0,
    y: 0
  },
  imageProps: {
    ref: null,
    height: 0,
    width: 0,
    naturalHeight: 0,
    naturalWidth: 0
  },

  edit: {}
};

export default function Editor(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_OPTION: {
      const { option } = action;
      return {
        ...state,
        [option]: !state[option]
      };
    }
    case UPDATE_ROTATION: {
      const { degree } = action;
      return {
        ...state,
        rotate: degree
      };
    }
    case UPDATE_ZOOM: {
      const { scale } = action;
      return {
        ...state,
        zoom: scale
      };
    }
    case UPDATE_CROP: {
      return {
        ...state,
        crop: {
          ...state.crop,
          ...action.crop
        }
      };
    }
    case UPDATE_CROP_FULL_CENTERED: {
      return {
        ...state,
        crop: {
          ...action.crop
        }
      };
    }
    case STORE_IMAGE_DIMENSIONS: {
      return {
        ...state,
        imageProps: {
          ...state.imageProps,
          ...action.imageProps
        }
      };
    }
    default: {
      return state;
    }
  }
}
