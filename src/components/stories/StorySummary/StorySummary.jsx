/* eslint-disable react/prop-types */
import moment from "moment";
import styles from "./StorySummary.module.css"

const getStoryColorClass = (storyStatus) => {
  switch (storyStatus) {
    case "Not Relevant":
      return styles.storyNotRelevant;
    case "Completed":
        return styles.storyCompleted;
    case "In Progress":
      return styles.storyInProgress;
    case "Yet To Start":
      return styles.storyYetToStart;
  }
};

const StorySummary = ({ story, createdAtShown }) => {
  const displayTimeMoment = moment(
    createdAtShown ? story.createdAt : story.updatedAt
  );
  const isToday = displayTimeMoment.isSame(moment(), "day");
  const isYesterday = displayTimeMoment.isSame(
    moment().subtract(1, "day"),
    "day"
  );

  let formattedDate;

  if (isToday) {
    formattedDate = `Today at ${displayTimeMoment.format("h:mm a")}`;
  } else if (isYesterday) {
    formattedDate = `Yesterday at ${displayTimeMoment.format("h:mm a")}`;
  } else {
    formattedDate = displayTimeMoment.format("MMMM Do YYYY [at] h:mm a");
  }

  const isOverDue =
    story.storyStatus != "Completed" &&
    moment(story.deadline, "YYYY-MM-DD").isBefore(moment(), "day");
  const storyColorClass = getStoryColorClass(story.storyStatus);
  return (
    <div className={`${styles.storySummary} ${storyColorClass}`}>
      <p className={styles.storyStatus}>{story.storyStatus} </p>
      {isOverDue && <span className={styles.overdueChip}>overdue</span>}
      <p className={styles.storySummaryTitle}>
        {story.title.length > 25
          ? `${story.title.substring(0, 22)}...`
          : story.title}
      </p>
      <p className={styles.storySummaryText}>
        {" "}
        {formattedDate.length > 30
          ? `${formattedDate.substring(0, 28)}...`
          : formattedDate}
      </p>
    </div>
  );
};

export default StorySummary;
