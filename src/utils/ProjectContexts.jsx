/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react';

const ProjectContexts = createContext();

// eslint-disable-next-line react/prop-types
export const ProjectContextsProvider = ({ children }) => {
  const [currentboard, setcurrentboard] = useState([]);
  const [iscurrentboardScrum,setiscurrentboardScrum] = useState(null) 
  const [isRightPanelVisible, setIsRightPanelVisible] = useState(false);

  const toggleRightPanel = () => {
    setIsRightPanelVisible((prev) => !prev);
  };
  return (
    <ProjectContexts.Provider value={{ currentboard, setcurrentboard,isRightPanelVisible,toggleRightPanel,iscurrentboardScrum,setiscurrentboardScrum }}>
      {children}
    </ProjectContexts.Provider>
  );
};

export const useProjectContexts = () => useContext(ProjectContexts);
