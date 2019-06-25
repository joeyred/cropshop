import React from 'react';
import { connect } from 'react-redux';
import replace from 'lodash/replace';

import styles from './TopBarTitle.module.scss';

const mapStateToProps = state => ({
  collection: state.frame.selectedCollectionId
});

const TopBar = props => {
  const { collection } = props;
  const title = replace(collection, '-', ' ');
  return (
    <div className={styles.container}>
      <span className={styles.title}>{title}</span>
    </div>
  );
};

export default connect(mapStateToProps)(TopBar);
