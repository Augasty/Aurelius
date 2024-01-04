/* eslint-disable react/prop-types */
import styles from "./StoryList.module.css";
import filterbarStyles from "../../../sharedStyles/FilterBar.module.css";
import { useSelector } from "react-redux";
// import { separateStoriesByFilterType } from "./separatedStories";
import { useProjectContexts } from "../../../utils/ProjectContexts";
import { useEffect, useState } from "react";
import TaskContainerStory from "../TaskContainerStory/TaskContainerStory";

const StoryList = () => {
  const { isRightPanelVisible } = useProjectContexts();
  const [storyDisplayedTime, setstoryDisplayedTime] = useState("createdAt");

  const reduxstories = useSelector((state) => state.stories);
  var filteredStories = reduxstories.filter((obj) => !obj.dummy);
  useEffect(() => {
    filteredStories.sort(
      (a, b) =>
        new Date(b[storyDisplayedTime]) - new Date(a[storyDisplayedTime])
    );

    console.log(filteredStories);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storyDisplayedTime]);

  const [createdAtShown, setcreatedAtShown] = useState(false);

  return (
    <div style={{ display: "grid" }}>
      {/* <div className={filterbarStyles.FilterBar}>
        <p className={filterbarStyles.FilterHeaderText}>Show Task Date By::</p>
        <button
          className={filterbarStyles.FilterButton}
          onClick={() => setcreatedAtShown(!createdAtShown)}
        >
          {createdAtShown ? "Created At" : "Updated At"}
        </button>

        <p className={filterbarStyles.FilterHeaderText}>Show Story Date By:</p>

        <>
          <button
            className={`${filterbarStyles.FilterButton} ${
              storyDisplayedTime === "createdAt" &&
              filterbarStyles.ActiveFilterButton
            }`}
            onClick={() => setstoryDisplayedTime("createdAt")}
          >
            Created At
          </button>

          <button
            className={`${filterbarStyles.FilterButton} ${
              storyDisplayedTime === "updatedAt" &&
              filterbarStyles.ActiveFilterButton
            }`}
            onClick={() => setstoryDisplayedTime("updatedAt")}
          >
            Updated At
          </button>

          <button
            className={`${filterbarStyles.FilterButton} ${
              storyDisplayedTime === "deadline" &&
              filterbarStyles.ActiveFilterButton
            }`}
            onClick={() => setstoryDisplayedTime("deadline")}
          >
            Deadline
          </button>
        </>

        <p className={filterbarStyles.FilterHeaderText}></p>

        <button className={filterbarStyles.FilterButton} onClick={() => {}}>
          Filter Finished Stories
        </button>
      </div> */}

      <div
        className={styles.storyList}
        style={{ width: isRightPanelVisible ? "74vw" : "98vw" }}
      >
        {filteredStories.map((story, index) => (
          <TaskContainerStory
            key={index}
            story={story}
            storyDisplayedTime={storyDisplayedTime}
            createdAtShown={createdAtShown}
          />
        ))}
      </div>
    </div>
  );
};

export default StoryList;
