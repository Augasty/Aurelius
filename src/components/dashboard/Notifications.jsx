/* eslint-disable react/prop-types */
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { useEffect } from 'react'
import { db } from '../../firebase';

const Notifications = ({currentGroup}) => {


  useEffect(() => {
    const triggerData = async ()=>{

      const currentGroupId = currentGroup.split(",")[0];
      const tasksSnapShot = await getDocs(collection(db, "groups", currentGroupId, "taskList"));
  
      const unsub = onSnapshot(tasksSnapShot, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // if (change.type === 'added' && initialLoadComplete) {
          //   const title = change.doc.data().title;
          //   console.log(`New project created: ${title}`);
          // }
          console.log('update triggered')

            const data = doc.data()
            console.log(doc.id,data)

        });
  

      });
      
      unsub();
    }

    triggerData()
  }, [currentGroup]);

  return (
    <div>Notifications</div>
  )
}

export default Notifications