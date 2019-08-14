/**
 * Copyright (c) 2019-present, Brian J. Hayes.
 *
 * https://github.com/joeyred
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  applyRotationToDimensions,
  // incrementRotation,
  // decrementRotation,
  keepRotationValid
  // rotate
} from './rotate';

describe('applyRotationToDimensions', () => {
  it('Flips dimensions if the rotation is 90 or 270 degrees', () => {
    const width = 400;
    const height = 600;

    expect(applyRotationToDimensions({ width, height }, 90)).toEqual({
      width: height,
      height: width
    });
    expect(applyRotationToDimensions({ width, height }, 270)).toEqual({
      width: height,
      height: width
    });
  });

  it("Keeps dimensions as is if rotation isn't 90 or 270", () => {
    const width = 400;
    const height = 600;

    // Expected values to be passed based on the current 4 point rotation
    // implimented in the app
    expect(applyRotationToDimensions({ width, height }, 0)).toEqual({
      height,
      width
    });
    expect(applyRotationToDimensions({ width, height }, 180)).toEqual({
      height,
      width
    });

    // Unexpected values should still return expected results.
    // This method is not meant to handle anything outisde of
    // the 4 point rotation.
    expect(applyRotationToDimensions({ width, height }, 89)).toEqual({
      height,
      width
    });
    expect(applyRotationToDimensions({ width, height }, 91)).toEqual({
      height,
      width
    });
    expect(applyRotationToDimensions({ width, height }, 269)).toEqual({
      height,
      width
    });
    expect(applyRotationToDimensions({ width, height }, 271)).toEqual({
      height,
      width
    });
  });
});

describe('keepRotationValid', () => {
  it('If degrees passed are negative, the returned value should be positive', () => {
    expect(keepRotationValid(-1)).toBe(359);
    expect(keepRotationValid(-90)).toBe(270);
  });

  it('If degrees are greater than 359, then 0 should be returned', () => {
    expect(keepRotationValid(360)).toBe(0);
    expect(keepRotationValid(450)).toBe(0);
  });
  it('If degrees are positive and less than 360, return degrees', () => {
    // expected values
    expect(keepRotationValid(90)).toBe(90);
    expect(keepRotationValid(180)).toBe(180);
    expect(keepRotationValid(270)).toBe(270);

    // not expected, but should still be valid
    expect(keepRotationValid(1)).toBe(1);
    expect(keepRotationValid(359)).toBe(359);
  });
});
