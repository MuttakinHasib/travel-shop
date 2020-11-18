import React, { useEffect, useState } from 'react';
import Odometer from 'react-odometerjs';
import './NotFound.css';
import 'odometer/themes/odometer-theme-default.css';

const NotFound = () => {
  const [countUp, setCountUp] = useState({
    one: 3,
    two: 7,
    three: 9,
  });
  useEffect(() => {
    setCountUp({ ...countUp, one: 4, two: 0, three: 4 });
  }, []);
  const { one, two, three } = countUp;
  return (
    <div
      className='d-flex justify-content-center align-items-center'
      style={{ height: '70vh' }}
    >
      <div className='error'>
        <div className='container-floud'>
          <div className={'col-xs-12 ground-color text-center'}>
            <div className='container-error-404'>
              <div className='clip'>
                <div className='not-found-shadow'>
                  <span className='digit thirdDigit'>
                    <Odometer value={one} format='d' />
                  </span>
                </div>
              </div>
              <div className='clip'>
                <div className='not-found-shadow'>
                  <span className='digit secondDigit'>
                    <Odometer value={two} format='d' />
                  </span>
                </div>
              </div>
              <div className='clip'>
                <div className='not-found-shadow'>
                  <span className='digit firstDigit'>
                    <Odometer value={three} format='d' />
                  </span>
                </div>
              </div>
              <div className='msg'>
                OH!<span className='triangle'></span>
              </div>
            </div>
            <h2 className='h1'>Sorry! Page not found</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
