import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import Home from "./Home";
import Appointment from "./appointment";
import CheckIn from "./checkin";
import Feedback from "./feedback";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { firebase } from '../firebase';
// import Header from "./Header";
import "./headerstyle.css";

// import Main from "./Main";
import { BrowserRouter as Router} from 'react-router-dom';


const Cur_Main = ({ authUser }) =>
  <div>
    { authUser
        ? <Main />
        : <MainNonAuth />
    }
  </div>

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/appointment" component={Appointment} />
      <Route path="/checkin" component={CheckIn} />
      <Route path="/feedback" component={Feedback} />
      <Route path="/signup" component={SignUp} />
    </Switch>
  </main>
);

const MainNonAuth = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/appointment" component={Appointment} />
      <Route path="/checkin" component={CheckIn} />
      <Route path="/feedback" component={Feedback} />
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
    </Switch>
  </main>
);

const Cur_Header = ({ authUser }) =>
  <div>
    { authUser
        ? <Header />
        : <HeaderNonAuth />
    }
  </div>

const HeaderNonAuth = () => (
  <header>
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/appointment">Appointment</Link>
        </li>
        <li>
          <Link to="/checkin">Check in</Link>
        </li>
        <li>
          <Link to="/feedback">Feedback</Link>
        </li>
        <li>
          <Link to="/signin">Sign In</Link>
        </li>
        <li>
          <Link to="/signup">Sign Up</Link>
        </li>
      </ul>
    </nav>
  </header>
);

const Header = () => (
  <header>
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/appointment">Appointment</Link>
        </li>
        <li>
          <Link to="/checkin">Check in</Link>
        </li>
        <li>
          <Link to="/feedback">Feedback</Link>
        </li>
        <li>
          <Link to="/signup">Sign Up</Link>
        </li>
      </ul>
    </nav>
  </header>
);

// const App = () =>
//   <Router>
//     <div>
//       <Cur_Header />
//       <Cur_Main />
//     </div>
//   </Router>

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
    };
  }
  componentDidMount() {
    firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState({ authUser })
        : this.setState({ authUser: null });
    });
  }

  render() {
    return (
      <Router>
        <div>
          <Cur_Header authUser={this.state.authUser} />
          <Cur_Main authUser={this.state.authUser} />

          <hr/>
        </div>
      </Router>
    );
  }
}

export default App;