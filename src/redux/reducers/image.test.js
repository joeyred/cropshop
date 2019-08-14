/**
 * Copyright (c) 2019-present, Brian J. Hayes.
 *
 * https://github.com/joeyred
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import reducer from './image';
import * as types from '../actiontypes/image';

const mockImage = {
  id: 'hfhjdkkslsoios',
  edited: false,
  filename: 'foo.jpg',
  handle: 'hfhdjisidhjjdk',
  url: 'https://example.com/path/to/foo',
  mimetype: 'image/jpg',
  currentSavedEditId: null,
  frameId: null,
  edit: null,
  quantity: 1,
  width: 3000,
  height: 2000
};

const mockPayload = {
  id: '34563yhrff8eg7',
  filename: 'hello.png',
  handle: 's8p9e5c9i20a3lh6',
  url: 'https://example.com',
  mimetype: 'image/png'
};

const initialState = {
  images: {
    byId: {},
    allIds: []
  }
};

describe('image reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle ADD_IMAGE', () => {
    // Expect image data to be added to empty/initial state
    expect(
      reducer(initialState, {
        type: types.ADD_IMAGE,
        payload: mockPayload
      })
    ).toEqual({
      images: {
        byId: {
          [mockPayload.id]: {
            id: mockPayload.id,
            edited: false,
            filename: mockPayload.filename,
            handle: mockPayload.handle,
            url: mockPayload.url,
            mimetype: mockPayload.mimetype,
            currentSavedEditId: null,
            frameId: null,
            edit: null,
            quantity: 1,
            width: 0,
            height: 0
          }
        },
        allIds: [mockPayload.id]
      }
    });
    // Expect image data to be properly added to an active state
    expect(
      reducer(
        // State
        {
          images: {
            byId: {
              [mockImage.id]: mockImage
            },
            allIds: [mockImage.id]
          }
        },
        // Action
        {
          type: types.ADD_IMAGE,
          payload: mockPayload
        }
      )
    ).toEqual({
      images: {
        byId: {
          [mockImage.id]: mockImage,
          [mockPayload.id]: {
            id: mockPayload.id,
            edited: false,
            filename: mockPayload.filename,
            handle: mockPayload.handle,
            url: mockPayload.url,
            mimetype: mockPayload.mimetype,
            currentSavedEditId: null,
            frameId: null,
            edit: null,
            quantity: 1,
            width: 0,
            height: 0
          }
        },
        allIds: [mockImage.id, mockPayload.id]
      }
    });
  });
});
