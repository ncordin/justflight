import React, { Fragment } from 'react';

import Header from '../components/Header';
import Content from '../components/Content';
import SettingSlider from '../components/Setting/SettingSlider';
import SettingChoices from '../components/Setting/SettingChoices';

const Tunning = () => {
  return (
    <Fragment>
      <Header>Tunning</Header>
      <Content>
        <SettingSlider
          name="rates"
          description="Rates (deg / sec)"
          min={500}
          max={1200}
          step={20}
          selected={800}
        />
        <SettingChoices
          name="expo"
          description="Expo"
          values={[0, 1, 2, 3, 4, 5, 6, 7, 8]}
          selected={4}
        />
        <SettingChoices
          name="stickAcceleration"
          description="Stick acceleration"
          values={[0, 1, 2, 3, 4, 5, 6, 7, 8]}
          selected={4}
        />
        <SettingChoices
          name="stickDeceleration"
          description="Stick center cooling"
          values={[0, 2, 4, 6, 8, 10]}
          selected={2}
        />
        <SettingSlider
          name="idleThrottle"
          description="Idle throttle"
          min={3.5}
          max={10}
          step={0.5}
          selected={6}
        />
        <SettingChoices
          name="filters"
          description="Filters"
          values={['tolerent', 'default', 'clean']}
          selected={'default'}
        />
      </Content>
    </Fragment>
  );
};

export default Tunning;
