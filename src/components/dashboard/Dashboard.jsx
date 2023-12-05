/* eslint-disable react/prop-types */


// import Notifications from "./Notifications";
import TaskList from "../tasks/taskList";
import "./Dashboard.css";

import { useSelector } from "react-redux";
import Notifications from "./Notifications";
const Dashboard = ({currentGroup}) => {

  const reduxTasks = useSelector((state) => state.tasks); // Updated variable name

  return (
    <div className="dashboard container">
      <div className="row">
        <div className="col s12 m6">
          <TaskList tasks={reduxTasks} /> {/* Updated component name and prop name */}
        </div>
        <div className="col s12 m5 offset-m1">
          {/* <Notifications currentGroup={currentGroup}/> */}

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
