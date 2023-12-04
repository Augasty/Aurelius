/* eslint-disable react/prop-types */
import {  useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";


const DropDown = ({currentGroup,setcurrentGroup}) => {

  const redux_groups = useSelector((state) => state.groups);
  console.log('redux groups=>',redux_groups)  //[8j8Hr6n40ebVA1XyR5aQ,awdad]

  const history = useNavigate();
  const current_path = useLocation().pathname;
  const path_that_accepts_group_change = ['/create-project','/add-member','/create-group','/']
  // useEffect(() => {
  //   console.log(current_path)
  // }, [current_path])
  
    
    
    
    
      // Handler function to update the selected value
      const handleSelectChange = (event) => {
        event.preventDefault();
        setcurrentGroup(event.target.value);
        // console.log(event.target.value)
        if (!path_that_accepts_group_change.includes(current_path)){
          console.log('to the hooome')
          history("/");
        }
      };
    
      const groupKeys = Object.keys(redux_groups)

    
  





  return (
    <>
    <div>
      <select id="dropdown" value={currentGroup?currentGroup:''} onChange={handleSelectChange}>
        {/* Add your dropdown options here */}
        {groupKeys.map(idref=> {return <option value={`${idref},${redux_groups[idref]}`} key={idref}>{`${redux_groups[idref]}`}</option>})}
      </select>
    </div>


    </>
  );
};

export default DropDown