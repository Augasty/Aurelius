/* eslint-disable react/prop-types */

import {  useSelector } from "react-redux";


const DropDown = ({currentGroup,setcurrentGroup}) => {

  const redux_groups = useSelector((state) => state.groups);
  // console.log('redux groups=>',redux_groups)  //[8j8Hr6n40ebVA1XyR5aQ,awdad]



    
    
    
    
      // Handler function to update the selected value
      const handleSelectChange = (event) => {
        event.preventDefault();
        setcurrentGroup(event.target.value);
        // console.log(event.target.value)
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