import React, { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';
import welcomeSvg from '../../assets/images/welcome.svg';
import { Link, Redirect } from 'react-router-dom';
import { Key, LogIn } from '@geist-ui/react-icons';
import { Button } from '@geist-ui/react';
import { activeAccount } from '../../Redux/actions/authActions';
import { connect } from 'react-redux';

const Activation = ({ match, auth, activeAccount }) => {
  const { isLoading,isAuth } = auth;
  const [formData, setFormData] = useState({
    name: '',
    token: '',
    show: true,
  });

  useEffect(() => {
    const token = match.params.token;
    const { name } = jwt.decode(token);
    if (token) {
      setFormData({ ...formData, name, token });
    }
    // eslint-disable-next-line
  }, []);

  const { name, token } = formData;

  const onSubmit = e => {
    e.preventDefault();
    if (token) {
      activeAccount(token);
      setFormData({ ...formData, show: false });
    }
  };
  return (
    <div className='min-h-screen bg-gray-100 text-gray-100 flex justify-center'>
      {isAuth && <Redirect to='/' />}
      <div className='max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1'>
        <div className='md:w-1/2 w-full xl:w-6/12  p-6 sm:p-12'>
          <div className='flex flex-col items-center'>
            <h1 className='text-2xl xl:text-3xl font-bold text-black'>
              Welcome {name}
            </h1>
            <form
              className='w-full flex-1 mt-8 text-indigo-500'
              onSubmit={onSubmit}
            >
              <div className='mx-auto max-w-xs relative'>
                <Button
                  onClick={onSubmit}
                  type='success-light'
                  size='large'
                  loading={isLoading}
                  style={{ width: '100%' }}
                  icon={<Key />}
                  className='mt-5'
                >
                  Active your account
                </Button>

                <div className='my-5 flex items-center justify-center border-b text-center'>
                  <div className='leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2'>
                    Or sign up again
                  </div>
                </div>
                <div className='flex flex-col items-center'>
                  <Link to='/login' className='w-full max-w-xs'>
                    <Button
                      type='secondary-light'
                      size='large'
                      icon={<LogIn />}
                      style={{ width: '100%' }}
                      className='mt-5'
                    >
                      Login
                    </Button>
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className='flex-1 bg-indigo-100 text-center hidden md:flex'>
          <div
            className='m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat'
            style={{ backgroundImage: `url(${welcomeSvg})` }}
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({ auth: state.auth });

export default connect(mapStateToProps, { activeAccount })(Activation);
