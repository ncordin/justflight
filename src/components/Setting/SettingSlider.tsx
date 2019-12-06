import React from 'react';

import ConnectToSetting from './ConnectToSetting';
import Slider from '../../ui/Slider';
import './Setting.css';

interface Props {
  name: string;
  description: string;
  min: number;
  max: number;
  step: number;
  marks?: number[];
}

const SettingSlider = ({ name, description, min, max, step, marks }: Props) => (
  <ConnectToSetting name={name}>
    {(setting, onSelect) => (
      <div className="Setting-row">
        <div className="Setting-description">{description}</div>
        <div className="Setting-value">
          <Slider
            min={min}
            max={max}
            step={step}
            marks={marks}
            selected={setting.current}
            onSelect={onSelect}
          />
        </div>
      </div>
    )}
  </ConnectToSetting>
);

export default SettingSlider;
