/* eslint-disable react/prop-types */


// import Notifications from "./Notifications";
import TaskList from "../tasks/taskList";
import styles from "./Dashboard.module.css";
import Notifications from "./Notifications";
const Dashboard = ({currentGroup}) => {

 // Updated variable name

  return (
    <div>
          <TaskList />
          {currentGroup.length !== 0 && <Notifications currentGroup={currentGroup}/>}

    </div>
  );
};

export default Dashboard;
