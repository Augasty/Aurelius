/* eslint-disable react/prop-types */
import { doc, updateDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import styles from './DropDown.module.css'
import { useProjectContexts } from "../../../utils/ProjectContexts";



const DropDown = () => {
  const {currentboard,setcurrentboard,isRightPanelVisible,toggleRightPanel} = useProjectContexts();
  const [user] = useAuthState(auth);
  const redux_boards = useSelector((state) => state.boards);
  const history = useNavigate();

  // Handler function to update the selected value
  const handleSelectChange = (event) => {
    event.preventDefault();
    const curBoardArr = event.target.value.split(","); //['EUlldFByPHz7RcidE7z2', 'board2']
    console.log(curBoardArr);
    updateDoc(doc(db, "users", user.email), {
      currentboard: curBoardArr,
    });
    setcurrentboard(curBoardArr);

    // on group change, closing the chat-panel if it is open
    if(isRightPanelVisible){
      toggleRightPanel(false)
    }

    history("/");
  };

  const boardKeys = Object.keys(redux_boards);

  const currentboardArr = `${currentboard[0]},${currentboard[1]}`
  return (
    <>
      <div className={styles.dropdownContainer}>
        <select
          id="dropdown"
          value={currentboardArr ? currentboardArr : ""}
          onChange={handleSelectChange}
          className={styles.dropdownSelect}
        >
          {/* Add your dropdown options here */}
          {boardKeys.map((idref) => {
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
