import React from "react";
import { Link } from "react-router-dom";
import "./headerstyle.css";
// import { Route, Switch, Redirect } from 'react-router-dom';
// import { RoutedTabs, NavTab } from 'react-router-tabs';
// //import { Appointment, CheckIn, Feedback } from './components';
 
// // with default styles:
// import 'react-router-tabs/styles/react-router-tabs.css';
// import Appointment from "./appointment";
// import CheckIn from "./checkin";
// import Feedback from "./feedback";

// The Header creates links that can be used to navigate
// between routes.
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
          <Link to="/signin">Sign In</Link>
        </li>
        <li>
          <Link to="/signup">Sign Up</Link>
        </li>
      </ul>
    </nav>
  </header>
);

 
// const Header = ({ match }) => {
//   return (
//     <div>
//       <NavTab to="/appointment">Appointment</NavTab>
//       <NavTab to="/checkin">Check in</NavTab>
//       <NavTab to="/feedback">Feedback</NavTab>
 
//       <Switch>
//         <Route exact path={`${match.path}`} render={() => <Redirect replace to={`${match.path}/admins`} />} />
//         <Route path={`${match.path}/appointment`} component={Appointment} />
//         <Route path={`${match.path}/checkin`} component={CheckIn} />
//         <Route path={`${match.path}/feedback`} component={Feedback} />
//       </Switch>
//     </div>
//   );
// };
export default Header;
