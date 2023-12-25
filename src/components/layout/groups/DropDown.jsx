/* eslint-disable react/prop-types */
import { doc, updateDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import styles from './DropDown.module.css'

import { useGroupAndChatToggleContext } from  "../../../utils/GroupAndChatToggleContext";
const DropDown = () => {
  const { currentGroup, setcurrentGroup , isRightPanelVisible,toggleRightPanel} = useGroupAndChatToggleContext();
  const [user] = useAuthState(auth);
  const redux_groups = useSelector((state) => state.groups);
  const history = useNavigate();

  // Handler function to update the selected value
  const handleSelectChange = (event) => {
    event.preventDefault();
    const curGroupArr = event.target.value.split(","); //['EUlldFByPHz7RcidE7z2', 'group2']
    console.log(curGroupArr);
    updateDoc(doc(db, "users", user.email), {
      currentGroup: curGroupArr,
    });
    setcurrentGroup(curGroupArr);

    if( isRightPanelVisible){
      toggleRightPanel(false)
    }

    history("/");
  };

  const groupKeys = Object.keys(redux_groups);

  const currentGroupArr = `${currentGroup[0]},${currentGroup[1]}`
  return (
    <>
      <div className={styles.dropdownContainer}>
        <select
          id="dropdown"
          value={currentGroupArr ? currentGroupArr : ""}
          onChange={handleSelectChange}
          className={styles.dropdownSelect}
        >
          {/* Add your dropdown options here */}
          {groupKeys.map((idref) => {
            return (
              <option
                value={`${idref},${redux_groups[idref]}`}
                key={idref}
                className={styles.dropdownOption}
              >{`${redux_groups[idref]}`}</option>
            );
          })}
        </select>
      </div>
    </>
  );
};

export default DropDown;
