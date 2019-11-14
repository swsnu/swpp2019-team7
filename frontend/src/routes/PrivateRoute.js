import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import ax from '../api';

function PrivateRoute({ component: Component, ...rest }) {
  ax.defaults.headers.common['X-CSRFToken'] = JSON.parse(localStorage.getItem('localCsrf'));
  return (
    <Route
      {...rest}
      render={(props) => (rest.logged_in ? <Component {...props} /> : <Redirect to="/landing" />)}
    />
  );
}
const mapStateToProps = (state) => ({
  logged_in: state.user.logged_in,
});
export default connect(mapStateToProps)(PrivateRoute);
