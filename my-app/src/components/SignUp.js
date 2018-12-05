import React, { Component } from 'react';
import { Link, withRouter, } from 'react-router-dom';
import {auth, firebase} from './firebase';
import * as routes from '../constants/routes';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/Input';


const SignUpPage = ({ history }) =>
  <div>
    <h1>Sign Up</h1>
    <SignUpForm history={history} />
  </div>
    
const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
};

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});
  
class SignUpForm extends Component {
    constructor(props) {
      super(props);
  
      this.state = { ...INITIAL_STATE };
    }

    onSubmit = (event) => {
        const {
            username,
            email,
            passwordOne,
        } = this.state;

        const {
            history,
        } = this.props;
        alert(email);
        auth.createUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                this.setState({ ...INITIAL_STATE });
                history.push(routes.HOME);
            })
            .catch(error => {
                alert(error);
                this.setState(byPropKey('error', error));
            });
        event.preventDefault();
    }

  render() {
    const {
        username,
        email,
        passwordOne,
        passwordTwo,
        error,
      } = this.state;
    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';


    return (
      <form onSubmit={this.onSubmit}>
      <header>
        <h2>
          Sign Up
        </h2>
      </header>
        <TextField
          value={username}
          onChange={event => this.setState(byPropKey('username', event.target.value))}
          type="text"
          placeholder="Full Name"
        />
        <br />
        <TextField
          value={email}
          onChange={event => this.setState(byPropKey('email', event.target.value))}
          type="text"
          placeholder="Email Address"
        />
        <br />
        <TextField
          value={passwordOne}
          onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
          type="password"
          placeholder="Password"
        />
        <br />
        <TextField
          value={passwordTwo}
          onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
          type="password"
          placeholder="Confirm Password"
        />
        <br />

        <Button disabled={isInvalid} type="submit">
          Sign Up
        </Button>

        { error && <p>{error.message}</p> }
      </form>
    );
  }
}

// const SignUpLink = () =>
//   <p>
//     Don't have an account?
//     {' '}
//     <Link to={routes.SIGN_UP}>Sign Up</Link>
//   </p>

export default SignUpPage;

export {
  SignUpForm,
  // SignUpLink,
};