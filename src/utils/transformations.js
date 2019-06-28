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

const sanitizeCrop = crop => {
  const { width, height, x, y } = crop;
  const output = {};
  // If value is less than zero, then it'll be a min of 0
  output.width = Math.sign(width) !== -1 ? width : 0;
  output.height = Math.sign(height) !== -1 ? height : 0;
  output.x = Math.sign(x) !== -1 ? x : 0;
  output.y = Math.sign(y) !== -1 ? y : 0;
  // if (aspect) output.aspect = aspect;
  // console.log(output);
  // console.log(Math.sign(width), Math.sign(height), Math.sign(x), Math.sign(y));
  return output;
  // return crop;
};

export const scaleCrop = ({ imageProps, zoom = false, crop }) => {
  const { naturalWidth, naturalHeight, width, height } = imageProps;
  // console.log(imageProps);

  const scaleX = getScale(naturalWidth, width, zoom);
  const scaleY = getScale(naturalHeight, height, zoom);
  const newCrop = {};

  if (crop) {
    newCrop.x = crop.x * scaleX;
    newCrop.y = crop.y * scaleY;
    newCrop.width = crop.width * scaleX;
    newCrop.height = crop.height * scaleY;
  }

  // console.log(newCrop);
  return sanitizeCrop(newCrop);
};

export const generateTransform = (linkedImage, edit) => {
  const { flip, flop, rotate = 0, crop = false } = edit;
  linkedImage.rotate({ deg: 'exif' });

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
    const sanitizedCrop = sanitizeCrop(crop);
    linkedImage.crop({
      dim: [
        parseFloat(sanitizedCrop.x.toFixed(0)),
        parseFloat(sanitizedCrop.y.toFixed(0)),
        parseFloat(sanitizedCrop.width.toFixed(0)),
        parseFloat(sanitizedCrop.height.toFixed(0))
      ]
    });
  }

  return {
    transformArray: linkedImage,
    url: linkedImage.toString()
  };
};
