import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Colors } from 'react-foundation';
import { updateView } from '../../redux/actions/nav';
import { Views } from '../../globals';

import styles from './ErrorBoundary.module.scss';

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

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    console.log(error, info);
  }

  render() {
    const { children, dispatch } = this.props;
    const { hasError } = this.state;

    if (hasError) {
      // You can render any custom fallback UI
      return (
        <div className={styles.container}>
          <h1>Something went wrong.</h1>
          <p>
            Sorry about that, please click below to go back to the gallery and
            try again.
          </p>

          <Button
            color={Colors.PRIMARY}
            onClick={() => dispatch(updateView(Views.GALLERY))}
          >
            Go Back to the Gallery
          </Button>
        </div>
      );
    }

    return children;
  }
}

export default connect()(ErrorBoundary);
