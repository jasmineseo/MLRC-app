import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import Home from "./Home";
import Appointment from "./Appointment";
import CheckIn from "./CheckIn";
import Feedback from "./Feedback";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import SignOut from "./SignOut";
import RequestData from "./RequestData";
import LangTutor from "./LangTutor";
import DisplayFeedback from "./DisplayFeedback";
import {auth} from './firebase';
import "./styles.css";
import { BrowserRouter as Router} from 'react-router-dom';


const CurMain = ({ authUser }) =>
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
      <Route path="/signup" component={SignUp} />
      <Route path="/langtutor" component={LangTutor} />
      <Route path="/displayfeedback" component={DisplayFeedback} />
      <Route path="/requestdata" component={RequestData} />
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

const CurHeader = ({ authUser }) =>
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
          <Link to="/checkin">Check In</Link>
        </li>
        <li>
          <Link to="/feedback">Feedback</Link>
        </li>
        <li>
          <Link to="/signin">Sign In</Link>
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
          <Link to="/langtutor">Add Tutor</Link>
        </li>
        <li>
          <Link to="/displayfeedback">Student Feedback</Link>
        </li>
        <li>
          <Link to="/requestdata">Request Data</Link>
        </li>
        <li>
          <Link to="/signup">Add New Admin</Link>
        </li>
        <li>
          <SignOut />
        </li>
      </ul>
    </nav>
  </header>
);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
    };
  }
  componentDidMount() {
    auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState({ authUser })
        : this.setState({ authUser: null });
    });
  }

  render() {
    return (
      <Router>
        <div>
          <CurHeader authUser={this.state.authUser} />
          <CurMain authUser={this.state.authUser} />

          <hr/>
        </div>
      </Router>
    );
  }
}

export default App;