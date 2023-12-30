/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react';

const ProjectContexts = createContext();

// eslint-disable-next-line react/prop-types
export const ProjectContextsProvider = ({ children }) => {
  const [currentboard, setcurrentboard] = useState([]);
  const [isProjectPlanner,setisProjectPlanner] = useState(null) 
  const [isRightPanelVisible, setIsRightPanelVisible] = useState(false);

  return (
    <ProjectContexts.Provider value={{ currentboard, setcurrentboard,isRightPanelVisible,setIsRightPanelVisible,isProjectPlanner,setisProjectPlanner }}>
      {children}
    </ProjectContexts.Provider>
  );
};

export const useProjectContexts = () => useContext(ProjectContexts);
