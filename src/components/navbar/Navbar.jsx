import { Link, NavLink } from 'react-router-dom';
import styles from './Navbar.module.css'; 
import RedDot from "../../sharedStyles/RedDot.module.css"
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import DropDown from './DropDown';
import { useState } from 'react';
import topchicken from '../../../assets/topchicken.jpg';
import Aurelius from '../../../assets/Aurelius.png';
import { useProjectContexts } from '../../utils/ProjectContexts';
import { useNavigate } from 'react-router-dom';
import Theme from './Theme/Theme';

const Navbar = () => {
  const curuser = auth.currentUser;
  const navigate = useNavigate();
  const {notificationCount, currentboard, setcurrentboard, isChatPanelVisible, setIsNotificationPanelVisible, setIsChatPanelVisible, isProjectPlanner } =
    useProjectContexts();

  // for chicken
  const [toggleChicken, setToggleChicken] = useState(true);

  // handling sign out
  const handleSignOut = () => {
    setcurrentboard([]);
    signOut(auth);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <img src={Aurelius} onClick={() => navigate('/')} />
        <Link to="/">Aurelius</Link>
      </div>
      <div>
        <ul className={styles.navbarList}>
          {curuser && (
            <>
              <div className={styles.liDivItems}>
                <li className={styles.navbarListItem}>
                  {currentboard.length !== 0 && (
                    <NavLink to={isProjectPlanner ? '/create-story' : '/create-task'}>
                      New {isProjectPlanner ? 'Story' : 'Task'}
                    </NavLink>
                  )}
                </li>
              </div>
              {currentboard.length !== 0 && (
                <>
                  <div className={`${styles.liDivItems} ${styles.NavbarIcons}`}>
                    <li className={styles.navbarListItem}>
                      <NavLink to="/add-member"> Add Member</NavLink>
                    </li>
                  </div>
                  <div className={styles.liDivItems}>
                    <li onClick={() => {


                    setIsChatPanelVisible((prev) => !prev)
                    setIsNotificationPanelVisible(false)
                    }
                    
                    } className={styles.navbarListItem}>
                      <div>{isChatPanelVisible ? 'Close' : 'Open'} Chat</div>
                    </li>
                  </div>
                </>
              )}
              <div className={styles.liDivItems}>
                <li  onClick={() =>{
                  setIsChatPanelVisible(false)
                  setIsNotificationPanelVisible((prev) => !prev)
                } } className={`${styles.navbarListItem} ${notificationCount && RedDot.RedDot}`} data-count={notificationCount < 10 ? notificationCount : '＋'}>
                  <div>Notifications</div>
                </li>
              </div>

              <div className={styles.liDivItems}>
                <li className={styles.navbarListItem}>
                <NavLink to="/create-board">New Board</NavLink>
                </li>
              </div>

              {curuser.email && currentboard.length !== 0 && (
                <div className={styles.liDivItems}>
                  <li className={styles.navbarListItem}>
                    <DropDown />
                  </li>
                </div>
              )}
              <div className={styles.liDivItems}>
                <li className={styles.navbarListItem}>
                  <div onClick={(e) => handleSignOut(e)}>Log Out</div>
                </li>
              </div>
            </>
          )}
          <li className={styles.navbarListItem}>
            <NavLink className={`${styles.profile} ${styles.toggle}`} onClick={() => setToggleChicken(!toggleChicken)}>
              <img src={toggleChicken && curuser?.photoURL ? curuser?.photoURL : topchicken} alt="user" />
            </NavLink>
          </li>

          <div className={styles.liDivItems}>
            <li className={styles.navbarListItem}>
              <Theme />
            </li>
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
