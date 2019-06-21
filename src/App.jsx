import React, { Component } from 'react';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import _ from 'lodash';
// import Div100vh from 'react-div-100vh';
// import sizeMe from 'react-sizeme';
import View from './components/View';
// import Client from 'shopify-buy/index.unoptimized.umd';
// import * as NavActionCreators from './redux/actions/nav';
// import { updateAppVisibility } from './redux/actions/nav';
// import { updateSelectedCollection, fetchFrames } from './redux/actions/frame';
import { updateAppSize, setBreakpoint } from './redux/size';
import { activeBreakpoint } from './utils/breakpoints';
// import imageHasBeenEdited from './utils/imageHasBeenEdited';

// Moved to index.js
// import { fetchApiKey } from './redux/actions/filestack';
// import { externalsToState } from './redux/externalsToState';
// import { fetchStorefrontToken } from './redux/storefront';

// import {
//   TopBar,
//   TopBarLeft,
//   Menu,
//   MenuItem,
// } from 'react-foundation';

// import Edit from './views/Edit';
// import Gallery from './views/Gallery';
// import Upload from './views/Upload';
// import Preview from './views/Preview';

import { Breakpoints } from './globals';

import './styles/foundation/global_include.scss';
import styles from './App.module.scss';

const mapStateToProps = state => ({
  currentView: state.nav.currentView,
  images: state.image.images,
  selectedCollectionId: state.frame.selectedCollectionId,
  currentBreakpoint: state.size.breakpoint,
  appHeight: state.size.app.height
  // storefrontTokenLoaded: state.storefront.loaded,
  // storefrontToken: state.storefront.token,
  // storefrontDomain: state.storefront.domain,
  // client: state.storefront.client,
});

// const bindActionsToExternalEvents = (query, callback) => {
//   const elements = document.querySelectorAll(query);
//   for (let i = 0; i < elements.length; i += 1) {
//     console.log(query);
//     elements[i].addEventListener('click', callback);
//   }
// };

class App extends Component {
  onSize = size => {
    const { currentBreakpoint, dispatch } = this.props;
    const breakpoint = activeBreakpoint(Breakpoints);
    if (breakpoint !== currentBreakpoint) {
      dispatch(setBreakpoint(breakpoint));
    }
    // console.log(size);
    // dispatch(updateAppSize(size));
  };

  render() {
    const { currentView, currentBreakpoint, appHeight } = this.props;
    const style = {};
    // const rvh =
    //   window.innerHeight ||
    //   document.documentElement.clientHeight ||
    //   document.body.clientHeight;
    // if (currentBreakpoint === 'sm' || currentBreakpoint === 'md') {
    //   style.height = `${rvh}px`;
    // } else {
    //   style.height = `${rvh * 0.9}px`;
    // }
    console.log(appHeight);
    style.height = `${appHeight}px`;
    return (
      <div className={styles.App} style={style}>
        <View currentView={currentView} onSize={this.onSize} />
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
