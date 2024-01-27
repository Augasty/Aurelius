
import { useProjectContexts } from '../../../utils/ProjectContexts';
import styles from './Theme.module.css';

const ToggleSwitch = () => {
  const {isDarkMode, setIsDarkMode} = useProjectContexts();
  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <label className={`${styles.toggleSwitch} ${isDarkMode ? styles.active : ''}`}>
      <input type="checkbox" onChange={handleToggle} style={{display:'none'}}/>
      <span className={styles.slider}></span>
    </label>
  );
};

export default ToggleSwitch;