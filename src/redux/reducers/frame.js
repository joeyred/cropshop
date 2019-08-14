/**
 * Copyright (c) 2019-present, Brian J. Hayes.
 *
 * https://github.com/joeyred
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import compact from 'lodash/compact';
import map from 'lodash/map';
import sortBy from 'lodash/sortBy';
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
  frameList: [],
  loaded: false,
  loading: false,
  selectedFrameId: null,
  selectedCollectionId: null,
  error: null
};

const filteredFrames = (collectionName, frames) => {
  return compact(
    map(frames.allIds, id => {
      let isInCollection = false;
      const frame = frames.byId[id];
      map(frame.collections, collection => {
        // console.log(collection.handle);
        if (collection.title === collectionName) {
          isInCollection = true;
        }
      });

      if (isInCollection) {
        return frame;
      }
      return null;
    })
  );
};

const sortedFrames = frames => {
  return sortBy(frames, [
    object => {
      return object.width < object.height
        ? object.height / object.width
        : object.width / object.height;
    },
    'height'
  ]);
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
      const { collectionName } = action;
      const frameList = sortedFrames(
        filteredFrames(collectionName, state.frames)
      );
      return {
        ...state,
        selectedCollectionId: collectionName,
        frameList,
        selectedFrameId: frameList[0].id
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
        display,
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
              display,
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
