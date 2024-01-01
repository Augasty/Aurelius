/* eslint-disable react/prop-types */
import styles from "./TaskContainerStory.module.css";
import { Link, useNavigate } from "react-router-dom";
import TaskSummary from "../../tasks/TaskSummary/TaskSummary";
import { SmartTime } from "../../../utils/SmartTime";
import { useSelector } from "react-redux";

const TaskContainerStory = ({ story, createdAtShown }) => {
  const displayTime = createdAtShown ? story.createdAt : story.updatedAt;

  const formattedDate = SmartTime(displayTime);

  const history = useNavigate();

  const reduxTasks = useSelector((state) => state.tasks);
  const currentStoryTasks = reduxTasks.filter(
    (task) => task.referenceStory[0] === story.id
  );
  console.log(currentStoryTasks, story);

  const CreateTaskWithStory = () => {
    localStorage.setItem(
      "currentStoryLocalStorage",
      JSON.stringify([story.id, story.title])
    );
    history("/story/create-task");
  };

  const GotoTaskListForThisStory = () => {
    localStorage.setItem(
      "currentStoryLocalStorage",
      JSON.stringify([story.id, story.title])
    );
    history("/story/task-list");
  };
  return (
      <div >
      <div className={styles.StoryTopPart}>
        <p className={styles.StoryName}>
          {story.title.length > 20
            ? `${story.title.substring(0, 16)}...`
            : story.title}
        </p>

        <button
          className={styles.StoryButton}
          onClick={() => CreateTaskWithStory()}
        >
          Create Tasks
        </button>
        <button
          onClick={() => GotoTaskListForThisStory()}
          className={styles.StoryButton}
        >
          Check Tasks
        </button>
      </div>
      <div className={styles.CardsContainer}>
        {currentStoryTasks.map((task) => (
          <Link to={"/task/" + task.id} key={task.id}>
            <TaskSummary task={task} createdAtShown={createdAtShown} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TaskContainerStory;
