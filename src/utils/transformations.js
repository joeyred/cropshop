/**
 * Copyright (c) 2019-present, Brian J. Hayes.
 *
 * https://github.com/joeyred
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Get the scale to be applied to all rendered display values, so that they
 * can be applied to the original file.
 *
 * @method getScale
 *
 * @param  {Number} natural  - The natural size of the dimension.
 * @param  {Number} rendered - The rendered size of the dimension in the
 *                             browser.
 *
 * @return {Number}          - The scale to apply.
 */
export function getScale(natural, rendered, zoom) {
  if (zoom && zoom > 0) {
    return natural / (rendered * zoom);
  }
  return natural / rendered;
}

export const scaleCrop = ({ imageProps, zoom = false, crop }) => {
  const { naturalWidth, naturalHeight, width, height } = imageProps;
  const scaleX = getScale(naturalWidth, width, zoom);
  const scaleY = getScale(naturalHeight, height, zoom);
  const newCrop = {};

  if (crop) {
    newCrop.x = crop.x * scaleX;
    newCrop.y = crop.y * scaleY;
    newCrop.width = crop.width * scaleX;
    newCrop.height = crop.height * scaleY;
  }
  return newCrop;
};

export const generateTransform = (linkedImage, edit) => {
  const { flip, flop, rotate = 0, crop = false } = edit;

  // Handle flip
  if (flip) {
    linkedImage.flip();
  }
  // Handle Flop
  if (flop) {
    linkedImage.flop();
  }
  if (rotate > 0 && rotate < 360) {
    linkedImage.rotate({ deg: rotate });
  }
  if (crop) {
    linkedImage.crop({
      dim: [
        parseFloat(crop.x.toFixed(0)),
        parseFloat(crop.y.toFixed(0)),
        parseFloat(crop.width.toFixed(0)),
        parseFloat(crop.height.toFixed(0))
      ]
    });
  }
  return {
    transformArray: linkedImage,
    url: linkedImage.toString()
  };
};
