/**
 * Copyright (c) 2019-present, Brian J. Hayes.
 *
 * https://github.com/joeyred
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Cookies from 'js-cookie';
// import { indexOf, omit } from 'lodash';
import indexOf from 'lodash/indexOf';
import omit from 'lodash/omit';
import {
  ADD_IMAGE,
  IMAGE_SIZE,
  REMOVE_IMAGE,
  SAVE_EDIT,
  REMOVE_EDIT,
  UPDATE_PREVIEW,
  UPDATE_QUANTITY
} from '../actiontypes/image';

const cookieName = 'cropshop_images';
// import mockImg from '../../imgs/mock-img-vertical.jpg';

// import imgMock from '../../imgs/IMG_0408.jpg';
const cookie = Cookies.getJSON(cookieName);
// console.log(cookie);
let images = {
  byId: {},
  allIds: []
};
if (process.env.NODE_ENV === 'development') {
  images = cookie || {
    byId: {},
    allIds: []
  };
}

const initialState = {
  images
};

export default function Image(state = initialState, action) {
  switch (action.type) {
    // REVIEW No Duplicate Images
    // Add a check to make sure the handle of the image doesnt match
    // previously uploaded images.
    case ADD_IMAGE: {
      const { id, filename, handle, url, mimetype } = action.payload;
      const newImagesState = {
        byId: {
          ...state.images.byId,
          [id]: {
            id,
            edited: false,
            filename,
            handle,
            url,
            mimetype,
            frameId: null,
            currentSavedEditId: null,
            edit: null,
            quantity: 1
          }
        },
        allIds: [...state.images.allIds, id]
      };
      Cookies.set(cookieName, newImagesState);
      // console.log(newImagesState);
      return {
        ...state,
        images: newImagesState
      };
    }
    case IMAGE_SIZE: {
      const { imageId, size } = action;
      const { width, height } = size;

      const newImagesState = {
        byId: {
          ...state.images.byId,
          [imageId]: {
            ...state.images.byId[imageId],
            width,
            height
          }
        },
        allIds: [...state.images.allIds]
      };
      Cookies.set(cookieName, newImagesState);
      // console.log(newImagesState);
      return {
        ...state,
        images: newImagesState
      };
    }
    case REMOVE_IMAGE: {
      const RemoveImageIndex = indexOf(state.images.allIds, action.id);
      const newList = [
        ...state.images.slice(0, RemoveImageIndex),
        ...state.images.slice(RemoveImageIndex + 1)
      ];
      const newImagesById = omit(state.images.byId, action.id);
      return {
        ...state,
        images: {
          byId: newImagesById,
          allIds: newList
        }
      };
    }
    case SAVE_EDIT: {
      const {
        imageId,
        frameId,
        collectionId,
        previewSrc,
        transformations
      } = action;
      return {
        ...state,
        images: {
          byId: {
            ...state.images.byId,
            [imageId]: {
              ...state.images.byId[imageId],
              edited: {
                ...state.images.byId[imageId].edited,
                [collectionId]: true
              },
              edit: {
                ...state.images.byId[imageId].edit,
                [collectionId]: {
                  previewSrc,
                  frameId,
                  // This is what will be applied with filestack
                  transformations
                }
              }
            }
          },
          allIds: [...state.images.allIds]
        }
      };
    }
    case REMOVE_EDIT: {
      const { imageId } = action;
      return {
        ...state,
        images: {
          ...state.images,
          byId: {
            ...state.images.byId,
            [imageId]: {
              ...state.images.byId[imageId],
              isEdited: false
            }
          },
          allIds: [...state.images.allIds]
        }
      };
    }
    case UPDATE_PREVIEW: {
      const { url, imageId } = action;
      return {
        ...state,
        images: {
          ...state.images,
          byId: {
            ...state.images.byId,
            [imageId]: {
              ...state.images.byId[imageId],
              previewUrl: url
            }
          },
          allIds: [...state.images.allIds]
        }
      };
    }
    case UPDATE_QUANTITY: {
      const { imageId, quantity } = action;
      return {
        ...state,
        images: {
          ...state.images,
          byId: {
            ...state.images.byId,
            [imageId]: {
              ...state.images.byId[imageId],
              quantity
            }
          },
          allIds: [...state.images.allIds]
        }
      };
    }
    default: {
      return state;
    }
  }
}
