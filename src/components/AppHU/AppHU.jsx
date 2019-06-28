import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Scrollable from '../Scrollable';

const mapStateToProps = state => ({
  topbarHeight: state.size.topbarHeight,
  appHeight: state.size.app.height
});

const AppHU = props => {
  const {
    topbarHeight,
    scrollable,
    appHeight,
    heightToSubtract,
    keepTopBarHeight,
    heightUnit,
    asContainer,
    style,
    dispatch,
    // className,
    children,
    ...rest
  } = props;

  // const atts = {};

  // Handle ClassName
  // if (className) {
  //   atts.className = className;
  // }
  const ElementToRender = asContainer;
  // Handle Styles
  const styleAtt = style ? { ...style } : {};

  // convert App Height Units
  const percentage = heightUnit / 100;
  const heightKeepTopBar = (appHeight - heightToSubtract) * percentage;
  const heightSubtractTopBar =
    (appHeight - heightToSubtract - topbarHeight) * percentage;
  // Get the height to assign the container/element/component
  const height = keepTopBarHeight ? heightKeepTopBar : heightSubtractTopBar;
  styleAtt.height = `${height}px`;

  if (scrollable) {
    return (
      <Scrollable style={styleAtt} asContainer={asContainer} {...rest}>
        {children}
      </Scrollable>
    );
  }

  if (ElementToRender) {
    return (
      <ElementToRender style={styleAtt} {...rest}>
        {children}
      </ElementToRender>
    );
  }

  return (
    <div style={styleAtt} {...rest}>
      {children}
    </div>
  );
};

AppHU.defaultProps = {
  /**
   * Option element or component to be rendered instead of a div wrapper
   * @type {Boolean|Element}
   */
  asContainer: false,
  scrollable: false,
  heightUnit: 100,
  topbarHeight: 0,
  appHeight: 0,
  heightToSubtract: 0,
  keepTopBarHeight: false
};

AppHU.propTypes = {
  asContainer: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  scrollable: PropTypes.bool,
  heightUnit: PropTypes.number,
  topbarHeight: PropTypes.number,
  appHeight: PropTypes.number,
  heightToSubtract: PropTypes.number,
  keepTopBarHeight: PropTypes.bool
};

export default connect(mapStateToProps)(AppHU);
