import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const DropDown = ({setGroup,group}) => {

  // Handler function to update the selected value
  const handleSelectChange = (event) => {
    event.preventDefault();
    setGroup(event.target.value);
  };



//will work on it after authentication is fixed
  const [listOfGroups, setListOfGroups] = useState([])
  // console.log(listOfGroups)
  const [user] = useAuthState(auth);

  useEffect(() => {
    async function fetchData(userId){
      try {
        const userRef = doc(db, 'users', userId);
        const userSnapshot = await getDoc(userRef);
  
        if (userSnapshot.exists()) {
          const userData = {
            id: userSnapshot.id,
            groupIds: userSnapshot.data().groupIds || {},
          };
  
          // If you want to store user data in localGroups
          const localGroups = userData.groupIds;
          setListOfGroups(...localGroups)  
        }
      } catch (error) {
        console.error('Error fetching data from Firebase:', error);
      }
    };
  
    if (user) {
      fetchData(user.uid);
    }
  }, [db,user]);
  
  return (
    <div>
      <select id="dropdown" value={group || ''} onChange={handleSelectChange}>
        {/* Add your dropdown options here */}
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </select>
    </div>
  );
};

export default DropDown