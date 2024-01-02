/* eslint-disable react/prop-types */
import styles from "./TaskContainerStory.module.css";
import { Link, useNavigate } from "react-router-dom";
import TaskSummary from "../../tasks/TaskSummary/TaskSummary";
import { useSelector } from "react-redux";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-based
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};
const TaskContainerStory = ({ story, storyDisplayedTime, createdAtShown }) => {
  const displayTime = formatDate(story[storyDisplayedTime]);

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
    <div>
      <div className={styles.StoryTopPart}>
        <p className={styles.StoryName}>
          {story.title.length > 20
            ? `${story.title.substring(0, 16)}...`
            : story.title}
        </p>
        <div style={{ display: "flex" }}>
          <div className={styles.StoryDate}>
            {displayTime == "31-12-9999" ? "N/A" : displayTime}
          </div>
          <div className={styles.statusChip}>{story.completionCount}</div>
        </div>

        <div style={{ display: "flex" }}>
          <button
            className={styles.StoryButton}
            onClick={() => CreateTaskWithStory()}
          >
            Add Task
          </button>
          <button
            onClick={() => GotoTaskListForThisStory()}
            className={styles.StoryButton}
          >
            Expand
          </button>
        </div>
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
