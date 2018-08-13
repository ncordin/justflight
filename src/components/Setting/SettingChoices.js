import React from 'react';

import ConnectToSetting from './ConnectToSetting';
import Choices from '../../ui/Choices';
import './Setting.css';

const SettingChoices = ({ name, description, values }) => (
  <ConnectToSetting name={name}>
    {(selected, onSelect) => (
      <div className="Setting-row">
        <div className="Setting-description">{description}</div>
        <div className="Setting-value">
          <Choices values={values} selected={selected} onSelect={onSelect} />
        </div>
      </div>
    )}
  </ConnectToSetting>
);

export default SettingChoices;
