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
  // TopBar,
  TopBarLeft,
  Colors
} from 'react-foundation';
import sizeMe, { SizeMe } from 'react-sizeme';

// import ContainerHeightUnits from '../components/ContainerHeightUnits';
import AppHU from '../components/AppHU';

import {
  // scaleCrop,
  generateTransform
} from '../utils/transformations';
import {
  // toggleOption,
  updateRotation,
  // updateZoom,
  updateCrop as updateCropActionCreator,
  storeImageDimensions as storeImageDimensionsActionCreator,
  updateArtboardDimensions as updateArtboardDimensionsActionCreator
} from '../redux/actions/editor';
import { updateComponentHeight } from '../redux/size';
import { updateView } from '../redux/actions/nav';
import { Views } from '../globals';

import Icon from '../components/Icon';
import TopBar from '../components/TopBar';
import FrameSelector from '../components/FrameSelector';
import Toolbar from '../components/Toolbar';
import ImageEditor from '../components/ImageEditor';
import TopBarTitle from '../components/TopBarTitle';

import { responsiveProp } from '../utils/breakpoints';
import { aspectRatioFill, calcCropFullCentered } from '../utils/crop';

import styles from './Edit.module.scss';

const SizeAwareCell = sizeMe({ monitorHeight: true, monitorWidth: false })(
  Cell
);

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
  crop: state.editor.crop,
  artboardSize: state.editor.artboardSize,
  artboardPadding: state.editor.artboardPadding,
  imageSize: state.editor.imageSize,
  // ui
  breakpoint: state.size.breakpoint,
  isPortrait: state.size.app.isPortrait,
  rowHeights: state.size.registeredHeights,
  availableHeight: state.size.availableHeight
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

  state = {
    loading: true
  };

  componentDidMount() {
    const {
      frames,
      selectedFrameId,
      // images,
      // imageId,
      imageSize,
      dispatch
    } = this.props;
    // const image = images.byId[imageId];
    let frame = frames.byId[selectedFrameId];
    if (!frame) {
      frame = {
        dimensions: [8, 8]
      };
    }

    const crop = calcCropFullCentered(
      frame.dimensions[0],
      frame.dimensions[1],
      imageSize.width,
      imageSize.height
    );
    // console.log(crop);

    dispatch(
      updateCropActionCreator({
        ...crop,
        aspect: frame.dimensions[0] / frame.dimensions[1]
      })
    );
  }

  getResponsiveProp = (component, prop) => {
    const { breakpoint } = this.props;

    // console.log(breakpoint);

    const grid = {};
    const frameSelector = {};
    const toolbar = {};
    const imageEditor = {};

    // if (!isPortrait) {
    grid.direction = responsiveProp([true, true, false]);

    frameSelector.direction = responsiveProp([
      'horizontal',
      'horizontal',
      'horizontal'
    ]);
    frameSelector.cellSize = responsiveProp([null, null, 3]);
    frameSelector.ch = responsiveProp([22, 25, 22]);

    toolbar.ch = responsiveProp([15, 15, 20]);

    imageEditor.ch = responsiveProp([
      100 - (toolbar.ch[breakpoint] + frameSelector.ch[breakpoint]),
      100 - (toolbar.ch[breakpoint] + frameSelector.ch[breakpoint]),
      100 - (toolbar.ch[breakpoint] + frameSelector.ch[breakpoint])
    ]);

    const components = { grid, frameSelector, toolbar, imageEditor };
    return components[component][prop][breakpoint];
    // }

    // components.grid.direction = false;
    // components.frameSelector.direction = 'vertical';
    // components.frameSelector.cellSize = 3;
    //
    // return components[component][prop];
  };

  handleRotate = direction => {
    const {
      rotate
      // dispatch
    } = this.props;
    this.loadingStatus(true);
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

  handleDimensions = imageSize => {
    const { rotate } = this.props;

    if (rotate === 90 || rotate === 270) {
      // console.log('rotation applied');
      return {
        width: imageSize.height,
        height: imageSize.width
      };
    }
    return {
      width: imageSize.width,
      height: imageSize.height
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
    // rotateTransform.x = rotate > 0 && rotate < 360 ? rotate : 0;
    rotateTransform.z = rotate;
    // Flip Horizontally
    rotateTransform.y = flop ? 180 : 0;
    // Flip Vertically
    rotateTransform.x = flip ? 180 : 0;

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
    const { breakpoint, rotate, flip, flop } = this.props;
    // linkedImage.output({ format: 'jpg' });
    const responsiveResize = {
      sm: 640,
      md: 1000,
      lg: 1024,
      xl: 1366,
      xxl: 1920
    };
    linkedImage.resize({ width: responsiveResize[breakpoint] });
    // return linkedImage.toString();
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

  loadingStatus = status => {
    this.setState({ loading: status });
  };

  render() {
    // console.log(this.props);
    const {
      apiKey,
      frames,
      selectedFrameId,
      images,
      imageId,
      rowHeights,
      // availableHeight,
      dispatch,
      crop
    } = this.props;
    let frameSelectorHeight = 0;
    let toolbarHeight = 0;

    if (rowHeights) {
      frameSelectorHeight = rowHeights.frameSelector
        ? rowHeights.frameSelector
        : 0;
      toolbarHeight = rowHeights.toolbar ? rowHeights.toolbar : 0;
    }

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

    const updateCrop = bindActionCreators(updateCropActionCreator, dispatch);
    const storeImageDimensions = bindActionCreators(
      storeImageDimensionsActionCreator,
      dispatch
    );
    const updateArtboardDimensions = bindActionCreators(
      updateArtboardDimensionsActionCreator,
      dispatch
    );
    // const dimensions = this.handleDimensions();

    return (
      <div>
        <TopBar>
          <TopBarLeft>
            <Button
              color={Colors.SECONDARY}
              size='small'
              onClick={() => dispatch(updateView(Views.GALLERY))}
            >
              <Icon name='Apps' /> Back To Gallery
            </Button>

            <TopBarTitle />
          </TopBarLeft>
        </TopBar>
        <Grid vertical className={`${styles.container}`}>
          {/* Frame Select */}
          <SizeAwareCell
            onSize={({ height }) =>
              dispatch(updateComponentHeight('frameSelector', height))
            }
          >
            <h1 className=''>Select A Size</h1>
            <FrameSelector
              direction={this.getResponsiveProp('frameSelector', 'direction')}
            />
          </SizeAwareCell>
          {/* Image Editor */}

          <SizeMe monitorHeight>
            {({ size }) => {
              const handledImageSize = this.handleDimensions(image);
              const artboardPadding = 16;
              const sanitizedSize = {};

              // Fixes any isses on initial load returning `undefined`;
              if (size.width) {
                sanitizedSize.width = size.width;
              } else {
                sanitizedSize.width = 0;
              }
              if (size.height) {
                sanitizedSize.height = size.height;
              } else {
                sanitizedSize.height = 0;
              }

              const artboardDimensions = aspectRatioFill(
                handledImageSize.width,
                handledImageSize.height,
                sanitizedSize.width,
                sanitizedSize.height
              );

              const containerDimensions = {
                width: artboardDimensions.width - artboardPadding * 2,
                height: artboardDimensions.height - artboardPadding * 2
              };

              const imageDimensions = {
                width: artboardDimensions.width - artboardPadding * 2,
                height: artboardDimensions.height - artboardPadding * 2
              };
              return (
                <AppHU
                  heightToSubtract={frameSelectorHeight + toolbarHeight}
                  asContainer={Cell}
                >
                  <ImageEditor
                    imageSrc={this.handleImageEditViaApi(linkedImage)}
                    containerDimensions={containerDimensions}
                    imageDimensions={imageDimensions}
                    handleLoadingStatus={this.loadingStatus}
                    // eslint-disable-next-line
                    loadingStatus={this.state.loading}
                    artboardDimensions={artboardDimensions}
                    artboardPadding={artboardPadding}
                    crop={crop}
                    height={sanitizedSize.height}
                    width={sanitizedSize.width}
                    updateCrop={updateCrop}
                    updateArtboardDimensions={updateArtboardDimensions}
                    storeImageDimensions={storeImageDimensions}
                    aspectRatioArray={frame.dimensions}
                  />
                </AppHU>
              );
            }}
          </SizeMe>

          {/* Tool Bar */}
          <SizeAwareCell
            onSize={({ height }) =>
              dispatch(updateComponentHeight('toolbar', height))
            }
          >
            <Grid vertical={false} alignY='middle'>
              <Cell auto='all'>
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
                  {/* <Toolbar.Group label='Flip'>
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
                        </Toolbar.Group> */}
                </Toolbar>
              </Cell>
              <Cell auto='all' className='align-center-middle text-center'>
                <Button
                  color={Colors.SECONDARY}
                  onClick={() => dispatch(updateView(Views.PREVIEW))}
                >
                  Apply Edit
                </Button>
              </Cell>
            </Grid>
          </SizeAwareCell>
        </Grid>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Edit);
