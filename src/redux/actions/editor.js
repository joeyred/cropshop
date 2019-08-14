/**
 * Copyright (c) 2019-present, Brian J. Hayes.
 *
 * https://github.com/joeyred
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// import {
//   TOGGLE_OPTION,
//   UPDATE_ROTATION,
//   UPDATE_CROP,
//   UPDATE_ZOOM,
//   UPDATE_ARTBOARD_DIMENSIONS,
//   STORE_IMAGE_DIMENSIONS,
//   UPDATE_CROP_FULL_CENTERED
// } from '../actiontypes/editor';
import { calcCropFullCentered, getAspectRatio } from '../../utils/crop';
import { rotate } from '../../utils/rotate';
import generateSizesToRender from '../../utils/editor';
import Debug from '../../utils/debug';

export const TOGGLE_OPTION = 'editor/TOGGLE_OPTION';
export const UPDATE_ROTATION = 'editor/UPDATE_ROTATION';
export const UPDATE_ZOOM = 'editor/UPDATE_ZOOM';
export const UPDATE_CROP = 'editor/UPDATE_CROP';
export const STORE_IMAGE_DIMENSIONS = 'editor/STORE_IMAGE_DIMENSIONS';
export const UPDATE_ARTBOARD_DIMENSIONS = 'editor/UPDATE_ARTBOARD_DIMENSIONS';
export const UPDATE_CROP_FULL_CENTERED = 'editor/UPDATE_CROP_FULL_CENTERED';
export const UPDATE_WORKSPACE_SIZE = 'editor/UPDATE_WORKSPACE_SIZE';
export const UPDATE_LOADING_STATUS = 'editor/UPDATE_LOADING_STATUS';
export const RESET_EDITOR = 'editor/RESET_EDITOR';

export const toggleOption = option => ({
  type: TOGGLE_OPTION,
  option
});

/**
 * Update the loading status of the image in the editor
 * @method updateLoadingStatus
 * @param  {Boolean}           isLoading - `true` if the image is loading.
 * @return {Object}                      - redux action object.
 */
export const updateLoadingStatus = isLoading => ({
  type: UPDATE_LOADING_STATUS,
  isLoading
});

export const resetEditor = () => ({
  type: RESET_EDITOR
});

// combine `hnadleRotate` into this action
// currentRotate, degrees, direction
export const updateRotation = (currentRotation, degrees, direction) => {
  const output = rotate(currentRotation, degrees, direction);
  return {
    type: UPDATE_ROTATION,
    degree: output
  };
};

export const updateZoom = scale => ({
  type: UPDATE_ZOOM,
  scale: scale < 1 ? 1 : scale
});

export const updateCrop = crop => {
  console.log(crop);
  return {
    type: UPDATE_CROP,
    crop
  };
};

export const updateCropFullCenter = (aspectRatio, image) => {
  const crop = calcCropFullCentered(
    aspectRatio.width,
    aspectRatio.height,
    image.width,
    image.height
  );
  return {
    type: UPDATE_CROP_FULL_CENTERED,
    aspectRatio,
    crop: {
      ...crop,
      aspect: getAspectRatio(aspectRatio)
    }
  };
};

export const updateWorkspaceSize = (
  containerSize,
  imageSize,
  aspectRatio,
  padding,
  rotation
) => {
  const { artboardSize, imageSizeRendered } = generateSizesToRender(
    containerSize,
    imageSize,
    padding,
    rotation
  );
  const crop = calcCropFullCentered(
    aspectRatio.width,
    aspectRatio.height,
    imageSizeRendered.width,
    imageSizeRendered.height
  );
  return {
    type: UPDATE_WORKSPACE_SIZE,
    containerSize,
    artboardSize,
    artboardPadding: padding,
    imageSizeRendered,
    imageSize,
    aspectRatio,
    crop
  };
};

export const updateArtboardDimensions = (
  artboardSize,
  artboardPadding,
  imageSize
) => {
  return {
    type: UPDATE_ARTBOARD_DIMENSIONS,
    artboardSize,
    imageSize,
    artboardPadding
  };
};

export const storeImageDimensions = imageProps => ({
  type: STORE_IMAGE_DIMENSIONS,
  imageProps
});
