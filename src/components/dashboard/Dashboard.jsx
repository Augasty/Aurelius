/* eslint-disable react/prop-types */
import styles from "./Dashboard.module.css";
import TaskList from "../tasks/TaskList/TaskList";
import { useProjectContexts } from "../../utils/ProjectContexts";

const Dashboard = () => {
  const { isRightPanelVisible } = useProjectContexts();
// we will show <TaskList/> in the dashboard only if current board is a taskTracker.
// if the current board is a project planner, we will show the stories list
// when we click on a story, we will show all the tasks inside that story via the <TaskList/>
  return (
    <div style={{ width: isRightPanelVisible ? "80%" : "100%" }}>
      <TaskList className={styles.dashboard} />
    </div>
  );
};

export default Dashboard;
