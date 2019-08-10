/**
 * Copyright (c) 2019-present, Brian J. Hayes.
 *
 * https://github.com/joeyred
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export function applyRotationToDimensions({ width, height }, rotation) {
  if (rotation === 90 || rotation === 270) {
    return {
      width: height,
      height: width
    };
  }
  return {
    width,
    height
  };
}

export function incrementRotation(currentRotation, degreesToAdd) {
  return currentRotation + degreesToAdd;
}

export function decrementRotation(currentRotation, degreesToSubtract) {
  return currentRotation - degreesToSubtract;
}

export function keepRotationValid(degrees) {
  let output = degrees;
  if (degrees < 0) {
    output = 360 + degrees;
  }
  if (degrees > 359) {
    output = 0;
  }
  return output;
}

export function rotate(currentRotation, degrees, direction) {
  if (direction === 'left') {
    return decrementRotation(currentRotation, degrees);
  }
  if (direction === 'right') {
    return incrementRotation(currentRotation, degrees);
  }
  return new Error(
    'No valid direction was passed. "right" or "left" must be passed.'
  );
}
