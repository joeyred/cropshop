/**
 * Copyright (c) 2019-present, Brian J. Hayes.
 *
 * https://github.com/joeyred
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types'; // eslint-disable-line
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Filelink } from 'filestack-js';
import { Grid, Cell, Button, Colors } from 'react-foundation';
import { SizeMe } from 'react-sizeme';

// import ContainerHeightUnits from '../components/ContainerHeightUnits';

import Image from '../components/Image';

import * as NavActionCreators from '../redux/actions/nav';
import { saveEdit } from '../redux/actions/image';
import { Views } from '../globals';
// import EditPreview from '../components/EditPreview';
import { scaleCrop, generateTransform } from '../utils/transformations';
// import { responsiveProp } from '../utils/breakpoints';
// import { aspectRatioFill } from '../utils/crop';

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
  // productId,
  // productVariantId,
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

const Preview = props => {
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
  } = props;
  const image = images.byId[currentIdBeingEdited];
  const linkedImage = new Filelink(image.handle, apiKey);
  const updateView = bindActionCreators(NavActionCreators.updateView, dispatch);

  const handleDimensions = itemSize => {
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
  // const { productId, productVariantId } = frames.byId[selectedFrameId];
  // const { previewUrl } = images.byId[currentIdBeingEdited];
  // const imageSrc = images.byId[currentIdBeingEdited].url;
  // const handledImageSize = handleDimensions(imageSize);
  const handledNaturalImageSize = handleDimensions(image);
  const imageProps = {
    naturalWidth: handledNaturalImageSize.width,
    naturalHeight: handledNaturalImageSize.height,
    width: imageSize.width,
    height: imageSize.height
  };
  // const imageProps = {
  //   naturalWidth: image.width,
  //   naturalHeight: image.height,
  //   width: imageSize.width,
  //   height: imageSize.height
  // };
  // console.log(imageProps);
  // console.log(crop);
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
          // const { width, height } = handleDimensions(newCrop);
          // const { width, height } = newCrop;
          // const renderedSize = aspectRatioFill(
          //   width,
          //   height,
          //   size.width,
          //   size.height
          // );
          const imgStyle = {};

          imgStyle.maxHeight = `${size.height}px`;
          // if (height > width) {
          //   imgStyle.height = `${size.height}px`;
          //   imgStyle.width = 'auto';
          // } else {
          //   imgStyle.width = `${size.width}px`;
          //   imgStyle.height = 'auto';
          // }
          // console.log('RENDER THAT SIZE');
          // console.log(renderedSize);
          return (
            <Cell className={styles.preview}>
              <Image
                style={imgStyle}
                src={preview.url}
                alt='Preview of your Edit'
              />
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
};

export default connect(mapStateToProps)(Preview);
