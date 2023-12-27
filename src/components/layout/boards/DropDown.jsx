/* eslint-disable react/prop-types */
import { doc, updateDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import styles from './DropDown.module.css'
import { useProjectContexts } from "../../../utils/ProjectContexts";



const DropDown = () => {
  const {currentBoard,setcurrentBoard,isRightPanelVisible,toggleRightPanel} = useProjectContexts();
  const [user] = useAuthState(auth);
  const redux_boards = useSelector((state) => state.groups);
  const history = useNavigate();

  // Handler function to update the selected value
  const handleSelectChange = (event) => {
    event.preventDefault();
    const curBoardArr = event.target.value.split(","); //['EUlldFByPHz7RcidE7z2', 'group2']
    console.log(curBoardArr);
    updateDoc(doc(db, "users", user.email), {
      currentGroup: curBoardArr,
    });
    setcurrentBoard(curBoardArr);

    if( isRightPanelVisible){
      toggleRightPanel(false)
    }

    history("/");
  };

  const groupKeys = Object.keys(redux_boards);

  const currentGroupArr = `${currentBoard[0]},${currentBoard[1]}`
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
                value={`${idref},${redux_boards[idref]}`}
                key={idref}
                className={styles.dropdownOption}
              >{`${redux_boards[idref]}`}</option>
            );
          })}
        </select>
      </div>
    </>
  );
};

export default DropDown;
