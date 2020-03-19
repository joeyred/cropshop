/**
 * Copyright (c) 2019-present, Brian J. Hayes.
 *
 * https://github.com/joeyred
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const GET_CONFIG = 'config/GET_CONFIG';

const initialState = {
  debug: false,
  display: {
    showPrices: true,
  },
  upload: {
    displayMode: 'inline',
    container: 'uploadContainer',
    fromSources: [
      'local_file_system',
      'instagram',
      'facebook',
      'googledrive'
    ],
    accept: [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/heic',
      'image/heif'
    ],
    maxFiles: 20,
    disableTransformer: true,
    uploadInBackground: false,
    customText: {
      Upload: 'Start Creating',
      'Deselect All': 'Remove All',
      'Upload more': 'Add More',
      'View/Edit Selected': 'View Selected'
    }
  }
}

export const getConfig = config => ({
  type: GET_CONFIG,
  config
});

export function ConfigReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CONFIG: {
      const { config } = action;
      return Object.assign({}, state, config);
    }
    default: {
      return state;
    }
  }
}
