import React from 'react';
import PropTypes from 'prop-types';

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

SettingSlider.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  marks: PropTypes.array,
};

export default SettingSlider;
