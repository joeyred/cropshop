/**
 * Copyright (c) 2019-present, Brian J. Hayes.
 *
 * https://github.com/joeyred
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const UPDATE_APP_SIZE = 'size/UPDATE_APP_SIZE';
const UPDATE_TOPBAR_HEIGHT = 'size/UPDATE_TOPBAR_HEIGHT';
const SET_BREAKPOINT = 'size/SET_BREAKPOINT';
const SET_ORIENTATION = 'size/SET_ORIENTATION';

const initialState = {
  breakpoint: null,
  app: {
    width: null,
    height: null,
    isPortrait: null
  },
  topbarHeight: null,
  availableHeight: null
};

export const updateAppSize = ({ width, height }) => {
  const size = {};
  if (width) size.width = width;
  if (height) size.height = height;
  // console.log(size);
  return {
    type: UPDATE_APP_SIZE,
    size
  };
};

export const updateTopBarHeight = height => ({
  type: UPDATE_TOPBAR_HEIGHT,
  height
});

export const setBreakpoint = breakpoint => ({
  type: SET_BREAKPOINT,
  breakpoint
});

export const setOrientation = isPortrait => ({
  type: SET_ORIENTATION,
  isPortrait
});

export function SizeReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_APP_SIZE: {
      const { size } = action;
      return {
        ...state,
        app: {
          ...state.app,
          ...size
        }
      };
    }
    case UPDATE_TOPBAR_HEIGHT: {
      const { height } = action;
      let appHeight =
        window.innerHeight || document.documentElement.clientHeight;
      if (state.app.height) {
        appHeight = state.app.height;
      }
      // console.log(appHeight, height);
      return {
        ...state,
        topbarHeight: height,
        availableHeight: appHeight - height
      };
    }
    case SET_BREAKPOINT: {
      const { breakpoint } = action;
      return {
        ...state,
        breakpoint
      };
    }
    case SET_ORIENTATION: {
      const { isPortrait } = action;
      return {
        ...state,
        app: {
          ...state.app,
          isPortrait
        }
      };
    }
    default: {
      return state;
    }
  }
}
