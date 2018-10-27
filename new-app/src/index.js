import React from 'react';
import ReactDOM from 'react-dom';
import { render } from "react-dom";
import Feedback from "./feedback";
import CheckIn from "./checkin";
import Appointment from "./appointment";

import "./styles.css";
import * as serviceWorker from './serviceWorker';

const View = () => (
    <div>
      <header>
        <h1> MLRC </h1>
      </header>
      <Appointment />
    </div>
  );
  
  render(<View />, document.getElementById("root"));
  
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
