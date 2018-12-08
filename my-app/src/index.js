import React from 'react';
// import ReactDOM from 'react-dom';
import { render } from "react-dom";
// import Feedback from "./components/feedback";
// import CheckIn from "./components/checkin";
// import Appointment from "./components/appointment";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App";
import "./styles.css";
import * as serviceWorker from './serviceWorker';
import CssBaseline from '@material-ui/core/CssBaseline';


// const View = () => (
//     <div>
//       <header>
//         <h1> MLRC </h1>
//       </header>
//       <Appointment />
//     </div>
//   );
  
//   render(<View />, document.getElementById("root"));
  
render(
    <BrowserRouter>
  <React.Fragment>
    <CssBaseline />
      <App />
    
  </React.Fragment>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
