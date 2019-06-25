/**
 * Copyright (c) 2019-present, Brian J. Hayes.
 *
 * https://github.com/joeyred
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import axios from 'axios';
import uniqid from 'uniqid';
import {
  ADD_IMAGE,
  // NEW_IMAGE,
  IMAGE_SIZE,
  REMOVE_IMAGE,
  SAVE_EDIT,
  REMOVE_EDIT,
  UPDATE_PREVIEW,
  UPDATE_QUANTITY
} from '../actiontypes/image';
// import { Breakpoints } from '../../globals';

const addImage = image => {
  const { id, filename, handle, url, mimetype } = image;

  return {
    type: ADD_IMAGE,
    payload: {
      id,
      filename,
      handle,
      url,
      mimetype
    }
  };
};

const imageSize = (imageId, size) => ({
  type: IMAGE_SIZE,
  imageId,
  size
});

/**
 * Add Image object to images array
 * @method addImage
 * @param  {Object}  image - Array of metadata objects to be parsed.
 */
export const asyncLoadImage = image => {
  return dispatch => {
    const { handle } = image;
    const id = uniqid();
    const payload = { id, ...image };
    dispatch(addImage(payload));
    // WARNING Filestack Bug - HEIC files and exif orientation.
    // Filestack will fix this on upload, but if you try and query for image size
    // the API will return rotated values. This prevents that.
    axios
      .get(
        `https://cdn.filestackcontent.com/rotate=deg:exif/imagesize/${handle}`
      )
      .then(response => {
        // console.log(response);
        const { height, width } = response.data;
        // console.log(response.data);
        dispatch(imageSize(id, { width, height }));
      })
      // eslint-disable-next-line
      .catch(error => console.log(error));
  };
};

/**
 * Remove Image object and id
 * @method removeImage
 * @param  {Array}     id - The id of the image to remove
 */
export const removeImage = id => {
  return {
    type: REMOVE_IMAGE,
    id
  };
};

export const saveEdit = (
  imageId,
  frameId,
  collectionId,
  previewSrc,
  transformations
) => {
  return {
    type: SAVE_EDIT,
    imageId,
    frameId,
    collectionId,
    previewSrc,
    transformations
  };
};

export const removeEdit = imageId => ({
  type: REMOVE_EDIT,
  imageId
});

export const updatePreview = ({ imageId, url }) => ({
  type: UPDATE_PREVIEW,
  url,
  imageId
});

export const updateQuantity = (imageId, quantity) => ({
  type: UPDATE_QUANTITY,
  imageId,
  quantity
});
