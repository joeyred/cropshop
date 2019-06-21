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
import sizeMe from 'react-sizeme';
import {
  // Grid,
  // Cell,
  TopBar,
  TopBarLeft,
  TopBarRight,
  Button,
  Colors
} from 'react-foundation';

import { Views } from '../globals';

import Icon from '../components/Icon';
import CloseModal from '../components/CloseModal';
import Filestack from '../components/Filestack';

import * as ImageActionCreators from '../redux/actions/image';
import * as NavActionCreators from '../redux/actions/nav';

const SizeAwareTopBar = sizeMe({ monitorHeight: true })(TopBar);

const mapStateToProps = state => ({
  apiKey: state.filestack.key,
  images: state.image.images,
  appSize: state.size.app
});

class Upload extends Component {
  static propTypes = {
    apiKey: PropTypes.string.isRequired
  };

  state = {
    containerHeight: 100
  };

  onSuccess = res => {
    const { dispatch } = this.props;
    const updateView = bindActionCreators(
      NavActionCreators.updateView,
      dispatch
    );
    // console.log(res);
    updateView(Views.GALLERY);
  };

  setUploadContainerHeight = size => {
    const { appSize } = this.props;
    // console.log(size.height, appSize.height);

    const containerHeight = appSize.height - size.height;

    this.setState({ containerHeight });
  };

  render() {
    const { apiKey, images, dispatch } = this.props;
    const { containerHeight } = this.state;
    // console.log(apiKey);
    const imageHasBeenUploaded = images.allIds.length > 0;
    const addImage = bindActionCreators(ImageActionCreators.addImage, dispatch);
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
      accept: 'image/*',
      maxFiles: 20,
      disableTransformer: true,
      uploadInBackground: false
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
        <SizeAwareTopBar
          style={{ zIndex: '99999999999999' }}
          onSize={this.setUploadContainerHeight}
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
        </SizeAwareTopBar>

        <Filestack.Upload
          apiKey={apiKey}
          options={options}
          onFileUploadSuccess={addImage}
          onSuccess={this.onSuccess}
          height={containerHeight}
        />
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps)(Upload);
