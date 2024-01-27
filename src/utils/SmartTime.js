import moment from 'moment';

export const SmartTime = (displayTime) => {
  const displayTimeMoment = moment(displayTime);
  const isToday = displayTimeMoment.isSame(moment(), 'day');
  const isYesterday = displayTimeMoment.isSame(moment().subtract(1, 'day'), 'day');

  let formattedDate;

  if (isToday) {
    formattedDate = `Today at ${displayTimeMoment.format('h:mm a')}`;
  } else if (isYesterday) {
    formattedDate = `Yesterday at ${displayTimeMoment.format('h:mm a')}`;
  } else {
    formattedDate = displayTimeMoment.format('MMM Do YYYY [at] h:mm a');
  }

  return formattedDate;
};
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};