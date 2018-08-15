import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { first, last } from 'lodash';

import SettingSlider from './SettingSlider';
import { selectSetting } from '../../store/settings/settings.selectors';
import { buildExpoList, findSuperRateFromVelocity } from '../../helpers/rates';

const SettingExpo = ({ velocity }) => {
  const superRate = findSuperRateFromVelocity(velocity);
  const expos = Object.values(buildExpoList(superRate));

  return (
    <SettingSlider
      name="expo"
      description="Mid-range velocity"
      min={first(expos)}
      max={last(expos)}
      step={1}
      marks={expos}
    />
  );
};

SettingExpo.propTypes = {
  velocity: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  velocity: selectSetting(state, 'rates'),
});

export default connect(mapStateToProps)(SettingExpo);
