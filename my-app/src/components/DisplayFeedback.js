import React from "react";
import ReactDOM from "react-dom";
import ReactTable from 'react-table';
import "react-table/react-table.css";
import "./styles.css";

// install react-table
//  npm install react-table


// TODO: fetch data from firebase

class DisplayFeedback extends React.Component {

  constructor() {
    super();
    this.state = {
      data: makeData()
    };
  }

  render() {
    const { data } = this.state;
    return (
      <div>
        <ReactTable
          data={data}
          columns={[
            {
              Header: "Language",
              accessor: "language"
            },
            {
              Header: "Question1",
              accessor: "question1"
            },
            {
              Header: 'Question2',
              accessor: "question2"
            },
            {
              Header: 'Question3',
              accessor: "question3"
            }
          ]}
          defaultPageSize={20}
          className="-striped -highlight"
        />
        <br />
        {/* <Tips />
        <Logo /> */}
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));

export default DisplayFeedback;

// ReactDOM.render(<CheckIn />, document.getElementById("root"));

// const rootElement = document.getElementById("root");
//ReactDOM.render(<App />, rootElement);