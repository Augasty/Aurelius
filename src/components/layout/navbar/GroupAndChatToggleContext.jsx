import { createContext, useContext, useState } from 'react';

const GroupAndChatToggleContext = createContext();

export const GroupAndChatToggleProvider = ({ children }) => {
  const [currentGroup, setcurrentGroup] = useState([]);
  const [isRightPanelVisible, setIsRightPanelVisible] = useState(false);

  const toggleRightPanel = () => {
    setIsRightPanelVisible((prev) => !prev);
  };
  return (
    <GroupAndChatToggleContext.Provider value={{ currentGroup, setcurrentGroup,isRightPanelVisible,toggleRightPanel }}>
      {children}
    </GroupAndChatToggleContext.Provider>
  );
};

export const useGroupAndChatToggleContext = () => useContext(GroupAndChatToggleContext);
