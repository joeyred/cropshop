/**
 * Copyright (c) 2019-present, Brian J. Hayes.
 *
 * https://github.com/joeyred
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import axios from 'axios';
import {
  FETCH_API_KEY_START,
  FETCH_API_KEY_SUCCESS,
  FETCH_API_KEY_FAILURE
} from '../actiontypes/filestack';
import { AppAtts } from '../../globals';

const start = () => ({
  type: FETCH_API_KEY_START
});

const success = key => ({
  type: FETCH_API_KEY_SUCCESS,
  payload: key
});

const failure = error => ({
  type: FETCH_API_KEY_FAILURE,
  payload: {
    error
  }
});

export const fetchApiKey = store => {
  return (dispatch, getState) => {
    const { key } = getState();
    // The initial state of `key` is `false`
    if (key) return;

    dispatch(start());

    axios
      .get(`${AppAtts.APP_API_URL}/api/${store}/filestack`)
      .then(response => {
        // console.log(response.data);
        dispatch(success(response.data.data));
      })
      .catch(error => {
        dispatch(failure(error));
      });
  };
};

export const bullshit = 'bullshit';
