import React from 'react';
import { Button, Link as Btn } from '@geist-ui/react';
import { Upload } from '@geist-ui/react-icons';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../Redux/actions/authActions';
import { NavItem } from 'reactstrap';

const ProtectedMenu = ({ auth, logout }) => {
  if (auth.isAuth) {
    return (
      <>
        <NavItem className='mx-2'>
          <Link to='/product/upload' className='nav-link'>
            <Upload size={30} />
          </Link>
        </NavItem>
        <NavItem className='ml-2'>
          <Link to='/' className='nav-link'>
            <Button auto size='small' type='secondary-light' onClick={logout}>
              Log Out
            </Button>
          </Link>
        </NavItem>
      </>
    );
  } else {
    return (
      <>
        <NavItem className='ml-2'>
          <Link to='/login' className='nav-link'>
            <Button auto size='small' type='success-light'>
              Login
            </Button>
          </Link>
        </NavItem>
        <NavItem className='ml-2'>
          <Link to='/register' className='nav-link'>
            <Button auto size='small' type='secondary-light'>
              Register
            </Button>
          </Link>
        </NavItem>
      </>
    );
  }
};

const mapStateToProps = state => ({ auth: state.auth });
export default connect(mapStateToProps, { logout })(ProtectedMenu);
