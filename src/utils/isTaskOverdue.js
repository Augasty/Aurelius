import moment from "moment";

export const isTaskOverDue = (currentTask) =>{
    return (
        currentTask.taskStatus != "Finished" &&
        moment(currentTask.deadline, "YYYY-MM-DD").isBefore(moment(), "day")
    )
  
}