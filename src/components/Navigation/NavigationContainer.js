import React, { Component } from 'react';
import { connect } from 'react-redux';

import { selectCurrentPage } from '../../store/navigation/navigation.selectors';
import { setCurrentPage } from '../../store/navigation/navigation.actions';

import { selectSettings } from '../../store/settings/settings.selectors';
import { saveSettings } from '../../settings';

import Navigation from './Navigation';
class NavigationContainer extends Component {
  render() {
    const { currentPage, setPage, settings } = this.props;

    return (
      <Navigation
        currentPage={currentPage}
        setPage={setPage}
        onSave={() => {
          saveSettings(settings);
        }}
      />
    );
  }
}

const mapStateToProps = state => ({
  currentPage: selectCurrentPage(state),
  settings: selectSettings(state),
});

const mapDispatchToProps = dispatch => ({
  setPage: page => dispatch(setCurrentPage(page)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationContainer);
