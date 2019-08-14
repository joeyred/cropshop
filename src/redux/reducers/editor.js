/**
 * Copyright (c) 2019-present, Brian J. Hayes.
 *
 * https://github.com/joeyred
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// import {
//   TOGGLE_OPTION,
//   UPDATE_ROTATION,
//   UPDATE_CROP,
//   UPDATE_ZOOM,
//   STORE_IMAGE_DIMENSIONS,
//   UPDATE_ARTBOARD_DIMENSIONS,
//   UPDATE_CROP_FULL_CENTERED
// } from '../actiontypes/editor';

import {
  TOGGLE_OPTION,
  UPDATE_ROTATION,
  UPDATE_CROP,
  UPDATE_ZOOM,
  STORE_IMAGE_DIMENSIONS,
  UPDATE_ARTBOARD_DIMENSIONS,
  UPDATE_CROP_FULL_CENTERED,
  UPDATE_WORKSPACE_SIZE,
  UPDATE_LOADING_STATUS,
  RESET_EDITOR
} from '../actions/editor';
import generateSizesToRender from '../../utils/editor';
import { calcCropFullCentered, getAspectRatio } from '../../utils/crop';

const initialState = {
  scaleX: 0,
  scaleY: 0,
  aspectRatio: {
    width: 1,
    height: 1
  },
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
  artboardPadding: 0,
  artboardSize: {
    width: 0,
    height: 0
  },
  containerSize: {
    width: 0,
    height: 0
  },
  imageSize: {
    width: 0,
    height: 0
  },
  imageSizeRendered: {
    width: 0,
    height: 0
  },
  imageProps: {
    ref: null,
    height: 0,
    width: 0,
    naturalHeight: 0,
    naturalWidth: 0
  },
  loading: true,
  loaded: false,
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
    case UPDATE_LOADING_STATUS: {
      return {
        ...state,
        loading: action.isLoading
      };
    }
    case RESET_EDITOR: {
      return {
        ...initialState
      };
      // return {
      //   ...state,
      //   rotate: 0,
      //   loading: true
      // };
    }
    case UPDATE_ROTATION: {
      const { degree } = action;
      const { containerSize, artboardPadding, imageSize, aspectRatio } = state;
      const { artboardSize, imageSizeRendered } = generateSizesToRender(
        containerSize,
        imageSize,
        artboardPadding,
        degree
      );
      const crop = calcCropFullCentered(
        aspectRatio.width,
        aspectRatio.height,
        imageSizeRendered.width,
        imageSizeRendered.height
      );
      return {
        ...state,
        rotate: degree,
        artboardSize: {
          ...artboardSize
        },
        imageSizeRendered: {
          ...imageSizeRendered
        },
        crop: {
          ...state.crop,
          ...crop
        },
        loading: true
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
      const { crop, aspectRatio } = action;
      return {
        ...state,
        aspectRatio,
        crop: {
          ...crop
        }
      };
    }
    case UPDATE_ARTBOARD_DIMENSIONS: {
      const { artboardSize, artboardPadding, imageSize } = action;
      return {
        ...state,
        artboardPadding,
        artboardSize,
        imageSize
      };
    }
    case UPDATE_WORKSPACE_SIZE: {
      const {
        containerSize,
        artboardSize,
        artboardPadding,
        imageSizeRendered,
        imageSize,
        aspectRatio,
        crop
      } = action;
      return {
        ...state,
        aspectRatio,
        containerSize: {
          ...containerSize
        },
        artboardPadding,
        artboardSize: {
          ...artboardSize
        },
        imageSizeRendered: {
          ...imageSizeRendered
        },
        imageSize: {
          ...imageSize
        },
        crop: {
          ...crop,
          aspect: getAspectRatio(aspectRatio)
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
