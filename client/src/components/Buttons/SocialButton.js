import { Button } from '@geist-ui/react';
import React from 'react';

const SocialButton = props => {
  return (
    <Button
      {...props}
      size='large'
      icon={props.icon}
      className='mt-3'
    >
      {props.children}
    </Button>
  );
};

export default SocialButton;
