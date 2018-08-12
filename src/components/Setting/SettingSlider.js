import React from 'react';
import Slider from '../../ui/Slider';

import './Setting.css';

const SettingSlider = ({ name, description, min, max, step, selected }) => {
  return (
    <div className="Setting-row">
      <div className="Setting-description">{description}</div>
      <div className="Setting-value">
        <Slider
          min={min}
          max={max}
          step={step}
          selected={selected}
          onSelect={value => {
            console.log(value);
          }}
        />
      </div>
    </div>
  );
};

export default SettingSlider;
