/**
 * Copyright (c) 2019-present, Brian J. Hayes.
 *
 * https://github.com/joeyred
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// eslint-disable-all
// React
import React, { Component } from 'react';
import PropTypes from 'prop-types'; // eslint-disable-line

import classnames from 'classnames';
// Project Componets
// import Icon from '../Icon';
import SquareContainer from '../SquareContainer';
// import SquareContainer from '../SquareContainer';
// Styles
import styles from './Thumbnail.module.scss';

// const calcStyleProp = (landscape, height, width) => {
//   const aspectRatio = width / height;
//   if (landscape) {
//     const updatedWidth = width * aspectRatio;
//     return {
//       width: updatedWidth,
//       height: width
//     };
//   }
//   return null;
// };

class Thumbnail extends Component {
  static defaultProps = {
    fill: true,
    className: null
  };

  static propTypes = {
    /**
     * Image source
     * @type {String}
     */
    src: PropTypes.string.isRequired,
    /**
     * If the image should fill the entire thumnail or reatin its aspect ratio.
     * @type {Boolean}
     */
    fill: PropTypes.bool,
    className: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.image = React.createRef();
    this.state = {
      landscape: null,
      imgHeight: null,
      imgWidth: null
    };
  }

  // REVIEW Move this to the constructor?
  componentDidMount() {
    const landscape =
      this.image.current.offsetHeight < this.image.current.offsetWidth;
    this.setState({
      landscape,
      imgHeight: this.image.current.offsetHeight,
      imgWidth: this.image.current.offsetWidth
    });
  }

  render() {
    const { src, className } = this.props;
    const {
      // portrait,
      landscape,
      imgHeight,
      imgWidth
    } = this.state;

    // Handle any passed inline styles
    // const style = this.props.style ? this.props.style : null;

    // Handle any passed class names
    const containerClasses = classnames(styles.container, className);
    // Handle addition of portrait class based on image aspect ratio
    // const imageClass = portrait ? styles.portrait : null;
    // const imgStyle = calcStyleProp(landscape, imgHeight, imgWidth);
    // REVIEW Handle passing a proper `alt` value
    // return (
    //   <div className={containerClasses} style={style}>
    //     <img className={imageClass} ref={this.image} src={src} alt='' />
    //   </div>
    // );
    return (
      <SquareContainer centerContent overflow={false}>
        {/* <div className={containerClasses} style={imgStyle}> */}
        <div className={containerClasses}>
          <img ref={this.image} src={src} alt='' />
        </div>
      </SquareContainer>
    );
  }
}

export default Thumbnail;
