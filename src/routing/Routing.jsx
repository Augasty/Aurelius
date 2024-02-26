/* eslint-disable react/prop-types */
import { Route, Routes } from 'react-router';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { ErrorBoundary } from 'react-error-boundary';
import {
  AddMemberInBoard,
  CreateBoard,
  CreateTask,
  Dashboard,
  TaskList,
  Navbar,
  SignedOutHomePage,
  Notification,
  TaskDetails,
  ChatPanel,
  CreateStory,
} from './LazyLoad';
import styles from "./Routing.module.css"
import CloudTaskTriggers from '../utils/CloudTaskTriggers';
import CloudBoardTriggers from '../utils/CloudBoardTriggers';
import { useProjectContexts } from '../utils/ProjectContexts';
import { useEffect } from 'react';
import CloudStoryTriggers from '../utils/CloudStoryTriggers';
import CloudNotificationTriggers from '../utils/CloudNotificationTriggers';

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  // useEffect to trigger resetErrorBoundary once when the component mounts
  // to avoid the error when we logout from task change screen
  useEffect(() => {
    resetErrorBoundary();
  }, [resetErrorBoundary]);

  return (
    <div>
      <h2>Something went wrong:</h2>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try Again</button>
    </div>
  );
};

const Routing = () => {
  const [user] = useAuthState(auth);
  const { currentboard,isNotificationPanelVisible, isChatPanelVisible, isProjectPlanner, isDarkMode } = useProjectContexts();

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div data-theme={isDarkMode ? 'dark' : ''} className={styles.Container}>
        

      {user && (
          <>
            {currentboard.length !== 0 && isProjectPlanner && <CloudStoryTriggers />}
            {currentboard.length !== 0 && <CloudTaskTriggers />}
            <CloudNotificationTriggers />
            <CloudBoardTriggers />
            
          </>)}
            
            {user && <Navbar />}
            {user ? (
            <>
            <div>

            <Routes>
              <Route path="/" element={currentboard.length !== 0 ? <Dashboard /> : <></>} />

              <Route path="/task/:id" element={<TaskDetails />} />

              {isProjectPlanner && <Route path="story/task-list" element={<TaskList />} />}
              <Route
                path={isProjectPlanner ? '/story/create-task' : '/create-task'}
                element={currentboard.length !== 0 ? <CreateTask /> : <></>}
              />
              <Route path="/create-story" element={currentboard.length !== 0 ? <CreateStory /> : <></>} />
              <Route path="/create-board" element={<CreateBoard />} />
              <Route path="/notification" element={<Notification />} />
              <Route path="/add-member" element={currentboard.length !== 0 ? <AddMemberInBoard /> : <></>} />
            </Routes>
            </div>
            {isNotificationPanelVisible && <Notification />}
            {currentboard.length !== 0 && isChatPanelVisible && <ChatPanel />}
          </>
        ) : (
          <SignedOutHomePage />
        )}
      </div>
    </ErrorBoundary>
  );
};

export default Routing;
