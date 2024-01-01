/* eslint-disable react/prop-types */
import styles from "./storyList.module.css";
import filterbarStyles from "../../../sharedStyles/FilterBar.module.css"
import { useSelector } from "react-redux";
// import { separateStoriesByFilterType } from "./separatedStories";
import { useProjectContexts } from "../../../utils/ProjectContexts";
import { useState } from "react";
import { auth } from "../../../firebase";
import TaskContainerStory from "../TaskContainerStory/TaskContainerStory";
// import { useEffect } from 'react';

const StoryList = () => {
  const { isRightPanelVisible } = useProjectContexts();
  const reduxstories = useSelector((state) => state.stories);
  const filteredStories = reduxstories.filter((obj) => !obj.dummy);

  const curuser = auth.currentUser;

  const [filterType, setfilterType] = useState("priority");
  const [filterParameters, setfilterParameters] = useState([]);

  let [separatedstories, setseparatedstories] = useState([]);

  const [createdAtShown, setcreatedAtShown] = useState(false);



  const handleButtonClick = (newFilterType, newFilterParameters) => {
    setfilterType(newFilterType);
    setfilterParameters(newFilterParameters);

    localStorage.setItem("filterType", newFilterType);
    localStorage.setItem(
      "filterParameters",
      JSON.stringify(newFilterParameters)
    );
  };

  return (
    <div style={{ display: "grid" }}>
      <div className={filterbarStyles.FilterBar}>
        <p className={filterbarStyles.FilterHeaderText}>Sort By</p>
        <button
          className={filterbarStyles.FilterButton}
          onClick={() =>
            handleButtonClick(
              "priority",
              [
                "Not Relevant",
                "Low Priority",
                "Medium Priority",
                "High Priority",
              ],
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
              "storiestatus",
              ["Pending", "Active", "Finished"],
              [false, ""]
            )
          }
        >
          Status
        </button>

        <button className={filterbarStyles.FilterButton} onClick={() => {}}>
          Chronogically
        </button>

        <p className={filterbarStyles.FilterHeaderText}>Display:</p>
        <button
          className={filterbarStyles.FilterButton}
          onClick={() => setcreatedAtShown(!createdAtShown)}
        >
          {createdAtShown ? "Created At" : "Updated At"}
        </button>

        <p className={filterbarStyles.FilterHeaderText}></p>
      </div>

      <div
        className={styles.storyList}
        style={{ width: isRightPanelVisible ? "74vw" : "98vw" }}
      >
        {filteredStories.map((story) => (
          <TaskContainerStory
            key={story.id}
            story={story}
            createdAtShown={createdAtShown}
          />
        ))}
      </div>
    </div>
  );
};

export default StoryList;
