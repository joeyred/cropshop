/**
 * Copyright (c) 2019-present, Brian J. Hayes.
 *
 * https://github.com/joeyred
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// React
import React, {Component} from 'react';
import PropTypes from 'prop-types';
// 3rd Party UI Components
import {
  // Thumbnail,
  Label,
  Colors
} from 'react-foundation';
import Icon from '../Icon';
import classnames from 'classnames';
// Project Componets
// import SquareContainer from '../SquareContainer';
// Styles
import styles from './UploadThumbnail.module.scss';

class UploadThumbnail extends Component {
  static defaultProps = {
    handleClick: () => console.log('thumbnail clicked'),
    square:      true,
    isEdited:    false
  };

  static propTypes = {
    src:         PropTypes.string.isRequired,
    handleClick: PropTypes.func,
    square:      PropTypes.bool,
    isEdited:    PropTypes.bool,
  };
  constructor(props) {
    super(props);
    this.image = React.createRef();
    this.state = {
      portrait: null
    };
  }
  componentDidMount() {
    const portrait = this.image.current.offsetHeight > this.image.current.offsetWidth;
    this.setState({portrait});
  }
  render() {
    const {
      src,
      handleClick,
      isEdited,
    } = this.props;
    const style = this.props.style ? this.props.style : null;
    const containerClasses = classnames(
      styles.container,
      this.props.className ? this.props.className : null
    );
    const imageClass = this.state.portrait ? styles.portrait : null;

    const label = isEdited ? (
      <div className={styles.label}>
        <Label color={Colors.SUCCESS}>
          <Icon name='Done' /> Edited
        </Label>
      </div>
    ) : null;

    return (
      <button className={containerClasses} onClick={handleClick} style={style}>
        <div className={styles.thumbnail}>
          <img className={imageClass} ref={this.image} src={src} alt='' />
        </div>
        {label}
      </button>
    );
  }
}



export default UploadThumbnail;
