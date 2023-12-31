import moment from "moment";

export const  SmartTime =(displayTime) =>{
    const displayTimeMoment = moment(displayTime)
    const isToday = displayTimeMoment.isSame(moment(), "day");
    const isYesterday = displayTimeMoment.isSame(moment().subtract(1, "day"),"day");
  
    let formattedDate;
  
    if (isToday) {
      formattedDate = `Today at ${displayTimeMoment.format("h:mm a")}`;
    } else if (isYesterday) {
      formattedDate = `Yesterday at ${displayTimeMoment.format("h:mm a")}`;
    } else {
      formattedDate = displayTimeMoment.format("MMMM Do YYYY [at] h:mm a");
    }
  
    return formattedDate
}