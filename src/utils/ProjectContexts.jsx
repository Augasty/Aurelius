/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react';

const ProjectContexts = createContext();

// eslint-disable-next-line react/prop-types
export const ProjectContextsProvider = ({ children }) => {
  const [currentBoard, setcurrentBoard] = useState([]);
  const [isCurrentBoardScrum,setisCurrentBoardScrum] = useState(null) 
  const [isRightPanelVisible, setIsRightPanelVisible] = useState(false);

  const toggleRightPanel = () => {
    setIsRightPanelVisible((prev) => !prev);
  };
  return (
    <ProjectContexts.Provider value={{ currentBoard, setcurrentBoard,isRightPanelVisible,toggleRightPanel,isCurrentBoardScrum,setisCurrentBoardScrum }}>
      {children}
    </ProjectContexts.Provider>
  );
};

export const useProjectContexts = () => useContext(ProjectContexts);
