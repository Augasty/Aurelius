import { collection, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react'
import { db } from '../../firebase';

const Notifications = () => {
  // useEffect(()=>{
  //   const collec = collection(db, 'projects');
  //   const unsub = onSnapshot(collec,qss=>{
  //     const proj = []
  //     qss.forEach(doc=>{
  //       proj.push(doc.data().title)
  //     })
  //     console.log(proj)
  //   })
  //   return ()=> unsub()
  // })

  const [initialLoadComplete, setInitialLoadComplete] = useState(false);

  useEffect(() => {
    const collec = collection(db, 'projects');
    const unsub = onSnapshot(collec, (querySnapshot) => {
      querySnapshot.docChanges().forEach((change) => {
        if (change.type === 'added' && initialLoadComplete) {
          const title = change.doc.data().title;
          console.log(`New project created: ${title}`);
        }
      });

      // Set initialLoadComplete to true after the first snapshot
      if (!initialLoadComplete) {
        setInitialLoadComplete(true);
      }
    });

    return () => unsub();
  }, [initialLoadComplete]);

  return (
    <div>Notifications</div>
  )
}

export default Notifications