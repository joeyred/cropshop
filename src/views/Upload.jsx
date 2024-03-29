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
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import { filter } from 'lodash';
// import sizeMe from 'react-sizeme';
import {
  // Grid,
  // Cell,
  // TopBar,
  TopBarLeft,
  TopBarRight,
  Button,
  Colors
} from 'react-foundation';

import { Views } from '../globals';

import Icon from '../components/Icon';
import CloseModal from '../components/CloseModal';
import Filestack from '../components/Filestack';
import TopBar from '../components/TopBar';

import * as ImageActionCreators from '../redux/actions/image';
import * as NavActionCreators from '../redux/actions/nav';

const mapStateToProps = state => ({
  apiKey: state.external.filestackApiKey,
  images: state.image.images,
  appSize: state.size.app,
  availableHeight: state.size.availableHeight
});

class Upload extends Component {
  static propTypes = {
    apiKey: PropTypes.string.isRequired
  };

  onSuccess = () => {
    const { dispatch } = this.props;
    // console.log(res);
    dispatch(NavActionCreators.updateView(Views.GALLERY));
  };

  render() {
    const { apiKey, images, availableHeight, dispatch } = this.props;
    // console.log(apiKey);
    const imageHasBeenUploaded = images.allIds.length > 0;
    const asyncLoadImage = bindActionCreators(
      ImageActionCreators.asyncLoadImage,
      dispatch
    );
    const updateView = bindActionCreators(
      NavActionCreators.updateView,
      dispatch
    );
    const options = {
      displayMode: 'inline',
      container: 'uploadContainer',
      fromSources: [
        'local_file_system',
        'instagram',
        'facebook',
        'googledrive'
      ],
      accept: [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/heic',
        'image/heif'
      ],
      maxFiles: 20,
      disableTransformer: true,
      uploadInBackground: false,
      customText: {
        Upload: 'Start Creating',
        'Deselect All': 'Remove All',
        'Upload more': 'Add More',
        'View/Edit Selected': 'View Selected'
      }
      // viewType: 'grid',
      // modalSize: [300, 500]
    };

    const backToGallery = imageHasBeenUploaded ? (
      <div>
        <Button
          color={Colors.SECONDARY}
          size='small'
          onClick={() => updateView(Views.GALLERY)}
          isDisabled={!imageHasBeenUploaded}
        >
          <Icon name='Apps' /> Back To Gallery
        </Button>
      </div>
    ) : null;

    return (
      <React.Fragment>
        {/* Top Bar */}
        <TopBar
          style={{ zIndex: '99999999999999' }}
          // onSize={this.setUploadContainerHeight}
        >
          <TopBarLeft>
            {/* <div className='text-center'>
              <span className='menu-text'>Select Images to Upload</span>
            </div> */}
            {backToGallery}
          </TopBarLeft>
          <TopBarRight>
            <CloseModal />
          </TopBarRight>
        </TopBar>

        <Filestack.Upload
          apiKey={apiKey}
          options={options}
          onFileUploadSuccess={asyncLoadImage}
          onSuccess={this.onSuccess}
          height={availableHeight}
        />
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps)(Upload);
