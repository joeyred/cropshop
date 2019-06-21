import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import NavReducer from './reducers/nav';
import GalleryReducer from './reducers/gallery';
import EditorReducer from './reducers/editor';
import ImageReducer from './reducers/image';
import FrameReducer from './reducers/frame';
import FilestackReducer from './reducers/filestack';
import CartReducer from './reducers/cart';
import { ExternalsReducer } from './externalsToState';
// import { StorefrontReducer } from './storefront';
import { SizeReducer } from './size';

// function filestack(state = { apiKey: 'AkrGfLiFXRI6s2gfwYnvBz' }, action) {
//   switch (action.type) {
//     case 'UPDATE_API_KEY': {
//       const { apiKey } = action;
//       return { apiKey };
//     }
//     default: {
//       return state;
//     }
//   }
// }

const rootReducer = combineReducers({
  nav: NavReducer,
  // edit:    EditReducer,
  editor: EditorReducer,
  gallery: GalleryReducer,
  image: ImageReducer,
  frame: FrameReducer,
  filestack: FilestackReducer,
  external: ExternalsReducer,
  // storefront: StorefrontReducer,
  cart: CartReducer,
  size: SizeReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
