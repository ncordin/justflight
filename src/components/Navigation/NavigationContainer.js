import React, { Component } from 'react';
import { connect } from 'react-redux';

import { selectCurrentPage } from '../../store/navigation/navigation.selectors';
import { setCurrentPage } from '../../store/navigation/navigation.actions';

import { saveSettings } from '../../settings';

import Navigation from './Navigation';
class NavigationContainer extends Component {
  render() {
    return (
      <Navigation
        currentPage={this.props.currentPage}
        setPage={this.props.setPage}
        onSave={() => {
          saveSettings({ minVoltage: 3 });
        }}
      />
    );
  }
}

const mapStateToProps = state => ({
  currentPage: selectCurrentPage(state),
});

const mapDispatchToProps = dispatch => ({
  setPage: page => dispatch(setCurrentPage(page)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationContainer);
