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

// const filteredFrames = (collectionName, frames) => {
//   return compact(
//     map(frames.allIds, id => {
//       let isInCollection = false;
//       const frame = frames.byId[id];
//       map(frame.collections, collection => {
//         // console.log(collection.handle);
//         if (collection.handle === collectionName) {
//           isInCollection = true;
//         }
//       });
//
//       if (isInCollection) {
//         return frame;
//       }
//       return null;
//     })
//   );
// };
//
// const sortedFrames = frames => {
//   return sortBy(frames, [
//     object => {
//       return object.width < object.height
//         ? object.height / object.width
//         : object.width / object.height;
//     },
//     'height'
//   ]);
// };

export const updateSelectedFrame = id => ({
  type: UPDATE_SELECTED_FRAME,
  id
});
export const updateSelectedCollection = collectionName => {
  return {
    type: UPDATE_SELECTED_COLLECTION,
    collectionName
  };
};

export const addFrame = frame => {
  const { id, price, collections, variants, customFields } = frame;
  const formatedPrice = price / 100;
  const fields = JSON.parse(customFields);
  const width = fields.print.width * 1;
  const height = fields.print.height * 1;
  const display = {
    width: fields.display.width * 1,
    height: fields.display.height * 1
  };
  return {
    type: ADD_FRAME,
    payload: {
      id: uniqid(),
      productId: id,
      variantId: variants[0].id,
      price: formatedPrice.toFixed(2),
      collections,
      // TODO convert this to object with explicit keys
      dimensions: [width, height],
      display,
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
