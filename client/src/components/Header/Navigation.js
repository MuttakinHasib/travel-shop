import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Button as AntdButton } from 'antd';

import { ShoppingCartOutlined } from '@ant-design/icons';
import {
  Collapse,
  Container,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
} from 'reactstrap';
import ProtectedMenu from './ProtectedMenu';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(prev => !prev);
  return (
    <Navbar
      color='white'
      className='border-bottom fixed-top'
      light
      expand='sm'
    >
      <Container>
        <Link to='/'>
          <NavbarBrand>Travel Shop</NavbarBrand>
        </Link>
        <NavbarToggler style={{ border: 'none' }} onClick={toggle} />
        <Collapse isOpen={isOpen} navbar className='mt-3 mt-md-0'>
          <Nav className='ml-auto' navbar>
            <NavItem className='mx-2'>
              <Link to='/cart' className='nav-link'>
                <Badge count={0} showZero>
                  <ShoppingCartOutlined style={{ fontSize: '30px' }} />
                </Badge>
              </Link>
            </NavItem>
            <ProtectedMenu />
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
