import React from 'react';

import ConnectToSetting from './ConnectToSetting';
import Choices from '../../ui/Choices';
import './Setting.css';

interface Props {
  name: string;
  description: string;
  values?: number[] | string[];
}

const SettingChoices = ({ name, description, values }: Props) => (
  <ConnectToSetting name={name}>
    {(setting, onSelect) => (
      <div className="Setting-row">
        <div className="Setting-description">{description}</div>
        <div className="Setting-value">
          <Choices
            values={values || setting.choices}
            selected={setting}
            onSelect={onSelect}
          />
        </div>
      </div>
    )}
  </ConnectToSetting>
);

export default SettingChoices;
