
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import styles from './RightPanel.module.css';
import ChatRoom from './ChatRoom/ChatRoom';

const RightPanel = () => {
  const [user] = useAuthState(auth);
  return (
    <div className={styles.rightPanel}>
      
      {user && <ChatRoom />}
    </div>
  );
};

export default RightPanel;