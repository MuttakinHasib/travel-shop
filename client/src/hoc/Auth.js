import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { loadUser } from '../Redux/actions/authActions';

export default function (ComposedClass, reload, adminRoute = null) {
  function AuthenticationCheck(props) {
    let { isAuth } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(loadUser());
    }, [dispatch, props.history]);

    return isAuth ? <ComposedClass {...props} />: <Redirect/>;
  }
  return AuthenticationCheck;
}
