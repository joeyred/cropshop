/**
 * Copyright (c) 2019-present, Brian J. Hayes.
 *
 * https://github.com/joeyred
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import MicroModal from 'micromodal';

import store from '../redux/store';
import { updateSelectedCollection } from '../redux/actions/frame';
import { updateAppVisibility } from '../redux/actions/nav';

const dev = process.env.NODE_ENV !== 'production';

let scrollPosition = 0;

export default class CropShopButton {
  constructor(button, appContainer, modalId) {
    this.element = button;
    this.collection = button.getAttribute('data-cropshop-collection');
    this.appContainer = appContainer;
    this.modalId = modalId;
    this.modalConfig = {
      openTrigger: 'data-cropshop-open',
      closeTrigger: 'data-cropshop-close',
      disableScroll: true,
      disableFocus: true,
      awaitCloseAnimation: true
    };
  }

  openModal() {
    const { images } = store.getState().image;
    const imageHasBeenUploaded = images.allIds.length > 0;
    const body = document.getElementById('cropshop_site_content');
    const windowHeight = window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight;
    console.log('window.innerHeight:', window.innerHeight);
    console.log('document.documentElement.clientHeight:', document.documentElement.clientHeight);
    console.log('document.body.clientHeight:', document.body.clientHeight);
    // console.log(imageHasBeenUploaded);
    this.appContainer.setAttribute('data-cropshop-collection', this.collection);
    store.dispatch(updateSelectedCollection(this.collection));
    store.dispatch(updateAppVisibility(true, imageHasBeenUploaded));
    MicroModal.show(this.modalId, {
      disableScroll: false,
      disableFocus: true,
      awaitCloseAnimation: true,
      debugMode: dev
    });
    scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    Object.assign(body.style, {position: 'fixed', overflow: 'hidden', height: `${windowHeight}px`});
  }

  events() {
    this.element.addEventListener('click', () => {
      this.openModal();
    });
  }

  init() {
    this.events();
  }
}

export const closeModal = modalId => {
  const { images } = store.getState().image;
  const imageHasBeenUploaded = images.allIds.length > 0;
  // console.log(imageHasBeenUploaded);
  const body = document.getElementById('cropshop_site_content');

  MicroModal.close(modalId);
  Object.assign(body.style, {overflow: '', height: '', position: ''});
  window.scrollTo(0, scrollPosition);
  store.dispatch(updateAppVisibility(false, imageHasBeenUploaded));
};
