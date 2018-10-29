import React from 'react';
import ReactDOM from 'react-dom';
import { render } from "react-dom";
import Lang_Tutor from "./lang_tutor";
import Display_Feedback from "./display_feedback";
import Request_Data from "./request_data";

import "./styles.css";
import * as serviceWorker from './serviceWorker';

const View = () => (
    <div>
      <header>
        <h1> MLRC </h1>
      </header>
      <Lang_Tutor />
    </div>
  );
  
  render(<View />, document.getElementById("root"));
  
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();