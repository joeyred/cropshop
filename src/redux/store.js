/**
 * Copyright (c) 2019-present, Brian J. Hayes.
 *
 * https://github.com/joeyred
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import NavReducer from './reducers/nav';
import GalleryReducer from './reducers/gallery';
import EditorReducer from './reducers/editor';
import ImageReducer from './reducers/image';
import FrameReducer from './reducers/frame';
import FilestackReducer from './reducers/filestack';
import CartReducer from './reducers/cart';
import { ExternalsReducer } from './externalsToState';
import { SizeReducer } from './size';

const rootReducer = combineReducers({
  nav: NavReducer,
  editor: EditorReducer,
  gallery: GalleryReducer,
  image: ImageReducer,
  frame: FrameReducer,
  filestack: FilestackReducer,
  external: ExternalsReducer,
  cart: CartReducer,
  size: SizeReducer
});

let store = createStore(rootReducer, applyMiddleware(thunk));
if (process.env.NODE_ENV !== 'production') {
  store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
}

const output = store;

export default output;
