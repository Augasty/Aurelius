/* eslint-disable react/prop-types */

import Notifications from "./Notifications";
import styles from "./Dashboard.module.css";
import TaskList from "../tasks/TaskList";
const Dashboard = ({currentGroup}) => {

 // Updated variable name

  return (
    <div>
          <TaskList className={styles.dashboard}/>
          {currentGroup.length !== 0 && <Notifications currentGroup={currentGroup}/>}

    </div>
  );
};

export default Dashboard;
