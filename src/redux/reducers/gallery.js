/**
 * Copyright (c) 2019-present, Brian J. Hayes.
 *
 * https://github.com/joeyred
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  SET_IMAGE_IN_EDITOR,
  UPDATE_EDIT_MODE,
} from '../actiontypes/gallery';

const initialState = {
  // Is the gallery in edit mode
  isEditing: true,
  // Use this to load the correct image data into the editor
  currentIdBeingEdited: null,
};

export default function Gallery(state = initialState, action) {
  switch (action.type) {
    case UPDATE_EDIT_MODE: {
      return {
        ...state,
        isEditing: action.isEditing,
      };
    }
    case SET_IMAGE_IN_EDITOR: {
      return {
        ...state,
        currentIdBeingEdited: action.id,
      };
    }
    default: {
      return state;
    }
  }
}
