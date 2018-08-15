import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { selectCurrentPage } from '../../store/navigation/navigation.selectors';
import { setCurrentPage } from '../../store/navigation/navigation.actions';
import { saveSettings } from '../../store/settings/settings.actions';
import {
  selectChanges,
  selectIsSaving,
} from '../../store/settings/settings.selectors';

import Navigation from './Navigation';
class NavigationContainer extends Component {
  render() {
    const { currentPage, setPage, changes, isSaving, save } = this.props;

    return (
      <Navigation
        currentPage={currentPage}
        setPage={setPage}
        changes={changes}
        isSaving={isSaving}
        onSave={save}
      />
    );
  }
}

NavigationContainer.propTypes = {
  currentPage: PropTypes.string,
  setPage: PropTypes.func.isRequired,
  changes: PropTypes.number.isRequired,
  isSaving: PropTypes.bool.isRequired,
  save: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  currentPage: selectCurrentPage(state),
  changes: selectChanges(state),
  isSaving: selectIsSaving(state),
});

const mapDispatchToProps = dispatch => ({
  setPage: page => dispatch(setCurrentPage(page)),
  save: () => dispatch(saveSettings()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationContainer);
