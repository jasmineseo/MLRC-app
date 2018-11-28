import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import Appointment from "./appointment";
import CheckIn from "./checkin";
import Feedback from "./feedback";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/appointment" component={Appointment} />
      <Route path="/checkin" component={CheckIn} />
      <Route path="/feedback" component={Feedback} />
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/apptcalendar" component={ApptCalendar}/>
    </Switch>
  </main>
);

export default Main;
