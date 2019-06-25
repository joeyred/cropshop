/**
 * Copyright (c) 2019-present, Brian J. Hayes.
 *
 * https://github.com/joeyred
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import uniqid from 'uniqid';
import {
  UPDATE_SELECTED_FRAME,
  UPDATE_SELECTED_COLLECTION,
  ADD_FRAME
  // FETCH_FRAMES_START,
  // FETCH_FRAMES_SUCCESS,
  // FETCH_FRAMES_FAILURE
} from '../actiontypes/frame';

export const updateSelectedFrame = id => ({
  type: UPDATE_SELECTED_FRAME,
  id
});
export const updateSelectedCollection = collectionName => ({
  type: UPDATE_SELECTED_COLLECTION,
  collectionName
});

export const addFrame = frame => {
  const { id, price, collections, variants, customFields } = frame;
  const formatedPrice = price / 100;
  const fields = JSON.parse(customFields);
  const width = parseInt(fields.display.width, 10);
  const height = parseInt(fields.display.height, 10);
  return {
    type: ADD_FRAME,
    payload: {
      id: uniqid(),
      productId: id,
      variantId: variants[0].id,
      price: formatedPrice.toFixed(2),
      collections,
      dimensions: [width, height],
      aspectRatio: width / height,
      width,
      height
    }
  };
};

// const start = () => ({
//   type: FETCH_FRAMES_START
// });
//
// const success = response => ({
//   type: FETCH_FRAMES_SUCCESS,
//   payload: response
// });
//
// const failure = error => ({
//   type: FETCH_FRAMES_FAILURE,
//   payload: {
//     error
//   }
// });
//
// export const fetchFrames = client => {
//   return (dispatch, getState) => {
//     const { frames } = getState();
//
//     if (frames) return;
//     dispatch(start());
//     client.product
//       .fetchQuery({ tag: 'custom' })
//       .then(response => {
//         console.log(response);
//         dispatch(success(response));
//       })
//       .catch(error => {
//         dispatch(failure(error));
//       });
//   };
// };
