import React from "react";
import ReactDOM from "react-dom";
import { render } from "react-dom";
import Feedback from "./feedback";
import CheckIn from "./checkin";
import Appointment from "./appointment";

import "./styles.css";

const View = () => (
  <div>
    <header>
      <h1> MLRC </h1>
    </header>
    <CheckIn />
  </div>
);

render(<View />, document.getElementById("root"));

// ReactDOM.render(<View />, document.getElementById("root"));

// const rootElement = document.getElementById("root");
//ReactDOM.render(<App />, rootElement);
