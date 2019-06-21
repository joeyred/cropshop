import axios from 'axios';
import Client from 'shopify-buy';
import { AppAtts } from '../globals';

const FETCH_STOREFRONT_TOKEN_START = 'storefront/FETCH_STOREFRONT_TOKEN_START';
const FETCH_STOREFRONT_TOKEN_SUCCESS =
  'storefront/FETCH_STOREFRONT_TOKEN_SUCCESS';
const FETCH_STOREFRONT_TOKEN_FAILURE =
  'storefront/FETCH_STOREFRONT_TOKEN_FAILURE';
const SET_STOREFRONT_DOMAIN = 'storefront/SET_STOREFRONT_DOMAIN';

const initialState = {
  loading: false,
  loaded: false,
  domain: null,
  // token: {
  //   accessToken: false,
  //   accessScope: null,
  //   adminGraphQLApiId: null,
  //   id: null,
  //   title: null
  // },
  token: false,
  error: null,
  client: false
};

const start = () => ({
  type: FETCH_STOREFRONT_TOKEN_START
});

const success = (token, store) => ({
  type: FETCH_STOREFRONT_TOKEN_SUCCESS,
  payload: token,
  // WARNING DO NOT OVERWRITE THIS
  client: Client.buildClient({
    storefrontAccessToken: token.accessToken,
    domain: store
  })
});

const failure = error => ({
  type: FETCH_STOREFRONT_TOKEN_FAILURE,
  payload: {
    error
  }
});

export const fetchStorefrontToken = store => {
  return (dispatch, getState) => {
    const { token } = getState();
    // The initial state of `token` is `false`
    if (token) return;

    dispatch(start());

    axios
      .get(`${AppAtts.APP_API_URL}/api/${store}/storefront`)
      .then(response => {
        // console.log(response.data);
        dispatch(success(response.data.data, store));
      })
      .catch(error => {
        dispatch(failure(error));
      });
  };
};

/**
 * Set the store domain this app will be working with
 * @method setStorefrontDomain
 * @param  {String}            domain - The store domain
 * @example myexamplestore.myshopify.com
 */
export const setStorefrontDomain = domain => ({
  type: SET_STOREFRONT_DOMAIN,
  domain
});

export function StorefrontReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_STOREFRONT_TOKEN_START: {
      return {
        ...state,
        loading: true
      };
    }
    case FETCH_STOREFRONT_TOKEN_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true,
        token: {
          ...action.payload
        }
      };
    }
    case FETCH_STOREFRONT_TOKEN_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    }
    case SET_STOREFRONT_DOMAIN: {
      return {
        ...state,
        domain: action.domain
      };
    }
    default: {
      return state;
    }
  }
}
