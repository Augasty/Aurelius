/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import styles from '../../../sharedStyles/DropDown.module.css';
import { useProjectContexts } from '../../../utils/ProjectContexts';
import updateCurrentBoardInFirebase from '../../../utils/updateCurrentBoardInFirebase';
import { setStoriesFromFireBase } from '../../stories/storySlice';
import { setTasksFromFireBase } from '../../tasks/taskSlice';

const DropDown = () => {
  const { currentboard, setcurrentboard, setIsChatPanelVisible } = useProjectContexts();

  const dispatch = useDispatch();
  const [user] = useAuthState(auth);
  const redux_boards = useSelector((state) => state.boards);
  const history = useNavigate();

  // Handler function to update the selected value
  const handleSelectChange = (event) => {
    event.preventDefault();
    const curBoardArr = event.target.value.split(','); //['EUlldFByPHz7RcidE7z2', 'board2']

    // setting the story and task blank.. the data will get fetched by firestore
    // ... preventing the old board data from showing for a moment
    dispatch(setStoriesFromFireBase([]));
    dispatch(setTasksFromFireBase([]));

    updateCurrentBoardInFirebase(user.email, curBoardArr);
    setcurrentboard([...curBoardArr]);
    setIsChatPanelVisible(false);

    history('/');
  };

  const boardKeys = Object.keys(redux_boards);

  const currentboardArr = `${currentboard[0]},${currentboard[1]}`;
  return (
    <>
      <div className={styles.dropdownContainer}>
        <select
          id="dropdown"
          value={currentboardArr ? currentboardArr : ''}
          onChange={handleSelectChange}
          className={styles.dropdownSelect}
        >
          {boardKeys.map((idref) => {
            return (
              <option value={`${idref},${redux_boards[idref]}`} key={idref} className={styles.dropdownOption}>
                {redux_boards[idref].length > 20 ? `${redux_boards[idref].substring(0, 20)}...` : redux_boards[idref]}
              </option>
            );
          })}
        </select>
      </div>
    </>
  );
};

export default DropDown;
