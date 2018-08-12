import React from 'react';
import Choices from '../../ui/Choices';

import './Setting.css';

const SettingChoices = ({ name, description, values, selected }) => {
  return (
    <div className="Setting-row">
      <div className="Setting-description">{description}</div>
      <div className="Setting-value">
        <Choices
          values={values}
          selected={selected}
          onSelect={value => {
            console.log(value);
          }}
        />
      </div>
    </div>
  );
};

export default SettingChoices;
