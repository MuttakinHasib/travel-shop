import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { loadUser } from '../Redux/actions/authActions';

const ProtectedRoute = ({ component: Component, isAuth, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        isAuth ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )
      }
    />
  );
};

const mapStateToProps = ({ auth: { isAuth } }) => ({ isAuth });

export default connect(mapStateToProps)(ProtectedRoute);
