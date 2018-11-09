import React, { Component } from "react";
import "./styles.css";
// import ReactDOM from "react-dom";
import * as routes from '../constants/routes';
import { Link, withRouter, } from 'react-router-dom';


class Calendar extends React.Component {
    constructor(props) {
        super(props);
    }
    // iframe(){
    //     return {
    //         __html: this.props.iframe
    //         }
    // }
    render() {
        return (
            <div>
                <h1>
                    Make an Appointment
                </h1>
                <p>
                    Note: You must be logged into Google to view the calendar.
                </p>
                <iframe src="https://calendar.google.com/calendar/selfsched?sstoken=UUt5UTdoeWo4R016fGRlZmF1bHR8NWE5OGQxNGViMjlhYmVmZTYwZDQ4NmEwYTk1NDg3Mjg" width='100%' height="600" frameborder="0" scrolling="no"></iframe>
                {/* <div dangerouslySetInnerHTML={ this.iframe() } /> */}
            </div>
            );
    }
}
Calendar.propTypes = {

};
Calendar.defaultProps = {

};
// const CalendarLink = () =>
//   <p>
//     <Link to={routes.APPTCALENDAR}>Make an appointment</Link>
//   </p>

// const iframe = '<iframe src="https://www.example.com/show?data..." width="540" height="450"></iframe>'; 

// ReactDOM.render(
//   <Calendar iframe={iframe} />,
//   document.getElementById('container')
// );

export default withRouter(Calendar);
// export {
//     Calendar,
//     CalendarLink,
//   };