/* eslint-disable react/prop-types */
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState} from "react";
import { auth, db } from "../../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { setGroupsWhileLoggingIn } from "./groupSlice";


const DropDown = ({group,setGroup,setGroupsObject,groupsObject,usermail}) => {

  const redux_groups = useSelector((state) => state.groups);
  console.log('x',redux_groups)  //[8j8Hr6n40ebVA1XyR5aQ,awdad]





  const dispatch = useDispatch();


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
    

          dispatch(setGroupsWhileLoggingIn({
              ...userGroupsObjects
          }))
        }
      } catch (error) {
        console.error('Error fetching data from Firebase:', error);
      }
    }
    
          fetchData();
      }, [dispatch, setGroupsObject, usermail]);
      
    
    
    
    
    
    
      // Handler function to update the selected value
      const handleSelectChange = (event) => {
        event.preventDefault();
        setGroup(event.target.value);
        console.log(event.target.value)
      };
    
      const groupKeys = Object.keys(redux_groups)

    
  





  return (
    <>
    <div>
      <select id="dropdown" value={group?group:''} onChange={handleSelectChange}>
        {/* Add your dropdown options here */}
        {groupKeys.map(idref=> {return <option value={`${idref},${groupsObject[idref]}`} key={idref}>{`${groupsObject[idref]}`}</option>})}
      </select>
    </div>


    </>
  );
};

export default DropDown