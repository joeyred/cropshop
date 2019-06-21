/**
 * Copyright (c) 2019-present, Brian J. Hayes.
 *
 * https://github.com/joeyred
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export default function imageHasBeenEdited(images, selectedCollectionId) {
  for (let i = 0; i < images.allIds.length; i += 1) {
    if (images.byId[images.allIds[i]].edited) {
      if (images.byId[images.allIds[i]].edited[selectedCollectionId]) {
        return true;
      }
    }
  }
  return false;
}
