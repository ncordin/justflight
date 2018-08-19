import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { selectSetting } from '../../store/settings/settings.selectors';
import { changeSetting } from '../../store/settings/settings.actions';

const connectToSettingByName = name => {
  const mapStateToProps = state => ({ setting: selectSetting(state, name) });
  const mapDispatchToProps = dispatch => ({
    onSelect: value => dispatch(changeSetting(name, value)),
  });

  return connect(
    mapStateToProps,
    mapDispatchToProps
  );
};

const RenderChildren = ({ setting, onSelect, children }) => {
  return children(setting, onSelect);
};

const ConnectToSetting = ({ name, children }) => {
  const Connection = connectToSettingByName(name)(RenderChildren);

  return <Connection>{children}</Connection>;
};

ConnectToSetting.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired,
};

export default ConnectToSetting;
