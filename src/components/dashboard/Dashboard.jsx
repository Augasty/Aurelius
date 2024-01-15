import { lazy, Suspense } from "react";
import { useProjectContexts } from "../../utils/ProjectContexts";



const Dashboard = () => {
  const { isProjectPlanner } = useProjectContexts();

  const StoryList = lazy(() => import("../stories/StoryList/StoryList"));
  const TaskList = lazy(() => import("../tasks/TaskList/TaskList"));
  

  const SelectedComponent = isProjectPlanner ? StoryList : TaskList;

  return (
    <div>
      <Suspense>
        <SelectedComponent />
      </Suspense>
    </div>
  );
};

export default Dashboard;