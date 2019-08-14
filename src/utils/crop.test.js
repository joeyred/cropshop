/**
 * Copyright (c) 2019-present, Brian J. Hayes.
 *
 * https://github.com/joeyred
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  getAspectRatio,
  aspectRatioFill,
  getPosition,
  calcCropFullCentered
} from './crop';

describe('aspectRatioFill', () => {
  it('Should maintain original aspect ratio of source', () => {
    const source = {
      width: 3580,
      height: 2385
    };
    const max = {
      width: 813.33,
      height: 801.7
    };

    const sourceAspectRatio = getAspectRatio(source);
    // const maxAspectRatio = max.width / max.height;

    const fill = aspectRatioFill(
      source.width,
      source.height,
      max.width,
      max.height
    );

    expect(getAspectRatio(fill)).toBe(sourceAspectRatio);
  });
});
