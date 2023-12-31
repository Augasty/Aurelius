/* eslint-disable react/prop-types */
import styles from "./CardContainer.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useProjectContexts } from "../../../utils/ProjectContexts";
import TaskSummary from "../../tasks/TaskSummary/TaskSummary";
import { SmartTime } from "../../../utils/SmartTime";
import { useSelector } from "react-redux";

const CardContainer = ({ story, createdAtShown }) => {
  const displayTime = createdAtShown ? story.createdAt : story.updatedAt;

  const formattedDate = SmartTime(displayTime);

  const history = useNavigate();
  const { setCurrentStory } = useProjectContexts();

  const reduxTasks = useSelector((state) => state.tasks);
  const currentStoryTasks = reduxTasks.filter(
    (task) => task.referenceStory[0] === story.id
  );
  console.log(currentStoryTasks, story);

  const CreateTaskWithStory = () => {
    setCurrentStory([story.id, story.title]);
    history("/create-task");
  };

  const GotoTaskListForThisStory = () =>{
    setCurrentStory([story.id, story.title]);
    history("/story/task-list");
  }
  return (
    <div className={styles.header}>
      <div className={styles.storySummaryTitle}>
        <p>
          {story.title.length > 25
            ? `${story.title.substring(0, 22)}...`
            : story.title}
        </p>

        <button
          className={styles.storyButton}
          onClick={() => CreateTaskWithStory()}
        >
          Create Tasks
        </button>
        <button onClick={()=> GotoTaskListForThisStory()} className={styles.storyButton}>Check Tasks</button>
      </div>
      <div className={styles.cardsContainer}>
        {currentStoryTasks.map((task) => (
          <Link to={"/task/" + task.id} key={task.id}>
            <TaskSummary task={task} createdAtShown={createdAtShown} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CardContainer;
