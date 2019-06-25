import React from 'react';
import sizeMe from 'react-sizeme';
import { connect } from 'react-redux';
import { TopBar as FoundationTopBar } from 'react-foundation';

import { updateTopBarHeight } from '../../redux/size';

const SizeAwareTopBar = sizeMe({ monitorHeight: true })(FoundationTopBar);

const TopBar = props => {
  const { dispatch, ...rest } = props;
  return (
    <SizeAwareTopBar
      onSize={({ height }) => dispatch(updateTopBarHeight(height))}
      {...rest}
    />
  );
};

export default connect()(TopBar);
