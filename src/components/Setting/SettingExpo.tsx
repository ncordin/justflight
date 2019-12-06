import React from 'react';
import { connect } from 'react-redux';
import { first, last } from 'lodash';

import SettingSlider from './SettingSlider';
import { selectSetting } from '../../store/settings/settings.selectors';
import { buildExpoList, findSuperRateFromVelocity } from '../../helpers/rates';

interface Props {
  velocity: number;
}

const SettingExpo = ({ velocity }: Props) => {
  const superRate = findSuperRateFromVelocity(velocity);
  const expos: number[] = Object.values(buildExpoList(superRate));

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

const mapStateToProps = state => ({
  velocity: selectSetting(state, 'rates').current,
});

export default connect(mapStateToProps)(SettingExpo);
