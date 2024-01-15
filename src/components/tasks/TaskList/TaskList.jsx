/* eslint-disable react/prop-types */
import TaskSummary from "../TaskSummary/TaskSummary";

import styles from "./TaskList.module.css";
import filterbarStyles from "../../../sharedStyles/FilterBar.module.css";

import dropdownStyles from "../../../sharedStyles/DropDown.module.css";
import { useSelector } from "react-redux";
import { separateTasksByPriority } from "./separatedTasks";
import { useProjectContexts } from "../../../utils/ProjectContexts";
import { useEffect, useState } from "react";
import { auth } from "../../../firebase";

const TaskList = () => {
  const { isRightPanelVisible, isProjectPlanner } = useProjectContexts();
  let reduxTasks = useSelector((state) => state.tasks) || [];
  const currentStory = JSON.parse(
    localStorage.getItem("currentStoryLocalStorage")
  );

  // console.log(currentStory)
  if (isProjectPlanner) {
    reduxTasks = reduxTasks?.filter(
      (task) => task.referenceStory[0] === currentStory[0]
    );
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
    <div className={styles.mainContainer}>
      <div className={filterbarStyles.navbar}>
        <ul className={filterbarStyles.navbarList}>
        <br/>
          <p className={filterbarStyles.liDivItems}>Sort By</p>

          <li
            onClick={() =>
              handleButtonClick(
                "priority",
                ["Low", "Medium", "High"],
                [false, ""]
              )
            }
            className={filterbarStyles.navbarListItem}
          >
            Priority
          </li>
              
          <li
            onClick={() =>
              handleButtonClick(
                "taskStatus",
                ["Pending", "Active", "Finished"],
                [false, ""]
              )
            }
            className={filterbarStyles.navbarListItem}
          >
            Status
          </li>

          <br/>
          <br/>
          <p className={filterbarStyles.liDivItems}>Filter</p>



          <select
            className={dropdownStyles.dropdownSelect}
            onChange={(e) =>{

              if (!e.target.value){
                return
              }
              const selectedFilterType = e.target.options[e.target.selectedIndex].dataset.filterType;

              console.log(selectedFilterType,e.target.value)

              handleButtonClick(
                selectedFilterType,
                [curuser.email],
                [true, e.target.value]
              )
            }}
          >
            <option id="all" value="" className={dropdownStyles.dropdownOption}>
              All
            </option>
            <option
              data-filter-type="authorDetails"
              value="Assigned By Me"
              className={dropdownStyles.dropdownOption}
            >
              By Me
            </option>

            <option
              data-filter-type="assignedTo"
              value="Assigned To Me"
              className={dropdownStyles.dropdownOption}
            >
              For Me
            </option>
          </select>





          <p className={filterbarStyles.liDivItems}>Task Date:</p>
          <li
            onClick={() => setcreatedAtShown(!createdAtShown)}
            className={filterbarStyles.navbarListItem}
          >
            {createdAtShown ? "Created" : "Updated"}
          </li>
        </ul>
      </div>

      <div
        className={`${styles.taskList} ${
          isFilteredAndHow[0] && styles.taskListGrid
        }`}
        style={{ width: isRightPanelVisible ? "75%" : "90%" }}
      >
        {separatedTasks.map((taskGroups, idx) => (
          <div className={styles.taskColumn} key={idx}>
            <h2 className={styles.columnHeader}>
              {isFilteredAndHow[0]
                ? isFilteredAndHow[1]
                : filterParameters[idx]}
            </h2>

            {taskGroups.map((task) => (
              <TaskSummary
                task={task}
                createdAtShown={createdAtShown}
                key={task.id}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
