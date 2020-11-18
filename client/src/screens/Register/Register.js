import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Link, Redirect } from 'react-router-dom';
import { Button } from '@geist-ui/react';
import { LogIn, UserPlus } from '@geist-ui/react-icons';
import axios from 'axios';
import { connect } from 'react-redux';
import { isAuth } from '../../helpers/auth';
import authSvg from '../../assets/images/auth.svg';
import GoogleSignIn from '../../Authentication/Google/GoogleSignIn';
import FacebookSignIn from '../../Authentication/Facebook/FacebookSignIn';
import { registerUser } from '../../Redux/actions/authActions';

const Register = ({ registerUser, auth }) => {
  const { isAuth, isLoading } = auth;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password1: '',
    password2: '',
  });

  const { name, email, password1, password2 } = formData;
  const onChange = text => e =>
    setFormData({ ...formData, [text]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();

    if (name && email && password1) {
      if (password1 === password2) {
        registerUser({
          name,
          email,
          password: password1,
        });
        setFormData({ name: '', email: '', password1: '', password2: '' });
      } else {
        toast.error("Passwords don't matches");
      }
    } else {
      toast.error('Please fill all fields');
    }
  };

  return (
    <div className='min-h-screen bg-gray-100 text-gray-100 flex justify-center'>
      {isAuth && <Redirect to='/' />}
      <div className='max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1 m-5'>
        <div className='lg:w-1/2 w-full xl:w-6/12 p-6 sm:p-12'>
          <div className='flex flex-col items-center'>
            <h1 className='text-2xl xl:text-3xl font-bold text-black'>
              Sign Up for MERN Auth
            </h1>
            <form
              className='w-full flex-1 mt-8 text-indigo-500'
              onSubmit={onSubmit}
            >
              <div className='mx-auto max-w-xs relative'>
                <input
                  type='text'
                  className='w-full px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-700 text-sm focus:bg-white mt-3'
                  placeholder='Enter your Name'
                  onChange={onChange('name')}
                  value={name}
                />
                <input
                  type='email'
                  className='w-full px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-700 text-sm focus:bg-white mt-3'
                  placeholder='Enter E-mail address'
                  onChange={onChange('email')}
                  value={email}
                />
                <input
                  type='password'
                  className='w-full px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-700 text-sm focus:bg-white mt-3'
                  placeholder='Enter password'
                  onChange={onChange('password1')}
                  value={password1}
                />
                <input
                  type='password'
                  className='w-full px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-700 text-sm focus:bg-white mt-3'
                  placeholder='Confirm password'
                  onChange={onChange('password2')}
                  value={password2}
                />
                <Button
                  htmlType='submit'
                  onClick={onSubmit}
                  type='success-light'
                  size='large'
                  loading={isLoading}
                  style={{ width: '100%' }}
                  icon={<UserPlus />}
                  className='mt-3'
                >
                  Register
                </Button>
              </div>
              <div className='my-3 flex items-center justify-center border-b text-center'>
                <div className='leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2'>
                  Or sign with email or social login
                </div>
              </div>
              <div className='flex flex-col items-center'>
                <Link to='/login' className='w-full max-w-xs'>
                  <Button
                    type='secondary-light'
                    size='large'
                    icon={<LogIn />}
                    style={{ width: '100%' }}
                    className='mt-3'
                  >
                    Login
                  </Button>
                </Link>
                <GoogleSignIn />
                <FacebookSignIn />
              </div>
            </form>
          </div>
        </div>
        <div className='flex-1 bg-indigo-100 text-center hidden md:flex'>
          <div
            className='m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat'
            style={{ backgroundImage: `url(${authSvg})` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

// const mapStateToDispatch = dispatch => ({
//   registerUser: () => dispatch(registerUser),
// });
const mapStateToProps = state => ({ auth: state.auth });
export default connect(mapStateToProps, { registerUser })(Register);
