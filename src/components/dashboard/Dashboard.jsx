/* eslint-disable react/prop-types */
// Dashboard.js
import ProjectList from "../projects/ProjectList";
// import Notifications from "./Notifications";
import "./Dashboard.css";

import { useSelector } from "react-redux";
const Dashboard = () => {

  const redux_tasks = useSelector((state) => state.tasks)

  

  return (
    <div className="dashboard container">
      <div className="row">
        <div className="col s12 m6">
          <ProjectList projects={redux_tasks}/>
        </div>
        <div className="col s12 m5 offset-m1">
          {/* <Notifications/> */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
