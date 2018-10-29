import React from "react";
import ReactDOM from "react-dom";
import * as firebase from "firebase";

var config = {
  apiKey: "AIzaSyCcvypPOfoIdECYkbhJhVRc6T1gA7aOkbU",
  authDomain: "mlrc-5a590.firebaseapp.com",
  databaseURL: "https://mlrc-5a590.firebaseio.com",
  projectId: "mlrc-5a590",
  storageBucket: "mlrc-5a590.appspot.com",
  messagingSenderId: "866673220218"
};
firebase.initializeApp(config);

class CheckIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      school: "",
      gradYear: "",
      service: "",
      language: "",
      date:""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    alert(
      "Your name is " +
        this.state.name +
        "\nYou attend " +
        this.state.school +
        "; Graduation year: " +
        this.state.gradYear +
        "\nVisiting the MLRC for " +
        this.state.service +
        " in " +
        this.state.language
    );
    firebase.database().ref(this.state.date + "/" + this.state.name).set({
      gradYear: this.state.gradYear,
      service: this.state.service,
      language: this.state.language,
      school: this.state.school
    });
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={this.state.value}
            placeholder={"Enter your name"}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <br />
        <label>
          Date:
          <input
            type="text"
            name="date"
            value={this.state.value}
            placeholder={"MM-DD-YYYY"}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <br />
        <label>
          School:
          <select
            value={this.state.value}
            name="school"
            type="select"
            placeholder={"Select your school"}
            onChange={this.handleChange}
          >
            <option value="Select your school">Select your School</option>
            <option value="CMC">CMC</option>
            <option value="HMC">HMC</option>
            <option value="Pomona">Pomona</option>
            <option value="Pitzer">Pitzer</option>
            <option value="Scripps">Scripps</option>
            <option value="Other">Other</option>
          </select>
        </label>
        <label>
          Graduating in:
          <input
            type="text"
            name="gradYear"
            value={this.state.value}
            placeholder={"e.g., 2019"}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <br />
        <label>
          Visiting the MLRC for:
          <select
            value={this.state.value}
            name="service"
            type="select"
            placeholder={"Select a service"}
            onChange={this.handleChange}
          >
            <option value="Select a service">Select a service</option>
            <option value="Conversation">Conversation</option>
            <option value="Homework">Homework</option>
            <option value="Paper writing">Paper writing</option>
            <option value="Pronunciation">Pronunciation</option>
            <option value="Grammar review">Grammar review</option>
            <option value="Other">Other</option>
          </select>
        </label>
        <label>
          in
          <select
            value={this.state.value}
            name="language"
            type="select"
            placeholder={"Select a language"}
            onChange={this.handleChange}
          >
            <option value="Select a language">Select a language</option>
            <option value="French">French</option>
            <option value="German">German</option>
            <option value="Italian">Italian</option>
            <option value="Korean">Korean</option>
            <option value="Spanish">Spanish</option>
            <option value="Other">Other</option>
          </select>
        </label>
        <br />
        <br />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

ReactDOM.render(<CheckIn />, document.getElementById("root"));

const rootElement = document.getElementById("root");
//ReactDOM.render(<App />, rootElement);


// import React from 'react';
// import ReactDOM from 'react-dom';

// class NameForm extends React.Component {
//     constructor(props) {
//       super(props);
//       this.state = {
//           name: '', 
//           school: '',
//         };
  
//       this.handleChange = this.handleChange.bind(this);
//       this.handleName = this.handleName.bind(this);
//       this.handleSchool = this.handleSchool.bind(this);
//     }
  
//     handleChange(event) {
//       this.setState({
//           school: event.target.school, 
//           name: event.target.name,
//         });
//     }
  
//     handleName(event) {
//       alert('A name was submitted: ' + this.state.name);
//       event.preventDefault();
//     }

//     handleSchool(event) {
//         alert('A school was submitted: ' + this.state.school);
//         event.preventDefault();
//       }
  
//     render() {
//       return (
//         <div>
//         <form onSubmit={this.handleName}>
//             <label>
//                 Name:
//                 <input 
//                     type="text" 
//                     value={this.state.value} 
//                     onChange={this.handleChange} />
//             </label>
//             <input type="submit" value="Submit" />
//         </form>
//         <form onSubmit={this.handleSchool}>
//             <label>
//                 School:
//                 <input 
//                     type="text" 
//                     value={this.state.school} 
//                     onChange={this.handleChange} />
//             </label>
//             <input type="submit" value="Submit" />
//         </form>
//         </div>
//       );
//     }
//   }
  
//   ReactDOM.render(
//     <NameForm />,
//     document.getElementById('root')
//   );