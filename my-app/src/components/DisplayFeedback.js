import React from "react";
import { render } from "react-dom";
import ReactTable from 'react-table';
import "react-table/react-table.css";
import "./styles.css";


// install react-table
//  npm install react-table


// TODO: fetch data from firebase

class DisplayFeedback extends React.Component {

  render() {
    const data = [{
      language: 'Spanish',
      question1: "A really long feedback to check text-wrap",
      question2: "answer2-spanish",
      question3: "answer3-spanish"
      },{
        language: 'French',
        question1: "answer1-french",
        question2: "answer2-french",
        question3: "answer3-french"
      },{
        language: 'Arabic',
        question1: "answer1-arabic",
        question2: "answer2-arabic",
        question3: "answer3-arabic"
      }, {
        language: 'Korean',
        question1: "answer1-korean",
        question2: "answer2-korean",
        question3: "answer3-korean"
      }
    ]

    return (
      <div>
        <ReactTable
          data={data}
          columns={[
            {
              Header: "Language",
              accessor: "language",
              style: { 'white-space': 'unset'},
              maxWidth: 120
            },
            {
              Header: "Question1",
              accessor: "question1",
              style: { 'white-space': 'unset' }
            },
            {
              Header: 'Question2',
              accessor: "question2",
              style: { 'white-space': 'unset' }
            },
            {
              Header: 'Question3',
              accessor: "question3",
              style: { 'white-space': 'unset' }
            }
          ]}
          defaultSorted={[
            {
              id: "language",
              desc: false
            }
          ]}
          showPaginationTop={true}
          showPaginationBottom={true}
          defaultPageSize={10}
          // className="-striped"
        />
        <br />
      </div>
    );
  }
}

render(<DisplayFeedback />, document.getElementById("root"));

export default DisplayFeedback;
