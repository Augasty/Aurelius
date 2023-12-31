/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import styles from "./storyList.module.css";
import { useSelector } from "react-redux";
// import { separateStoriesByFilterType } from "./separatedStories";
import { useProjectContexts } from "../../../utils/ProjectContexts";
import { useState } from "react";
import { auth } from "../../../firebase";
import CardContainer from "./CardContainer";
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

  // useEffect(() => {
  //   const storedFilterType = localStorage.getItem("storyfilterType");
  //   const storedFilterParameters = localStorage.getItem("storyfilterParameters");

  //   if (storedFilterType) {
  //     setfilterType(storedFilterType);
  //   }

  //   if (storedFilterParameters) {
  //     setfilterParameters(JSON.parse(storedFilterParameters));
  //   }

  //   if (storedIsFilteredAndHow) {
  //     setisFilteredAndHow(JSON.parse(storedIsFilteredAndHow));
  //   }
  // }, []);

  // useEffect(() => {
  //   setseparatedstories(
  //     separateStoriesByFilterType(
  //       filteredArray,
  //       filterType,
  //       filterParameters,
  //       createdAtShown
  //     )
  //   );
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [filterType, filterParameters, createdAtShown]);

  // {
  //   separatedstories = separateStoriesByFilterType(
  //     filteredArray,
  //     filterType,
  //     filterParameters,
  //     createdAtShown
  //   );
  //   // console.log("manual fetch");
  // }

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
    <div style={{ display: "flex" }}>
<div className={styles.FilterBar}>
<p className={styles.FilterHeaderText}>Sort By</p>
<button
  className={styles.FilterButton}
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
  className={styles.FilterButton}
  onClick={() =>
    handleButtonClick(
      "storiestatus",
      ["Yet To Start", "In Progress", "Completed"],
      [false, ""]
    )
  }
>
  Status
</button>

<button className={styles.FilterButton} onClick={() => {}}>
  Chronogically
</button>

<p className={styles.FilterHeaderText}>Display:</p>
<button
  className={styles.FilterButton}
  onClick={() => setcreatedAtShown(!createdAtShown)}
>
  {createdAtShown ? "Created At" : "Updated At"}
</button>

<p className={styles.FilterHeaderText}></p>
</div>

      <div
        className={styles.storyColumn}
        style={{ width: isRightPanelVisible ? "75%" : "100%" }}
      >
        {filteredStories.map((story) => (

            <CardContainer key={story.id} story={story} createdAtShown={createdAtShown}/>

        ))}


      </div>
    </div>
  );
};

export default StoryList;



// buttons, will make it a horizontal ribbon kinda
{/*  */}