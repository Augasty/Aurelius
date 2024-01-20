
import { useProjectContexts } from '../../../../utils/ProjectContexts';
import styles from './ToggleSwitch.module.css';

const ToggleSwitch = () => {
  const {isDarkMode, setIsDarkMode} = useProjectContexts();
  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
    // Add your theme change logic here
  };

  return (
    <label className={`${styles.toggleSwitch} ${isDarkMode ? styles.active : ''}`}>
      <input type="checkbox" onChange={handleToggle} />
      <span className={styles.slider}></span>
    </label>
  );
};

export default ToggleSwitch;