const UPDATE_APP_SIZE = 'size/UPDATE_APP_SIZE';
const SET_BREAKPOINT = 'size/SET_BREAKPOINT';
const initialState = {
  breakpoint: null,
  app: {
    width: null,
    height: null
  },

};

export const updateAppSize = ({ width, height }) => {
  const size = {};
  if (width) size.width = width;
  if (height) size.height = height;
  console.log(size);
  return {
    type: UPDATE_APP_SIZE,
    size
  };
};

export const setBreakpoint = breakpoint => ({
  type: SET_BREAKPOINT,
  breakpoint
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
    case SET_BREAKPOINT: {
      const { breakpoint } = action;
      return {
        ...state,
        breakpoint
      };
    }
    default: {
      return state;
    }
  }
}
