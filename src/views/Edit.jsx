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
import {
  Grid,
  Cell,
  Button,
  // ButtonGroup,
  TopBar,
  TopBarLeft,
  Colors
} from 'react-foundation';
import sizeMe from 'react-sizeme';

import {
  // scaleCrop,
  generateTransform
} from '../utils/transformations';
import {
  toggleOption,
  updateRotation,
  // updateZoom,
  updateCrop as updateCropActionCreator,
  storeImageDimensions as storeImageDimensionsActionCreator
} from '../redux/actions/editor';

import { updateView } from '../redux/actions/nav';
// import ReactCrop from 'react-image-crop';
import { Views } from '../globals';

import Icon from '../components/Icon';

// import Filestack from '../components/Filestack';
import FrameSelector from '../components/FrameSelector';
import Toolbar from '../components/Toolbar';
import ImageEditor from '../components/ImageEditor';

import styles from './Edit.module.scss';
import 'react-image-crop/lib/ReactCrop.scss';

// Mock
// import mockImg from "../imgs/mock-img-vertical.jpg";

const SizeAwareCell = sizeMe({ monitorHeight: true })(Cell);

const mapStateToProps = state => ({
  apiKey: state.filestack.key,
  frames: state.frame.frames,
  selectedFrameId: state.frame.selectedFrameId,
  images: state.image.images,
  imageId: state.gallery.currentIdBeingEdited,
  // Editor stuff
  imageProps: state.editor.imageProps,
  rotate: state.editor.rotate,
  zoom: state.editor.zoom,
  flip: state.editor.flip,
  flop: state.editor.flop,
  crop: state.editor.crop
});

// eslint-disable-next-line react/prefer-stateless-function
class Edit extends Component {
  static propTypes = {
    // apiKey: PropTypes.string.isRequired
    // frames: PropTypes.array,
    // activeFrameIndex: PropTypes.number,
    // selectedFrame: PropTypes.array,
    // file: PropTypes.object.isRequired,
  };

  handleRotate = direction => {
    const {
      rotate
      // dispatch
    } = this.props;
    if (direction === 'left') {
      // dispatch(updateRotation(rotate - 90));
      return rotate - 90;
    }
    if (direction === 'right') {
      // dispatch(updateRotation(rotate + 90));
      return rotate + 90;
    }
    return rotate + 90;
  };

  handleDimensions = () => {
    const { rotate, imageProps } = this.props;

    const container = {};
    // const image = {};

    if (rotate === 90 || rotate === 270) {
      container.width = imageProps.height ? imageProps.height : 'inherit';
      container.height = imageProps.width ? imageProps.width : 'auto';
      return {
        width: container.width,
        height: container.height
      };
    }
    container.width = imageProps.width ? imageProps.width : 'auto';
    container.height = imageProps.height ? imageProps.height : 'inherit';
    return {
      width: container.width,
      height: container.height
    };
  };

  generateTransformStyles = () => {
    const {
      rotate,
      flip,
      flop
      // zoom
    } = this.props;
    const rotateTransform = {};
    // Normal Rotation
    rotateTransform.x = rotate > 0 && rotate < 360 ? rotate : 0;
    // Flip Horizontally
    rotateTransform.y = flop ? 180 : 0;
    // Flip Vertically
    rotateTransform.z = flip ? 180 : 0;

    // const zoomTransform = zoom > 1 ? zoom : 1;

    return `rotateX(${rotateTransform.x}deg) rotateY(${
      rotateTransform.y
    }deg) rotateZ(${rotateTransform.z}deg)`;

    // return `rotateY()`

    // return `rotate3d(${rotateTransform.x}, ${rotateTransform.y}, ${
    //   rotateTransform.z
    // })`;
  };

  // TODO Replace this with a more flexible and performant solution
  handleImageEditViaApi = linkedImage => {
    const { rotate, flip, flop } = this.props;

    const preview = generateTransform(linkedImage, { rotate, flip, flop });
    // console.log(preview.url);
    return preview.url;
  };

