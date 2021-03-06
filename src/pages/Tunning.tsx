import React, { Fragment } from 'react';

import Header from '../components/Header';
import Content from '../components/Content';
import SettingSlider from '../components/Setting/SettingSlider';
import SettingChoices from '../components/Setting/SettingChoices';
import SettingExpo from '../components/Setting/SettingExpo';

import { buildSuperRateList } from '../helpers/rates';

const Tunning = () => {
  const superRates = buildSuperRateList();

  return (
    <Fragment>
      <Header>Tunning</Header>
      <Content>
        <SettingSlider
          name="rates"
          description="Velocity (deg / sec)"
          min={500}
          max={1250}
          step={1}
          marks={Object.values(superRates)}
        />
        <SettingExpo />
        <SettingChoices
          name="stickAcceleration"
          description="Stick acceleration"
          values={[0, 2, 4, 6, 8, 10, 12]}
        />
        <SettingChoices
          name="stickTransition"
          description="Stick transition"
          values={['smooth', 'medium', 'twitchy']}
        />
        <SettingSlider
          name="idleThrottle"
          description="Idle throttle"
          min={3.5}
          max={10}
          step={0.5}
        />
        <SettingChoices
          name="filters"
          description="Filters"
          values={['tolerent', 'default', 'clean']}
        />
      </Content>
    </Fragment>
  );
};

export default Tunning;
