import React, { useEffect, useState } from 'react';
import { Lock, LogIn } from '@geist-ui/react-icons';
import { toast, ToastContainer } from 'react-toastify';
import { Link, Redirect } from 'react-router-dom';
import { Button } from '@geist-ui/react';
import authSvg from '../../assets/images/auth.svg';
import { connect } from 'react-redux';
import { resetPassword } from '../../Redux/actions/authActions';

const ResetPassword = ({ match, auth, resetPassword }) => {
  const { isLoading, isAuth } = auth;
  const [formData, setFormData] = useState({
    password1: '',
    password2: '',
    token: '',
  });

  const { password1, password2, token } = formData;

  useEffect(() => {
    let token = match.params.token;
    if (token) {
      setFormData({ ...formData, token });
    }
    // eslint-disable-next-line
  }, []);

  const onChange = text => e =>
    setFormData({ ...formData, [text]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();

    if (password1 === password2 && password1 && password2) {
      resetPassword({
        newPassword: password1,
        resetPasswordLink: token,
      });
      setFormData({ ...formData, password1: '', password2: '' });
    } else {
      toast.error("Passwords don't matches");
    }
  };

  return (
    <div className='min-h-screen bg-gray-100 text-gray-100 flex justify-center'>
      {isAuth && <Redirect to='/' />}
      <div className='max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1'>
        <div className='lg:w-1/2 w-full xl:w-6/12 p-6 sm:p-12'>
          <div className='mt-12 flex flex-col items-center'>
            <h1 className='text-2xl xl:text-3xl font-bold text-black'>
              Reset your password
            </h1>
            <form
              className='w-full flex-1 mt-8 text-indigo-500'
              onSubmit={onSubmit}
            >
              <div className='mx-auto max-w-xs relative'>
                <input
                  type='password'
                  className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-700 text-sm focus:bg-white mt-5'
                  placeholder='New password'
                  onChange={onChange('password1')}
                  value={password1}
                />
                <input
                  type='password'
                  className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-700 text-sm focus:bg-white mt-5'
                  placeholder='Confirm password'
                  onChange={onChange('password2')}
                  value={password2}
                />
                <Button
                  onClick={onSubmit}
                  type='success-light'
                  size='large'
                  loading={isLoading}
                  style={{ width: '100%' }}
                  icon={<Lock />}
                  className='mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out'
                >
                  Reset password
                </Button>
              </div>
              <div className='my-5 flex items-center justify-center border-b text-center'>
                <div className='leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2'>
                  Or sign with email or social login
                </div>
              </div>
              <div className='flex flex-col items-center mt-10'>
                <Link to='/login' className='w-full max-w-xs'>
                  <Button
                    type='secondary-light'
                    size='large'
                    icon={<LogIn />}
                    style={{ width: '100%' }}
                    className='mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out'
                  >
                    Login
                  </Button>
                </Link>
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
const mapStateToProps = state => ({ auth: state.auth });
export default connect(mapStateToProps, { resetPassword })(ResetPassword);
