import React, { Component } from 'react';
import {auth} from './firebase';
import * as routes from '../constants/routes';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/Input';


const SignUpPage = ({ history }) =>
  <div>
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
        email,
        passwordOne,
        passwordTwo,
        error,
      } = this.state;
    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '';


    return (
      <form onSubmit={this.onSubmit}>
      <header>
        <h2>
          Add New Admin
        </h2>
      </header>
        
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


export default SignUpPage;

export {
  SignUpForm,
};