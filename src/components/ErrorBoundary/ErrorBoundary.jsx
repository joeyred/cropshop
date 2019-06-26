import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Colors } from 'react-foundation';
import { updateView } from '../../redux/actions/nav';
import { Views, AppAtts } from '../../globals';
import { closeModal } from '../../utils/CropShopButton';

import styles from './ErrorBoundary.module.scss';

const mapStateToProps = state => ({
  currentView: state.nav.currentView,
  previousView: state.nav.previousView
});

class ErrorBoundary extends Component {
  state = {
    hasError: false,
    error: null,
    info: null
  };

  static getDerivedStateFromError(error, info) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error, info };
  }

  handleGoBack = () => {
    const { currentView, previousView, dispatch } = this.props;
    console.log('From Boundary\n', currentView, previousView);
    this.setState({ hasError: false });

    if (previousView) {
      dispatch(updateView(previousView));
    } else {
      dispatch(updateView(currentView));
    }
  };

  handleCloseModal = () => {
    this.setState({ hasError: false });
    closeModal(AppAtts.MODAL_ID);
  };

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    console.log(error, info);
  }

  render() {
    const { children } = this.props;
    const { hasError } = this.state;

    if (hasError) {
      // You can render any custom fallback UI
      return (
        <div className={styles.container}>
          <div className={styles.closeModal}>
            <button
              type='button'
              className={styles.button}
              aria-label='Close modal'
              onClick={() => this.handleCloseModal()}
            />
          </div>

          <h1>Something Went Wrong</h1>
          <p>
            Sorry about that, please click below to go back to the gallery and
            try again.
          </p>

          <Button color={Colors.PRIMARY} onClick={() => this.handleGoBack()}>
            Go Back
          </Button>
        </div>
      );
    }

    return children;
  }
}

export default connect(mapStateToProps)(ErrorBoundary);
