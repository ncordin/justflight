import React from 'react';

import ConnectToSetting from './ConnectToSetting';
import Slider from '../../ui/Slider';
import './Setting.css';

const SettingSlider = ({ name, description, min, max, step, marks }) => (
  <ConnectToSetting name={name}>
    {(selected, onSelect) => (
      <div className="Setting-row">
        <div className="Setting-description">{description}</div>
        <div className="Setting-value">
          <Slider
            min={min}
            max={max}
            step={step}
            marks={marks}
            selected={selected}
            onSelect={onSelect}
          />
        </div>
      </div>
    )}
  </ConnectToSetting>
);

export default SettingSlider;
