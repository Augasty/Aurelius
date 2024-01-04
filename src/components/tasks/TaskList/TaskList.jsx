/* eslint-disable react/prop-types */
import TaskSummary from "../TaskSummary/TaskSummary";

import styles from "./TaskList.module.css";
import filterbarStyles from "../../../sharedStyles/FilterBar.module.css"

import { useSelector } from "react-redux";
import { separateTasksByPriority } from "./separatedTasks";
import { useProjectContexts } from "../../../utils/ProjectContexts";
import { useEffect, useState } from "react";
import { auth } from "../../../firebase";


const TaskList = () => {
  const { isRightPanelVisible, isProjectPlanner} = useProjectContexts();
  let reduxTasks = useSelector((state) => state.tasks) || [];
  const currentStory = JSON.parse(localStorage.getItem("currentStoryLocalStorage"));

  // console.log(currentStory)
  if (isProjectPlanner){
    reduxTasks = reduxTasks?.filter(
      (task) => task.referenceStory[0] === currentStory[0]);
  }



  const curuser = auth.currentUser;

  const [filterType, setfilterType] = useState("priority");
  const [filterParameters, setfilterParameters] = useState([
    "Low",
    "Medium",
    "High",
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

  
    separatedTasks = separateTasksByPriority(
      reduxTasks,
      filterType,
      filterParameters,
      createdAtShown
    );
    // console.log("manual fetch");
  

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
    <div className={filterbarStyles.mainContainer}>
      <div className={filterbarStyles.FilterBar}>
      <p className={filterbarStyles.FilterHeaderText}>{isProjectPlanner && `Tasks in ${currentStory[1]}`}</p>
        <p className={filterbarStyles.FilterHeaderText}>Sort By</p>
        <button
          className={filterbarStyles.FilterButton}
          onClick={() =>
            handleButtonClick(
              "priority",
              ["Low", "Medium", "High"],
              [false, ""]
            )
          }
        >
          Priority
        </button>
        <button
          className={filterbarStyles.FilterButton}
          onClick={() =>
            handleButtonClick(
              "taskStatus",
              ["Pending", "Active", "Finished"],
              [false, ""]
            )
          }
        >
          Status
        </button>

        <p className={filterbarStyles.FilterHeaderText}>Filter Tasks</p>
        <button
          className={filterbarStyles.FilterButton}
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
          className={filterbarStyles.FilterButton}
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

        <p className={filterbarStyles.FilterHeaderText}>Display By:</p>
        <button
          className={filterbarStyles.FilterButton}
          onClick={() => setcreatedAtShown(!createdAtShown)}
        >
          {createdAtShown ? "Updated At" : "Created At"}
        </button>

        <p className={filterbarStyles.FilterHeaderText}></p>
      </div>

      <div
        className={`${styles.taskList} ${
          isFilteredAndHow[0] && styles.taskListGrid
        }`}
        style={{ width: isRightPanelVisible ? "75%" : "98%" }}
      >
        {separatedTasks.map((taskGroups, idx) => (
          <div className={styles.taskColumn} key={idx}>
            <h2 className={styles.columnHeader}>
              {isFilteredAndHow[0]
                ? isFilteredAndHow[1]
                : filterParameters[idx]} 
            </h2>

            {taskGroups.map((task) => (
             
                <TaskSummary task={task} createdAtShown={createdAtShown} key={task.id}/>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
