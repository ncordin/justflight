import React, { Fragment } from 'react';

import Header from '../components/Header';
import Content from '../components/Content';
import SettingChoices from '../components/Setting/SettingChoices';

const Setup = () => {
  return (
    <Fragment>
      <Header>Setup</Header>
      <Content>
        <SettingChoices name="receiverPort" description="Receiver port" />
        <SettingChoices
          name="receiverProtocol"
          description="Receiver protocol"
          values={['SBUS', 'IBUS']}
        />
        <SettingChoices
          name="armChannel"
          description="ARM channel"
          values={['AUX 1', 'AUX 2', 'AUX 3']}
        />
        <SettingChoices
          name="minVoltage"
          description="Warning voltage"
          values={[3.1, 3.2, 3.3, 3.4, 3.5, 3.6]}
        />
        <SettingChoices
          name="propsDirection"
          description="Props direction"
          values={['normal', 'inverted']}
        />
        <p className="details">
          <br />
          Next: Rssi & Smart audio ?
        </p>
      </Content>
    </Fragment>
  );
};

export default Setup;
