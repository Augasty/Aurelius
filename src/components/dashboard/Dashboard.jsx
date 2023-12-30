/* eslint-disable react/prop-types */
import TaskList from "../tasks/TaskList/TaskList";

const Dashboard = () => {

// we will show <TaskList/> in the dashboard only if current board is a taskTracker.
// if the current board is a project planner, we will show the stories list
// when we click on a story, we will show all the tasks inside that story via the <TaskList/>
  return (
    <div>
      <TaskList/>
    </div>
  );
};

export default Dashboard;
