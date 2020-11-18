import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Container } from 'reactstrap';
import Navigation from './components/Header/Navigation';
import ProtectedRoute from './hoc/ProtectedRoute';
import { loadUser } from './Redux/actions/authActions';
import Activation from './screens/Activation/Activation';
import ForgetPassword from './screens/ForgetPassword/ForgetPassword';
import Home from './screens/Home';
import Login from './screens/Login/Login';
import NotFound from './screens/NotFoundPage/NotFound';
import Register from './screens/Register/Register';
import ResetPassword from './screens/ResetPassword/ResetPassword';
import UploadProduct from './screens/UploadProduct/UploadProduct';

const App = ({ loadUser }) => {
  useEffect(() => {
    loadUser();
  }, []);

  return (
    <>
      <Navigation />
      <ToastContainer className='mt-5' />
      <Switch>
        <Route path='/' exact render={props => <Home {...props} />} />
        <Route
          path='/register'
          exact
          render={props => <Register {...props} />}
        />
        <Route path='/login' exact render={props => <Login {...props} />} />
        <Route
          path='/users/password/forget'
          exact
          render={props => <ForgetPassword {...props} />}
        />
        <Route
          path='/users/active/:token'
          exact
          render={props => <Activation {...props} />}
        />
        <Route
          path='/users/password/reset/:token'
          exact
          render={props => <ResetPassword {...props} />}
        />
        <ProtectedRoute
          path='/product/upload'
          exact
          component={UploadProduct}
        />
        <Route path='*' exact component={NotFound} />
      </Switch>
    </>
  );
};

export default connect(null, { loadUser })(App);
