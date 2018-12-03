import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { SignUpLink } from './SignUp';
import {auth, firebase} from './firebase';
import * as routes from '../constants/routes';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/Input';

const SignInPage = ({ history }) =>
  <div>
    <SignInForm history={history} />
    <SignUpLink />
  </div>

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {
      email,
      password,
    } = this.state;

    const {
      history,
    } = this.props;

    auth.doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        history.push(routes.HOME);
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      email,
      password,
      error,
    } = this.state;

    const isInvalid =
      password === '' ||
      email === '';

    return (
      <form onSubmit={this.onSubmit}>
      <header>
        <h2>Sign In</h2>
      </header>
        <TextField
          value={email}
          onChange={event => this.setState(byPropKey('email', event.target.value))}
          id="text"
          placeholder="Email Address"
        />
        <br />
        <TextField
          value={password}
          onChange={event => this.setState(byPropKey('password', event.target.value))}
          id="password"
          placeholder="Password"
        />
        <br />
        <Button disabled={isInvalid} onClick={this.handleClick}>
          Sign In
        </Button>

        { error && <p>{error.message}</p> }
      </form>
    );
  }
}

export default withRouter(SignInPage);

export {
  SignInForm,
};