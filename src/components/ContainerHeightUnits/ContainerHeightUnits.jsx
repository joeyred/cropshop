import React from 'react';
import PropTypes from 'prop-types'; //eslint-disable-line

import styles from './ContainerHeightUnits.module.scss';

const ContainerHeightUnits = props => {
  const { ch, containerHeight, overflowY, children, style } = props;
  const allStyles = style ? { ...style } : {};
  const height = `${containerHeight * (ch / 100)}px`;
  const atts = {};
  allStyles.height = height;

  if (overflowY) {
    atts.className = styles.container;
  }
  atts.style = allStyles;

  return <div {...atts}>{children}</div>;
};

ContainerHeightUnits.defaultProps = {
  ch: 100,
  overflowY: false,
  containerHeight: 0
};

ContainerHeightUnits.propTypes = {
  ch: PropTypes.number,
  overflowY: PropTypes.bool,
  containerHeight: PropTypes.number
};

export default ContainerHeightUnits;
