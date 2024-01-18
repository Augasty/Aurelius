/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react';

const ProjectContexts = createContext();

// eslint-disable-next-line react/prop-types
export const ProjectContextsProvider = ({ children }) => {
  const [currentboard, setcurrentboard] = useState([]);
  const [isProjectPlanner,setisProjectPlanner] = useState(null) 
  const [isChatPanelVisible, setIsChatPanelVisible] = useState(false);


  return (
    <ProjectContexts.Provider value={{ currentboard, setcurrentboard,isChatPanelVisible,setIsChatPanelVisible,isProjectPlanner,setisProjectPlanner }}>
      {children}
    </ProjectContexts.Provider>
  );
};

export const useProjectContexts = () => useContext(ProjectContexts);
