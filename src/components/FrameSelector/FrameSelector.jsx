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
// Styles
import styles from './FrameSelector.module.scss';

const mapStateToProps = state => ({
  frames: state.frame.frames,
  selectedFrameId: state.frame.selectedFrameId,
  frameList: state.frame.frameList,
  // selectedCollectionId: state.frame.selectedCollectionId,
  imageSize: state.editor.imageSize
});

const FrameSelector = props => {
  const {
    frames,
    selectedFrameId,
    // selectedCollectionId,
    frameList,
    direction,
    imageSize,

    dispatch
  } = props;

  const handleClick = id => {
    const aspect = frames.byId[id].dimensions;
    dispatch(updateSelectedFrame(id));
    // console.log(aspect, imageSize);
    dispatch(updateCropFullCenter(aspect, imageSize));
  };
  const vertical = direction === 'vertical';

  return (
    <div className={styles.container}>
      <Scrollable
        vertical={vertical}
        style={{ height: '100%', padding: '2rem 0' }}
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
              <div key={frame.id} className={styles.frame}>
                <button
                  type='button'
                  className={`${active ? styles.active : null} ${
                    styles.button
                  }`}
                  onClick={() => handleClick(frame.id)}
                >
                  <PictureFrame
                    dimensions={{ width: frame.width, height: frame.height }}
                  />
                </button>
                <div className={styles.price}>
                  <span className={styles['currency-symbol']}>$</span>
                  <span>{frame.price}</span>
                </div>
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
  // clickHandler: (index) => console.log(`FrameSelector - Index Selected: ${index}`)
};

FrameSelector.propTypes = {
  frames: PropTypes.shape({
    byId: PropTypes.object,
    allIds: PropTypes.array
  }),
  // selectedFrameId: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  direction: PropTypes.oneOf(['vertical', 'horizontal'])
  // clickHandler:     PropTypes.func,
};

export default connect(mapStateToProps)(FrameSelector);
