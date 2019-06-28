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
import { Filelink } from 'filestack-js';
import { Grid, Cell, Button, Colors } from 'react-foundation';
import { SizeMe } from 'react-sizeme';
import Spinner from 'react-spinkit';

import Image from '../components/Image';

import * as NavActionCreators from '../redux/actions/nav';
import { saveEdit } from '../redux/actions/image';
import { Views } from '../globals';
import { scaleCrop, generateTransform } from '../utils/transformations';

import styles from './Preview.module.scss';

const mapStateToProps = state => ({
  apiKey: state.filestack.key,
  imageProps: state.editor.imageProps,
  rotate: state.editor.rotate,
  zoom: state.editor.zoom,
  flip: state.editor.flip,
  flop: state.editor.flop,
  crop: state.editor.crop,
  imageSize: state.editor.imageSize,
  images: state.image.images,
  frames: state.frame.frames,
  selectedFrameId: state.frame.selectedFrameId,
  selectedCollectionId: state.frame.selectedCollectionId,
  currentIdBeingEdited: state.gallery.currentIdBeingEdited,
  // ui
  breakpoint: state.size.breakpoint,
  appHeight: state.size.app.height
});

const save = ({
  imageId,
  frameId,
  collectionId,
  previewUrl,
  transformations,
  dispatch
}) => {
  // console.log(frameId);
  dispatch(
    saveEdit(imageId, frameId, collectionId, previewUrl, transformations)
  );
  dispatch(NavActionCreators.updateView(Views.GALLERY));
};

class Preview extends Component {
  state = {
    loading: true
  };

  handleDimensions = itemSize => {
    const { rotate } = this.props;
    if (rotate === 90 || rotate === 270) {
      // console.log('rotation applied');
      return {
        width: itemSize.height,
        height: itemSize.width
      };
    }
    return {
      width: itemSize.width,
      height: itemSize.height
    };
  };

  handleLoading = () => {
    this.setState({ loading: false });
  };

  render() {
    const {
      apiKey,
      // imageProps,
      zoom,
      rotate,
      flip,
      flop,
      crop,
      imageSize,
      dispatch,
      images,
      selectedFrameId,
      selectedCollectionId,
      currentIdBeingEdited
    } = this.props;
    const { loading } = this.state;
    const image = images.byId[currentIdBeingEdited];
    const linkedImage = new Filelink(image.handle, apiKey);
    const updateView = bindActionCreators(
      NavActionCreators.updateView,
      dispatch
    );

    const handledNaturalImageSize = this.handleDimensions(image);
    const imageProps = {
      naturalWidth: handledNaturalImageSize.width,
      naturalHeight: handledNaturalImageSize.height,
      width: imageSize.width,
      height: imageSize.height
    };
    const newCrop = scaleCrop({ imageProps, crop, zoom });
    const edit = { flip, flop, rotate, crop: newCrop };
    const preview = generateTransform(linkedImage, edit);

    return (
      <Grid vertical className={styles.container}>
        {/* Title */}
        <Cell>
          <h1>Like what you see?</h1>
        </Cell>

        {/* Preview */}
        <SizeMe monitorHeight>
          {({ size }) => {
            const imgStyle = {};

            imgStyle.maxHeight = `${size.height}px`;
            return (
              <Cell className={styles.preview}>
                <Image
                  style={imgStyle}
                  src={preview.url}
                  alt='Preview of your Edit'
                  onLoad={this.handleLoading}
                />
                {loading && (
                  <div
                    className={styles.overlay}
                    // style={{
                    //   height: `${imageDimensions.height}px`,
                    //   width: `${imageDimensions.width}px`
                    // }}
                  >
                    <Spinner
                      fadeIn='none'
                      name='three-bounce'
                      color='#f76e87'
                    />
                  </div>
                )}
              </Cell>
            );
          }}
        </SizeMe>

        {/* Buttons */}
        <Cell>
          <Grid className='align-center-middle text-center'>
            <Cell className='auto'>
              <Button
                color={Colors.SECONDARY}
                onClick={() => updateView(Views.EDIT)}
              >
                Back
              </Button>
            </Cell>
            <Cell className='auto'>
              <Button
                color={Colors.PRIMARY}
                onClick={() =>
                  save({
                    imageId: currentIdBeingEdited,
                    frameId: selectedFrameId,
                    collectionId: selectedCollectionId,
                    previewUrl: preview.url,
                    transformations: edit,
                    dispatch
                  })
                }
              >
                Save
              </Button>
            </Cell>
          </Grid>
        </Cell>
      </Grid>
    );
  }
}

export default connect(mapStateToProps)(Preview);
