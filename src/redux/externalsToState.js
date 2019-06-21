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
