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
  ADD_IMAGE,
  REMOVE_IMAGE,
  SAVE_EDIT,
  REMOVE_EDIT,
  UPDATE_PREVIEW,
  UPDATE_QUANTITY
} from '../actiontypes/image';

/**
 * Add Image object to images array
 * @method addImage
 * @param  {Object}  image - Array of metadata objects to be parsed.
 */
export const addImage = image => {
  const { filename, handle, url, mimetype } = image;
  const id = uniqid();
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
