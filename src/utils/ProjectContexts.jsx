/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react';

const ProjectContexts = createContext();

// eslint-disable-next-line react/prop-types
export const ProjectContextsProvider = ({ children }) => {
  const [currentboard, setcurrentboard] = useState([]);
  const [isProjectPlanner,setisProjectPlanner] = useState(true) 
  const [isChatPanelVisible, setIsChatPanelVisible] = useState(false);
  const [isNotificationPanelVisible, setIsNotificationPanelVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(0);
  const [notificationCount,setNotificationCount] = useState(0)

  return (
    <ProjectContexts.Provider value={{ currentboard, setcurrentboard,isChatPanelVisible,isNotificationPanelVisible, setIsNotificationPanelVisible, setIsChatPanelVisible,isProjectPlanner,setisProjectPlanner, isDarkMode, setIsDarkMode,notificationCount,setNotificationCount }}>
      {children}
    </ProjectContexts.Provider>
  );
};

export const useProjectContexts = () => useContext(ProjectContexts);
