/**
 * Copyright (c) 2019-present, Brian J. Hayes.
 *
 * https://github.com/joeyred
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { aspectRatioFill } from './crop';
import { applyRotationToDimensions } from './rotate';

/**
 * Generate the proper sizes of image editor and workspace
 *
 * @method generateSizesToRender
 *
 * @param  {Object} containerSize - size of the container the workspace is in.
 * @param  {Object} imageSize     - Original (Natural) size of the image file.
 * @param  {Number} padding       - padding of the artboard.
 * @param  {Number} rotaion       - Degrees of rotation applied
 * @return {Object}               - Artboard size and rendered image size.
 */
export default function generateSizesToRender(
  containerSize,
  imageSize,
  padding = 0,
  rotation = 0
) {
  const handledImageSize = applyRotationToDimensions(imageSize, rotation);
  console.log(handledImageSize);
  // This gets us an artboard to work with
  const artboardSize = aspectRatioFill(
    handledImageSize.width,
    handledImageSize.height,
    containerSize.width,
    containerSize.height
  );
  // padding must be factored in to create the space the image has to fit in.
  // a new aspect ratio fill can be applied to preserve image aspect ratio.
  const availableImageSpace = {
    width: artboardSize.width - padding * 2,
    height: artboardSize.height - padding * 2
  };
  const imageSizeRendered = aspectRatioFill(
    handledImageSize.width,
    handledImageSize.height,
    availableImageSpace.width,
    availableImageSpace.height
  );
  return {
    artboardSize,
    imageSizeRendered
  };
}
