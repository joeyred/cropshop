/**
 * Copyright (c) 2019-present, Brian J. Hayes.
 *
 * https://github.com/joeyred
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  TOGGLE_OPTION,
  UPDATE_ROTATION,
  UPDATE_CROP,
  UPDATE_ZOOM,
  UPDATE_ARTBOARD_DIMENSIONS,
  STORE_IMAGE_DIMENSIONS,
  UPDATE_CROP_FULL_CENTERED
} from '../actiontypes/editor';
import { calcCropFullCentered } from '../../utils/crop';

export const toggleOption = option => ({
  type: TOGGLE_OPTION,
  option
});

export const updateRotation = degree => {
  // console.log(degree);
  let output = degree;
  if (degree < 0) {
    output = 360 + degree;
    // console.log(output);
  }
  if (degree > 359) {
    output = 0;
    // console.log(output);
  }
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
  return {
    type: UPDATE_CROP,
    crop
  };
};

export const updateCropFullCenter = (newRatio, image) => {
  const crop = calcCropFullCentered(
    newRatio[0],
    newRatio[1],
    image.width,
    image.height
  );
  return {
    type: UPDATE_CROP_FULL_CENTERED,
    crop: {
      ...crop,
      aspect: newRatio[0] / newRatio[1]
    }
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
