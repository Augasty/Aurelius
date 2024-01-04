/* eslint-disable react/prop-types */
import styles from "./StoryList.module.css";
import filterbarStyles from "../../../sharedStyles/FilterBar.module.css";
import { useSelector } from "react-redux";
// import { separateStoriesByFilterType } from "./separatedStories";
import { useProjectContexts } from "../../../utils/ProjectContexts";
import { useEffect, useState } from "react";
import TaskContainerStory from "../TaskContainerStory/TaskContainerStory";
import { separateStories } from "./formatStoryArray";

const StoryList = () => {
  const { isRightPanelVisible } = useProjectContexts();
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

    console.log(filter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storyDisplayedTime, filterName]);

  const [createdAtShown, setcreatedAtShown] = useState(false);

  return (
    <div className={styles.StoryListContainer}>
      <div className={filterbarStyles.FilterBar}>
        <p className={filterbarStyles.FilterHeaderText}>Task Date:</p>
        <button
          className={filterbarStyles.FilterButton}
          onClick={() => setcreatedAtShown(!createdAtShown)}
        >
          {createdAtShown ? "Created At" : "Updated At"}
        </button>

        <p className={filterbarStyles.FilterHeaderText}>Story Date:</p>
        <button
          className={filterbarStyles.FilterButton }
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
          {storyDisplayedTime}
        </button>

        <p className={filterbarStyles.FilterHeaderText}>Filter:</p>

        <button
          className={`${filterbarStyles.FilterButton} ${
            filterName === "completionCount" &&
            filterbarStyles.ActiveFilterButton
          }`}
          onClick={() =>
            setfilterName(
              filterName === "completionCount" ? null : "completionCount"
            )
          }
        >
          Active
        </button>

        <button
          className={`${filterbarStyles.FilterButton} ${
            filterName === "deadline" && filterbarStyles.ActiveFilterButton
          }`}
          onClick={() =>
            setfilterName(filterName === "deadline" ? null : "deadline")
          }
        >
          Overdue
        </button>
      </div>

      <div
        className={styles.storyList}
        style={{ width: isRightPanelVisible ? "74vw" : "98vw" }}
      >
        {(filteredStories.length > 0 ? filteredStories : reduxstories).map(
          (story, index) => (
            <TaskContainerStory
              key={index}
              story={story}
              storyDisplayedTime={storyDisplayedTime}
              createdAtShown={createdAtShown}
            />
          )
        )}
      </div>
    </div>
  );
};

export default StoryList;
