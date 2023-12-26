/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react';

const GroupAndChatToggleContext = createContext();

// eslint-disable-next-line react/prop-types
export const GroupAndChatToggleProvider = ({ children }) => {
  const [currentGroup, setcurrentGroup] = useState([]);
  const [isCurrentGroupScrum,setisCurrentGroupScrum] = useState(null) 
  const [isRightPanelVisible, setIsRightPanelVisible] = useState(false);

  const toggleRightPanel = () => {
    setIsRightPanelVisible((prev) => !prev);
  };
  return (
    <GroupAndChatToggleContext.Provider value={{ currentGroup, setcurrentGroup,isRightPanelVisible,toggleRightPanel,isCurrentGroupScrum,setisCurrentGroupScrum }}>
      {children}
    </GroupAndChatToggleContext.Provider>
  );
};

export const useGroupAndChatToggleContext = () => useContext(GroupAndChatToggleContext);
