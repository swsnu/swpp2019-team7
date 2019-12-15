import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

function PublicRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => (rest.logged_in ? <Redirect to="/dashboard/0" /> : <Component {...props} />)}
    />
  );
}
const mapStateToProps = (state) => ({
  logged_in: state.user.logged_in,
});
export default connect(mapStateToProps)(PublicRoute);
