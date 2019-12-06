import React from 'react';
import { connect } from 'react-redux';

import { selectSetting } from '../../store/settings/settings.selectors';
import { changeSetting } from '../../store/settings/settings.actions';

const connectToSettingByName = name => {
  const mapStateToProps = state => ({ setting: selectSetting(state, name) });
  const mapDispatchToProps = dispatch => ({
    onSelect: value => dispatch(changeSetting(name, value)),
  });

  return connect(mapStateToProps, mapDispatchToProps);
};

const RenderChildren = ({ setting, onSelect, children }) => {
  return children(setting, onSelect);
};

interface Props {
  children: any;
  name: string;
}

const ConnectToSetting = ({ name, children }: Props) => {
  const Connection = connectToSettingByName(name)(RenderChildren);

  return <Connection>{children}</Connection>;
};

export default ConnectToSetting;
