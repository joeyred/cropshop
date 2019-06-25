/**
 * Copyright (c) 2019-present, Brian J. Hayes.
 *
 * https://github.com/joeyred
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Preserve aspect ratio of the original region. Useful when shrinking/enlarging
 * images to fit into a certain area.
 *
 * @param {Number} srcWidth  - width of source item new values will be applied to
 * @param {Number} srcHeight - height of source item new values will be applied to
 * @param {Number} maxWidth  - maximum available width
 * @param {Number} maxHeight - maximum available height
 *
 * @return {Object}          - { width, height }
 */
export function aspectRatioFill(srcWidth, srcHeight, maxWidth, maxHeight) {
  const ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
  // const output = {
  //   width: srcWidth * ratio,
  //   height: srcHeight * ratio
  // };
  // return {
  //   width: parseFloat(output.width.toFixed(0)),
  //   height: parseFloat(output.height.toFixed(0))
  // };
  return {
    width: srcWidth * ratio,
    height: srcHeight * ratio
  };
}
/**
 * Gets position of a crop value to fill and center crop box.
 *
 * This is a method meant to be applied to a single dimension, so only pass the
 * height of each, or the width of each. Mixing those values will create incorrect
 * outputs.
 *
 * This method will not automatically calculate positions if cropbox values exceed the
 * image values. `aspectRatioFill` is meant to handle generating the height and width
 * values of the crop box. This method is only meant to use those values to get
 * the position of the box, axis by axis.
 *
 * @method getPosition
 * @param  {Number}    ImageDimension   The dimension of the image.
 * @param  {Number}    cropBoxDimension The dimension of the crop box.
 * @return {Number}                     The updated position of the crop box axis.
 */
export function getPosition(ImageDimension, cropBoxDimension) {
  // If the image dimension is greater, then centering must be applied
  if (ImageDimension > cropBoxDimension) {
    return (ImageDimension - cropBoxDimension) / 2;
  }
  // Else the crop position so be the edge of the image
  return 0;
}

export function calcCropFullCentered(
  aspectRatioWidth,
  aspectRatioHeight,
  artboardWidth,
  artboardHeight
) {
  const dimensions = aspectRatioFill(
    aspectRatioWidth,
    aspectRatioHeight,
    artboardWidth,
    artboardHeight
  );

  return {
    width: dimensions.width,
    height: dimensions.height,
    x: getPosition(artboardWidth, dimensions.width),
    y: getPosition(artboardHeight, dimensions.height)
  };
}
