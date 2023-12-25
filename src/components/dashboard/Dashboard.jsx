/* eslint-disable react/prop-types */
import styles from "./Dashboard.module.css";
import TaskList from "../tasks/TaskList";
import { useGroupAndChatToggleContext } from "../../utils/GroupAndChatToggleContext";

const Dashboard = () => {
  const { isRightPanelVisible } = useGroupAndChatToggleContext();
  //  different views will be sorted here, dont remove the currentGroup from the props.
  // const { currentGroup, setcurrentGroup } = useGroupAndChatToggleContext();
  return (
    <div style={{ width: isRightPanelVisible ? "80%" : "100%" }}>
      <TaskList className={styles.dashboard} />
    </div>
  );
};

export default Dashboard;
