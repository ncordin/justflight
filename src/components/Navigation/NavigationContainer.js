import { connect } from 'react-redux';

import { selectCurrentPage } from '../../store/navigation/navigation.selectors';
import { setCurrentPage } from '../../store/navigation/navigation.actions';

import Navigation from './Navigation';

const mapStateToProps = state => ({
  currentPage: selectCurrentPage(state)
});

const mapDispatchToProps = dispatch => ({
  setPage: page => dispatch(setCurrentPage(page))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigation);
