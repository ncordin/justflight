import React, { Component } from 'react';
import { connect } from 'react-redux';

import { selectCurrentPage } from '../../store/navigation/navigation.selectors';
import { setCurrentPage } from '../../store/navigation/navigation.actions';
import { saveSettings } from '../../store/settings/settings.actions';
import {
  selectChanges,
  selectIsSaving,
} from '../../store/settings/settings.selectors';

import Navigation from './Navigation';
import { PageTypes } from 'constants/navigation.constants';

interface Props {
  currentPage: PageTypes;
  setPage: (string) => void;
  changes: number;
  isSaving: boolean;
  save: () => void;
}
class NavigationContainer extends Component<Props> {
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
