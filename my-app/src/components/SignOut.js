import React from 'react';

import { auth } from './firebase';
import Button from '@material-ui/core/Button';

const SignOutButton = () =>
  <Button
    type="button"
    onClick={() => auth.signOut()}
  >
    Sign Out
  </Button>


export default SignOutButton;
