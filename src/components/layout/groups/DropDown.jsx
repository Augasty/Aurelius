import { doc, getDoc } from "firebase/firestore";
import { useEffect} from "react";
import { db } from "../../../firebase";


const DropDown = ({group,setGroupsObject,groupsObject,usermail}) => {


  // fetch the group from the user    
  useEffect(() => { 
  async function fetchData(){


    try {
      const userRef = doc(db, 'users', usermail);
      const userSnapshot = await getDoc(userRef);
      // console.log(userSnapshot.data().groups)
      // console.log(usermail)
    
    if (userSnapshot.exists()) {
      const userGroupsObjects = userSnapshot.data().groups
      setGroupsObject({
        ...userGroupsObjects
      })

    }
  } catch (error) {
    console.error('Error fetching data from Firebase:', error);
  }
}

      fetchData();
  }, [db]);
  






  // Handler function to update the selected value
  const handleSelectChange = (event) => {
    event.preventDefault();
    // setGroup(event.target.value);
  };

  const groupKeys = Object.keys(groupsObject)
  console.log(groupsObject,group)








  return (
    <>
    <div>
      <select id="dropdown" value={group || ''} onChange={handleSelectChange}>
        {/* Add your dropdown options here */}
        {groupKeys.map(title=> {return <option value={groupsObject[title]} key={title}>{groupsObject[title]}</option>})}
      </select>
    </div>


    </>
  );
};

export default DropDown