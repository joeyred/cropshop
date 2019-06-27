/**
 * Copyright (c) 2019-present, Brian J. Hayes.
 *
 * https://github.com/joeyred
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import store from '../redux/store';
import { updateAppSize } from '../redux/size';

class ViewportHeight {
  constructor() {
    this.windowHeight =
      window.innerHeight || document.documentElement.clientHeight;
    this.rvh = 1;
  }

  init() {
    this.addResizeListener();
    const height = this.windowHeight * this.rvh;
    store.dispatch(updateAppSize({ height }));
  }

  updateAppVh(vh) {
    if (vh > 0 && vh <= 100) {
      this.rvh = vh / 100;
    }
  }

  updateAppHeight = () => {
    const windowHeight =
      window.innerHeight || document.documentElement.clientHeight;
    if (this.windowHeight !== windowHeight) {
      // console.log(windowHeight);
      // console.log(this.rvh);
      const height = windowHeight * this.rvh;
      // console.log(height);
      store.dispatch(updateAppSize({ height }));
      // update recorded height
      this.windowHeight = windowHeight;
    }
  };

  addResizeListener = () => {
    window.addEventListener('resize', this.updateAppHeight);
  };

  removeResizeListener = () => {
    window.removeEventListener('resize', this.updateAppHeight);
  };
}

const AppHeight = new ViewportHeight();

export default AppHeight;
