import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login-component';

class App extends Component {
  responseGoogle (googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    console.log({accessToken: id_token});
    //anything else you want to do(save to localStorage)...
  }

  render () {
    return (
      <div>
        <GoogleLogin socialId="yourClientID"
                     className="google-login"
                     scope="profile"
                     fetchBasicProfile={false}
                     responseHandler={this.responseGoogle}
                     buttonText="Google Login"/>
      </div>
    );
  }
}

export default App;