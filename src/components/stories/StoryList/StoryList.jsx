/* eslint-disable react/prop-types */
import styles from "./StoryList.module.css";
import filterbarStyles from "../../../sharedStyles/FilterBar.module.css";
import dropdownStyles from "../../../sharedStyles/DropDown.module.css";

import { useSelector } from "react-redux";

import { useProjectContexts } from "../../../utils/ProjectContexts";
import { useEffect, useState } from "react";
import TaskContainerStory from "../TaskContainerStory/TaskContainerStory";
import { separateStories } from "./formatStoryArray";

const StoryList = () => {
  const { isRightPanelVisible, currentboard } = useProjectContexts();
  const [storyDisplayedTime, setstoryDisplayedTime] = useState("createdAt");
  const [filterName, setfilterName] = useState(null);

  const reduxstories = useSelector((state) => state.stories);

  let [filteredStories, setfilteredStories] = useState([]);

  useEffect(() => {
    console.log(storyDisplayedTime, filterName);

    const filter = separateStories(
      reduxstories,
      storyDisplayedTime,
      filterName
    );
    setfilteredStories(filter);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storyDisplayedTime, filterName, currentboard]);

  // console.log('manual fetch, required to pull initially when loaded. DON'T REMOVE THIS')
  filteredStories = reduxstories.filter((obj) => !obj.dummy);

  const [createdAtShown, setcreatedAtShown] = useState(false);

  return (
    <div className={styles.StoryListContainer}>
      <div className={filterbarStyles.navbar}>
        <ul className={filterbarStyles.navbarList}>
          <br />
          <p className={filterbarStyles.liDivItems}>Task Date:</p>
          <li
            onClick={() => setcreatedAtShown(!createdAtShown)}
            className={filterbarStyles.navbarListItem}
          >
            {createdAtShown ? "Created" : "Updated"}
          </li>

          <br />
          <p className={filterbarStyles.liDivItems}>Story Date:</p>
          <li
            className={filterbarStyles.navbarListItem}
            onClick={() => {
              if (storyDisplayedTime === "createdAt") {
                setstoryDisplayedTime("updatedAt");
              } else if (storyDisplayedTime === "updatedAt") {
                setstoryDisplayedTime("deadline");
              } else {
                setstoryDisplayedTime("createdAt");
              }
            }}
          >
            {storyDisplayedTime === "createdAt" && "Created"}
            {storyDisplayedTime === "updatedAt" && "Updated"}
            {storyDisplayedTime === "deadline" && "Deadline"}
          </li>

          <br />
          <p className={filterbarStyles.liDivItems}>Filter:</p>
          <select
            className={dropdownStyles.dropdownSelect}
            value={filterName}
            onChange={(e) =>
              setfilterName(
                e.target.value === filterName ? null : e.target.value
              )
            }
          >
            <option value="" className={dropdownStyles.dropdownOption}>
              All
            </option>
            <option
              value="completionCount"
              className={dropdownStyles.dropdownOption}
            >
              Active
            </option>
            <option value="deadline" className={dropdownStyles.dropdownOption}>
              Overdue
            </option>
          </select>
        </ul>
      </div>
      <div
        className={styles.storyList}
        style={{ width: isRightPanelVisible ? "66.7vw" : "90.5vw" }}
      >
        {filteredStories.map((story, index) => {
          if (story?.dummy) {
            return;
          }

          return (
            <TaskContainerStory
              key={index}
              story={story}
              storyDisplayedTime={storyDisplayedTime}
              createdAtShown={createdAtShown}
            />
          );
        })}
      </div>
    </div>
  );
};

export default StoryList;
