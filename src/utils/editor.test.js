/**
 * Copyright (c) 2019-present, Brian J. Hayes.
 *
 * https://github.com/joeyred
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { getAspectRatio } from './crop';
import generateSizesToRender from './editor';

describe('generateSizesToRender', () => {
  it('Should render an artboard and image size that matches the aspect ratio of natural image dimensions', () => {
    const containerSize = {
      width: 800,
      height: 900
    };
    const imageSize = {
      width: 2200,
      height: 3020
    };

    const { artboardSize, imageSizeRendered } = generateSizesToRender(
      containerSize,
      imageSize,
      16,
      0
    );

    const imageSizeRatio = getAspectRatio(imageSize);
    const artboardSizeRatio = getAspectRatio(artboardSize);
    const imageRenderedRatio = getAspectRatio(imageSizeRendered);

    expect(imageSizeRatio).toBe(imageRenderedRatio);
    expect(imageSizeRatio).toBe(artboardSizeRatio);
    expect(imageRenderedRatio).toBe(artboardSizeRatio);
  });
});
