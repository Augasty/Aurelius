/* eslint-disable react/prop-types */
import TaskSummary from "../TaskSummary/TaskSummary";
import { Link } from "react-router-dom";
import styles from "./TaskList.module.css";
import { useSelector } from "react-redux";
import { separateTasksByPriority } from "./separatedTasks";
import { useProjectContexts } from "../../../utils/ProjectContexts";
import { useEffect, useState } from "react";
import { auth } from "../../../firebase";


const TaskList = () => {
  const { isRightPanelVisible,currentStory , isProjectPlanner} = useProjectContexts();
  let reduxTasks = useSelector((state) => state.tasks) || [];


  if (isProjectPlanner){
    reduxTasks = reduxTasks?.filter(
      (task) => task.referenceStory[0] === currentStory[0]);
  }



  const curuser = auth.currentUser;

  const [filterType, setfilterType] = useState("priority");
  const [filterParameters, setfilterParameters] = useState([
    "Low Priority",
    "Medium Priority",
    "High Priority",
  ]);

  // if it is filtered, the display is grid, and we put the filter type in this variable and display it
  const [isFilteredAndHow, setisFilteredAndHow] = useState([false, ""]);
  let [separatedTasks, setseparatedTasks] = useState([]);

  const [createdAtShown, setcreatedAtShown] = useState(false);

  useEffect(() => {
    const storedFilterType = localStorage.getItem("filterType");
    const storedFilterParameters = localStorage.getItem("filterParameters");
    const storedIsFilteredAndHow = localStorage.getItem("isFilteredAndHow");

    if (storedFilterType) {
      setfilterType(storedFilterType);
    }

    if (storedFilterParameters) {
      setfilterParameters(JSON.parse(storedFilterParameters));
    }

    if (storedIsFilteredAndHow) {
      setisFilteredAndHow(JSON.parse(storedIsFilteredAndHow));
    }
  }, []);

  useEffect(() => {
    setseparatedTasks(
      separateTasksByPriority(
        reduxTasks,
        filterType,
        filterParameters,
        createdAtShown
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterType, filterParameters, createdAtShown]);

  {
    separatedTasks = separateTasksByPriority(
      reduxTasks,
      filterType,
      filterParameters,
      createdAtShown
    );
    // console.log("manual fetch");
  }

  const handleButtonClick = (
    newFilterType,
    newFilterParameters,
    newIsFilteredAndHow
  ) => {
    setfilterType(newFilterType);
    setfilterParameters(newFilterParameters);
    setisFilteredAndHow(newIsFilteredAndHow);

    localStorage.setItem("filterType", newFilterType);
    localStorage.setItem(
      "filterParameters",
      JSON.stringify(newFilterParameters)
    );
    localStorage.setItem(
      "isFilteredAndHow",
      JSON.stringify(newIsFilteredAndHow)
    );
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.FilterBar}>
        <p className={styles.FilterHeaderText}>Sort By</p>
        <button
          className={styles.FilterButton}
          onClick={() =>
            handleButtonClick(
              "priority",
              ["Low Priority", "Medium Priority", "High Priority"],
              [false, ""]
            )
          }
        >
          Priority
        </button>
        <button
          className={styles.FilterButton}
          onClick={() =>
            handleButtonClick(
              "taskStatus",
              ["Yet To Start", "In Progress", "Completed"],
              [false, ""]
            )
          }
        >
          Status
        </button>

        <p className={styles.FilterHeaderText}>Filter Tasks</p>
        <button
          className={styles.FilterButton}
          onClick={() =>
            handleButtonClick(
              "assignedTo",
              [curuser.email],
              [true, "Assigned To Me"]
            )
          }
        >
          Assigned To Me
        </button>

        <button
          className={styles.FilterButton}
          onClick={() =>
            handleButtonClick(
              "authorDetails",
              [curuser.email],
              [true, "Assigned By Me"]
            )
          }
        >
          Assigned By Me
        </button>

        <p className={styles.FilterHeaderText}>Display By:</p>
        <button
          className={styles.FilterButton}
          onClick={() => setcreatedAtShown(!createdAtShown)}
        >
          {createdAtShown ? "Updated At" : "Created At"}
        </button>

        <p className={styles.FilterHeaderText}></p>
      </div>

      <div
        className={`${styles.taskList} ${
          isFilteredAndHow[0] && styles.taskListGrid
        }`}
        style={{ width: isRightPanelVisible ? "70%" : "100%" }}
      >
        {separatedTasks.map((taskGroups, idx) => (
          <div className={styles.taskColumn} key={idx}>
            <h2 className={styles.columnHeader}>
              {isFilteredAndHow[0]
                ? isFilteredAndHow[1]
                : filterParameters[idx]}
            </h2>

            {taskGroups.map((task) => (
              <Link to={"/task/" + task.id} key={task.id}>
                <TaskSummary task={task} createdAtShown={createdAtShown} />
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