  // renderImageStyle = () => `
  //   .${styles.container} {
  //     img.ReactCrop__image {
  //       transform: ${this.generateTransformStyles};
  //     }
  //   }
  // `;

  render() {
    // console.log(this.props);
    const {
      apiKey,
      frames,
      selectedFrameId,
      images,
      imageId,
      dispatch,
      crop
    } = this.props;
    // Get the image data
    const image = images.byId[imageId];

    // Construct a new instance to link to Filestack image.
    const linkedImage = new Filelink(image.handle, apiKey);

    // Handle any undefined type weirdness on first render
    let frame = frames.byId[selectedFrameId];
    // console.log(frame);
    if (!frame) {
      frame = {
        dimensions: [8, 8]
      };
    }

    // const updateView = bindActionCreators(
    //   NavActionCreators.updateView,
    //   dispatch
    // );
    const updateCrop = bindActionCreators(updateCropActionCreator, dispatch);
    const storeImageDimensions = bindActionCreators(
      storeImageDimensionsActionCreator,
      dispatch
    );
    // const dimensions = this.handleDimensions();

    return (
      <Grid vertical className={`${styles.container}`}>
        {/* <style>
          {`

            img.ReactCrop__image {
              height: ${dimensions.height}px;
              width: ${dimensions.width}px;
              transform: ${this.generateTransformStyles()};
            }

          `}
        </style> */}
        <TopBar>
          <TopBarLeft>
            <Button
              color={Colors.SECONDARY}
              size='small'
              onClick={() => dispatch(updateView(Views.GALLERY))}
            >
              <Icon name='Apps' /> Back To Gallery
            </Button>
          </TopBarLeft>
        </TopBar>

        {/* Frame Select */}
        <SizeAwareCell>
          <h1 className=''>Select A Size</h1>
          <FrameSelector direction='horizontal' />
        </SizeAwareCell>
        {/* Image Editor */}
        <Cell>
          <ImageEditor
            // imageSrc={image.url}
            imageSrc={this.handleImageEditViaApi(linkedImage)}
            // artboardDimensions={this.handleDimensions()}
            crop={crop}
            updateCrop={updateCrop}
            storeImageDimensions={storeImageDimensions}
            aspectRatioArray={frame.dimensions}
            // aspectRatioArray={[8, 8]}
          />
        </Cell>

        {/* Tool Bar */}
        <SizeAwareCell>
          <Toolbar style={{ padding: '0 0.625rem' }}>
            {/* <Toolbar.Group label='Zoom'>
              <Toolbar.Button icon='ZoomIn' label='In' />
              <Toolbar.Button icon='ZoomOut' label='Out' />
            </Toolbar.Group> */}
            <Toolbar.Group label='Rotate'>
              <Toolbar.Button
                icon='RotateLeft'
                label='Left'
                // handleClick={() => this.handleRotate('left')}
                handleClick={() =>
                  dispatch(updateRotation(this.handleRotate('left')))
                }
              />
              <Toolbar.Button
                icon='RotateRight'
                label='Right'
                // handleClick={() => this.handleRotate('right')}
                handleClick={() =>
                  dispatch(updateRotation(this.handleRotate('right')))
                }
              />
            </Toolbar.Group>
            <Toolbar.Group label='Flip'>
              <Toolbar.Button
                icon='Flip'
                label='Horizontal'
                handleClick={() => dispatch(toggleOption('flop'))}
              />
              <Toolbar.Button
                icon='Flip'
                rotateIcon={270}
                label='Vertical'
                handleClick={() => dispatch(toggleOption('flip'))}
              />
            </Toolbar.Group>
          </Toolbar>
        </SizeAwareCell>
        <SizeAwareCell className='align-center-middle text-center'>
          <Button
            color={Colors.SECONDARY}
            onClick={() => dispatch(updateView(Views.PREVIEW))}
          >
            Apply
          </Button>
          {/* <Grid vertical={false} className='align-center-middle text-center'>
            {}
          </Grid> */}
        </SizeAwareCell>
      </Grid>
    );
  }
}

export default connect(mapStateToProps)(Edit);
