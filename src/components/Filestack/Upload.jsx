/**
 * Copyright (c) 2019-present, Brian J. Hayes.
 *
 * https://github.com/joeyred
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types'; // eslint-disable-line

import * as filestack from 'filestack-js';
// import _ from 'lodash';

import styles from './FilestackUpload.module.scss';

// NOTE
// Might need to lift state up to a Redux store.
//
// This will occure if the client instance must be used by multiple filestack components

class Upload extends Component {
  static defaultProps = {
    onFileUploadSuccess: result => console.log(result),
    onFileUploadError: error => console.log(error),
    onSuccess: result => console.log(result),
    onError: error => console.error(error),
    options: {},
    security: null,
    children: null,
    render: null,
    sessionCache: false,
    width: -1,
    height: -1
  };

  static propTypes = {
    /**
     * The Filestack API key
     * @type {String}
     */
    apiKey: PropTypes.string.isRequired,
    /**
     * Called at onUploadDone
     * @param {Array} result - the metadata returned from the upload
     */
    onSuccess: PropTypes.func,
    onError: PropTypes.func,
    onFileUploadSuccess: PropTypes.func,
    onFileUploadError: PropTypes.func,
    options: PropTypes.objectOf(PropTypes.any),
    security: PropTypes.objectOf(PropTypes.any),
    children: PropTypes.node,
    render: PropTypes.func,
    sessionCache: PropTypes.bool,
    active: PropTypes.bool,
    height: PropTypes.number,
    width: PropTypes.number
  };

  constructor(props) {
    super(props);
    const { apiKey, security, sessionCache, active, options } = this.props;
    // const overrides = {
    //   displayMode: 'inline',
    //   container: 'uploadContainer'
    // };
    // // Parse options and override any breaking options that may be passed
    // const options = _.extend(this.props.options, overrides);
    // Create client instance
    const client = filestack.init(apiKey, {
      security,
      sessionCache
    });

    this.state = {
      client,
      active,
      options
      // picker: client.picker({ ...options, onUploadDone: this.onFinished }),
    };

    this.onFinished = this.onFinished.bind(this);
    this.onFail = this.onFail.bind(this);
  }

  componentDidMount() {
    this.mountPicker()
      .then(this.onFinished)
      .catch(this.onFail);
  }

  /**
   * Handles initializing and instance of the picker and mounting it
   * @method mountPicker
   * @return {Promise}    - The instance.
   */
  mountPicker = () => {
    const { client, options } = this.state;
    const { onFileUploadSuccess, onFileUploadError } = this.props;
    return new Promise(resolve => {
      // TODO No Reuploads
      // Use `onFileSelected` option to perform necessary checks to prevent
      // uploading a previously uploaded and available file.
      client
        .picker({
          ...options,
          // TODO Add `onFileSelected`
          // Handle each individual successful file upload
          onFileUploadFinished: onFileUploadSuccess,
          // Handle each individual failed file upload
          onFileUploadFailed: onFileUploadError,
          // When all files are uploaded, resolve the promise
          onUploadDone: resolve
        })
        .open();
    });
  };

  onFinished = result => {
    const { onSuccess } = this.props;
    if (typeof onSuccess === 'function' && result) {
      onSuccess(result);
    }
  };

  onFail = error => {
    const { onError } = this.props;
    if (typeof onError === 'function') {
      onError(error);
    } else {
      console.error(error);
    }
  };

  render() {
    const { options } = this.state;
    const { width, height } = this.props;
    const style = {};
    if (width) style.width = `${width}px`;
    if (height) style.height = `${height}px`;
    return (
      <div style={style} id={options.container} className={styles.overrides} />
    );
  }
}

export default Upload;
