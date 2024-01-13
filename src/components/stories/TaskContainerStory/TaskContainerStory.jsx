/* eslint-disable react/prop-types */
import styles from "./TaskContainerStory.module.css";
import { useNavigate } from "react-router-dom";
import TaskSummary from "../../tasks/TaskSummary/TaskSummary";
import { useSelector } from "react-redux";
import moment from "moment";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-based
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};

const getStoryStatus = (completionCount, deadline) => {
  if (completionCount == 0) {
    return "Finished";
  }
  if (moment(deadline, "YYYY-MM-DD").isBefore(moment(), "day")) {
    return "Overdue";
  }
  return "Active";
};
const TaskContainerStory = ({ story, storyDisplayedTime, createdAtShown }) => {
  const displayTime = formatDate(story[storyDisplayedTime]);

  const history = useNavigate();

  const reduxTasks = useSelector((state) => state.tasks);
  const currentStoryTasks = reduxTasks.filter(
    (task) => task.referenceStory[0] === story.id
  );
  // console.log(currentStoryTasks, story);

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

  const storyStatus = getStoryStatus(story.completionCount, story.deadline);
  return (
    <div>
      <div className={`${styles.StoryTopPart} ${styles[storyStatus]}`}>
        <p className={styles.StoryName}>
          {story.title.length > 20
            ? `${story.title.substring(0, 16)}...`
            : story.title}
        </p>
        <div className={styles.StoryDate}>
          {displayTime == "31-12-9999" ? "N/A" : displayTime}
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
      <div
        className={`${styles.CardsContainer} ${
          styles[`CardsContainer-${storyStatus}`]
        }`}
      >
        {currentStoryTasks.map((task) => (
          <TaskSummary
            task={task}
            createdAtShown={createdAtShown}
            key={task.id}
            onClick={

              localStorage.setItem(
              "currentStoryLocalStorage",
              JSON.stringify([story.id, story.title])
            )
            }
          />
        ))}
      </div>
    </div>
  );
};

export default TaskContainerStory;
