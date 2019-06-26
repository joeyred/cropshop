/**
 * Copyright (c) 2019-present, Brian J. Hayes.
 *
 * https://github.com/joeyred
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { UPDATE_VIEW, UPDATE_APP_VISIBILITY } from '../actiontypes/nav';
import { Views } from '../../globals';

const initialState = {
  appIsVisible: false,
  previousView: null,
  currentView: Views.GALLERY,
  modal: {
    active: false,
    message: null
  },
  crouton: {
    active: false,
    id: null,
    message: null,
    type: null
  }
};

export default function Nav(state = initialState, action) {
  switch (action.type) {
    case UPDATE_VIEW: {
      console.log(state);
      return {
        ...state,
        previousView: state.currentView,
        currentView: action.view
      };
    }
    case UPDATE_APP_VISIBILITY: {
      return {
        ...state,
        appIsVisible: action.visible,
        currentView: action.view
      };
    }
    default: {
      return state;
    }
  }
}
