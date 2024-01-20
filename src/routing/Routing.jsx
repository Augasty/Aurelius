/* eslint-disable react/prop-types */
import { Route, Routes } from "react-router";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { ErrorBoundary } from "react-error-boundary";
import {
  AddMemberInBoard,
  CreateBoard,
  CreateTask,
  Dashboard,
  Navbar,
  SignedOutNavbar,
  TaskDetails,
  ChatPanel,
  CreateStory,
} from "./LazyLoad";

import CloudTaskTriggers from "../utils/CloudTaskTriggers";
import CloudBoardTriggers from "../utils/CloudBoardTriggers";
import { useProjectContexts } from "../utils/ProjectContexts";
import { useEffect } from "react";
import CloudStoryTriggers from "../utils/CloudStoryTriggers";
import TaskList from "../components/tasks/TaskList/TaskList";

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
  const { currentboard, isChatPanelVisible, isProjectPlanner,isDarkMode } =
    useProjectContexts();

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div data-theme={isDarkMode?'dark':''}  style={{background:"var(--bg-color)",height:"100vh"}}>
        {user ? (
          <>
            {currentboard.length !== 0 && isProjectPlanner && (
              <CloudStoryTriggers />
            )}
            {currentboard.length !== 0 && <CloudTaskTriggers />}
            <CloudBoardTriggers />
            <Navbar />
            {isChatPanelVisible && <ChatPanel />}
          </>
        ) : (
          <SignedOutNavbar />
        )}
        <Routes>
          <Route
            path="/"
            element={currentboard.length !== 0 ? <Dashboard /> : <></>}
          />

          {user ? (
            <Route path="/task/:id" element={<TaskDetails />} />
          ) : (
            <>Login</>
          )}

          {user && isProjectPlanner && (
            <Route path="story/task-list" element={<TaskList />} />
          ) }
          <Route
            path={isProjectPlanner? "/story/create-task" : "/create-task" }
            element={user && currentboard.length !== 0 ? <CreateTask /> : <></>}
          />
          <Route
            path="/create-story"
            element={
              user && currentboard.length !== 0 ? <CreateStory /> : <></>
            }
          />
          <Route
            path="/create-board"
            element={user ? <CreateBoard /> : <></>}
          />
          <Route
            path="/add-member"
            element={currentboard.length !== 0 ? <AddMemberInBoard /> : <></>}
          />
        </Routes>
      </div>
    </ErrorBoundary>
  );
};

export default Routing;
