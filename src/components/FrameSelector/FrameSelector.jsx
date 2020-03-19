/**
 * Copyright (c) 2019-present, Brian J. Hayes.
 *
 * https://github.com/joeyred
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// React
import React from 'react';
import PropTypes from 'prop-types'; // eslint-disable-line
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import { compact, map, sortBy } from 'lodash';
// import compact from 'lodash/compact';
import map from 'lodash/map';
// import sortBy from 'lodash/sortBy';
// 3rd Party Components
// import {
//   Grid,
//   // GridContainer,
//   Cell
// } from 'react-foundation';

import { updateSelectedFrame } from '../../redux/actions/frame';
import { updateCropFullCenter } from '../../redux/actions/editor';

// Project Components
import Scrollable from '../Scrollable';
import PictureFrame from './PictureFrame';
import PriceDisplay from './PriceDisplay';

// Styles
import styles from './FrameSelector.module.scss';

const mapStateToProps = state => ({
  frames: state.frame.frames,
  selectedFrameId: state.frame.selectedFrameId,
  frameList: state.frame.frameList,
  // selectedCollectionId: state.frame.selectedCollectionId,
  imageSizeRendered: state.editor.imageSizeRendered,
  showPrices: state.config.display.showPrices
});

const FrameSelector = props => {
  const {
    frames,
    selectedFrameId,
    // selectedCollectionId,
    frameList,
    direction,
    imageSizeRendered,
    showPrices,
    dispatch
  } = props;

  const handleClick = id => {
    const aspect = frames.byId[id].dimensions;
    dispatch(updateSelectedFrame(id));
    // console.log(aspect, imageSize);
    dispatch(
      updateCropFullCenter(
        { width: aspect[0], height: aspect[1] },
        imageSizeRendered
      )
    );
  };
  const vertical = direction === 'vertical';
  const frameStyles =
    frameList.length > 5 ? styles.scrollableFrame : styles.frame;
  return (
    <div className={styles.container}>
      <Scrollable
        vertical={vertical}
        style={{ height: '100%', padding: '2rem 0' }}
        hint
      >
        <div className={vertical ? styles.column : styles.row}>
          {map(frameList, frame => {
            // if (tempFrame === null) {
            //   tempFrame = frame.id;
            //   // console.log(frame.id);
            //   dispatch(updateSelectedFrame(frame.id));
            // }
            const active = frame.id === selectedFrameId;
            return (
              <div key={frame.id} className={frameStyles}>
                <button
                  type='button'
                  className={`${active ? styles.active : null} ${
                    styles.button
                  }`}
                  onClick={() => handleClick(frame.id)}
                >
                  <PictureFrame dimensions={{ ...frame.display }} />
                </button>
                {showPrices ? <PriceDisplay price={frame.price} /> : null}
              </div>
            );
          })}
        </div>
      </Scrollable>
    </div>
  );
};

FrameSelector.defaultProps = {
  frames: {},
  direction: 'horizontal'
};

FrameSelector.propTypes = {
  frames: PropTypes.shape({
    byId: PropTypes.object,
    allIds: PropTypes.array
  }),
  // selectedFrameId: PropTypes.oneOfType([
  //   PropTypes.string,
  //   PropTypes.bool
  // ]).isRequired,
  direction: PropTypes.oneOf(['vertical', 'horizontal'])
  // clickHandler:     PropTypes.func,
};

export default connect(mapStateToProps)(FrameSelector);
