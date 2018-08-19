import React from 'react';
import PropTypes from 'prop-types';

import ConnectToSetting from './ConnectToSetting';
import Choices from '../../ui/Choices';
import './Setting.css';

const SettingChoices = ({ name, description, values }) => (
  <ConnectToSetting name={name}>
    {(setting, onSelect) => (
      <div className="Setting-row">
        <div className="Setting-description">{description}</div>
        <div className="Setting-value">
          <Choices
            values={values || setting.choices}
            selected={setting.current}
            onSelect={onSelect}
          />
        </div>
      </div>
    )}
  </ConnectToSetting>
);

SettingChoices.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  values: PropTypes.array,
};

export default SettingChoices;
