import { useSelector } from "react-redux";
import TaskNotification from "./types/TaskNotification";
import JoinReqest from "./types/JoinReqest";

const Notification = () => {
    // fetch notifications from notificationSlice
    let reduxNotificationList = useSelector((state) => state.notifications)


    console.log(reduxNotificationList)
    // if you accept the
    
    if (reduxNotificationList.length == 0){
      return (
        <div>No Notifications</div>
      )
    }
  return (
    <div>
      {reduxNotificationList.slice()
      .sort((a, b) => new Date(a.time) - new Date(b.time)).map((notification) => {
        if (notification.type == "join-req") return <JoinReqest notification={notification} key={notification.id}/>

        if (notification.type == "task-assigned" || notification.type == "task-updated") return <TaskNotification notification={notification} key={notification.id}/>
      })}
    </div>
  )
}

export default Notification