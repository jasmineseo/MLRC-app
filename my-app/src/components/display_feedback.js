import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

// React Table
import ReactTable from "react-table";  
import "react-table/react-table.css";


// retrieving data from Firebase
// https://firebase.google.com/docs/database/admin/retrieve-data

// // Import Admin SDK
// var admin = require("firebase-admin");

// Get a database reference to our posts
var db = admin.database();
var ref = db.ref("server/saving-data/fireblog/posts");

// Attach an asynchronous callback to read the data at our posts reference
ref.on("value", function(snapshot) {
  console.log(snapshot.val());
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});


// ordering table by most recent
class Display_Feedback extends React.Component {
  constructor(){
    super();
    this.state = {
      data: makeData()
    };
  }

  render(){
    const {data} = this.state;
    return (
      <div>
        <ReactTable
          data = {data}
          columns = {[
            {
              Header: "Language",
              accessor: "langugage"
            }, 
            {
              Header: "Question1",
              accessor: "question1"
            }, 
            {
              Header: "Question2",
              accessor: "question2"
            }, 
            {
              Header: "Question3",
              accessor: "question3"
            }
          ]}
          className = "-striped -highlight"
        />
      </div>
    )
  }

    render() {
        return (
          <div>
            <header>Student Feedback Responses</header> 
            <table style = "width: 100%"> 
                <tr> 
                    <th>Question 1</th>
                    <th>Question 2</th>
                    <th>Question 3</th>
                </tr>
                <tr> 
                    <th>Blah Blah Blah</th>
                    <th>Blah Blah Blah</th>
                    <th>Blah Blah Blah</th>
                </tr>
                <tr> 
                    <th>...</th>
                    <th>>...</th>
                    <th>>...</th>
                </tr>
            
            </table>
          </div>   
        )
    }
}



}

export default CheckIn;

// ReactDOM.render(<CheckIn />, document.getElementById("root"));

// const rootElement = document.getElementById("root");
//ReactDOM.render(<App />, rootElement);