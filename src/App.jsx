import React, { Component } from 'react';
import { connect } from 'react-redux';
import View from './components/View';
import { setBreakpoint, setOrientation } from './redux/size';
import { activeBreakpoint } from './utils/breakpoints';

import { Breakpoints } from './globals';

import Icon from './components/Icon';
import ErrorBoundary from './components/ErrorBoundary';

import './styles/_modal.scss';
import './styles/foundation/main.scss';
import styles from './App.module.scss';

const mapStateToProps = state => ({
  currentView: state.nav.currentView,
  images: state.image.images,
  selectedCollectionId: state.frame.selectedCollectionId,
  currentBreakpoint: state.size.breakpoint,
  appHeight: state.size.app.height,
  appWidth: state.size.app.width,
  isPortrait: state.size.app.isPortrait
});

class App extends Component {
  state = {
    showWarning: false
  };

  onSize = () => {
    const {
      currentBreakpoint,
      dispatch,
      appHeight,
      appWidth,
      isPortrait
    } = this.props;

    // Handle setting current breakpoint
    const breakpoint = activeBreakpoint(Breakpoints);
    if (breakpoint !== currentBreakpoint) {
      dispatch(setBreakpoint(breakpoint));
    }

    // Set orientation
    if (appHeight > appWidth && !isPortrait) {
      dispatch(setOrientation(true));
    }
    if (appHeight < appWidth && isPortrait) {
      dispatch(setOrientation(false));
    }

    // eslint-disable-next-line
    if (this.state.showWarning && appHeight > appWidth) {
      this.setState({ showWarning: false });
    }
    if (appHeight > appWidth && appHeight < 500) {
      this.setState({ showWarning: true });
    }
  };

  render() {
    const { currentView, appHeight, appWidth } = this.props;
    const { showWarning } = this.state;
    const style = {};
    const warningStyle = {
      height: `${appHeight}px`,
      width: `${appWidth}px`
    };

    const warning = (
      <div className={styles.warning} style={warningStyle}>
        <style>
          {`
            body {
              background: #f7dc6e !important;
            }
          `}
        </style>
        <h1>Please Use in Portrait!</h1>
        <Icon name='PhonelinkLock' />
        <p>
          This app works best in portrait! Some things just aren&apos;t meant
          for landscape.
        </p>
      </div>
    );
    // console.log(appHeight);
    style.height = `${appHeight}px`;

    return (
      <div className={styles.App} style={style}>
        <ErrorBoundary>
          {showWarning && warning}
          <View currentView={currentView} onSize={this.onSize} />;
        </ErrorBoundary>
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
