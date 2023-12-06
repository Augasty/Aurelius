/* eslint-disable react/prop-types */
import { collection,  getDocs,  onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react'
import { db } from '../../firebase';
import { useDispatch } from 'react-redux';
import { setTasksFromFireBase } from '../tasks/taskSlice';

const Notifications = ({currentGroup}) => {





  const dispatch = useDispatch();
// can't put this useeffect inside Navbar, it gets called before tasklist is rendered
  const fetchData = async () => {
    if (!currentGroup  || currentGroup.length === 0 ) {
      console.log('nothing in noti')
      return;
    }
    try {
      const currentGroupId = currentGroup[0];
      const ProjectsSnapShot = await getDocs(
        collection(db, "groups", currentGroupId, "taskList")
      );

      if (!ProjectsSnapShot.empty) {
        const projectsData = ProjectsSnapShot.docs.map((doc) => ({
          id: doc.id,
          content: doc.data()?.content,
          assignedTo: doc.data()?.assignedTo,
          priority: doc.data()?.priority,
          taskStatus: doc.data()?.taskStatus,
          locked: false,
          dummy: doc.data().dummy,
          title: doc.data()?.title,
          authorDetails: doc.data()?.authorDetails,
          createdAt: doc.data()?.createdAt,
        }));

        const filteredProjectsData = projectsData?.filter(
          (obj) => !obj.dummy
        );
        // console.log(filteredProjectsData)

        try {
          dispatch(setTasksFromFireBase([...filteredProjectsData]));
        } catch (e) {
          console.warn("error uploading tasks in redux", e);
        }
      }
    } catch (error) {
      console.error("Error fetching tasks from Firebase:", error);
    }
  };

  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  useEffect(() => {


      const currentGroupId = currentGroup[0];
      const tasksRef = collection(db, "groups", currentGroupId, "taskList");
      const unsub = onSnapshot(tasksRef, () => {
        console.log('call per change')

        // we are calling the doc everytime someone adds or changes any doc
        // as a failsafe, we are also adding the doc locally in our redux anytime a doc is created by me[the current user]
        // although it gets updated anyways
        fetchData();

  
        // Set initialLoadComplete to true after the first snapshot
        if (!initialLoadComplete) {
          setInitialLoadComplete(true);
        }
      });
  
      return () => unsub();
   

  }, [currentGroup, initialLoadComplete]);

  return (
    <div>Notifications</div>
  )
}

export default Notifications