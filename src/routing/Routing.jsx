/* eslint-disable react/prop-types */
import { Route, Routes } from "react-router";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { ErrorBoundary } from "react-error-boundary";
import {
  AddMemberInBoard,
  CreateGroup,
  CreateTask,
  Dashboard,
  Navbar,
  SignedOutNavbar,
  TaskDetails,
  RightPanel
} from "./LazyLoad";


import CloudTaskTriggers from "../utils/CloudTaskTriggers";
import CloudBoardTriggers from "../utils/CloudBoardTriggers";
import { useGroupAndChatToggleContext } from "../utils/GroupAndChatToggleContext";
import { useEffect } from "react";

const ErrorFallback = ({ error, resetErrorBoundary }) => (
  <div>
    <h2>Something went wrong:</h2>
    <pre>{error.message}</pre>
    <button onClick={resetErrorBoundary}>Try Again</button>
  </div>
);

const Routing = () => {
  useEffect(() => {
    console.log(auth.currentUser)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.currentUser])
  
  const [user] = useAuthState(auth);
  const curuser = auth.currentUser;
  const { currentGroup, isRightPanelVisible } = useGroupAndChatToggleContext();

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <>
        {currentGroup.length !== 0 && <CloudTaskTriggers />}
        {user ? (
          <>
          <CloudBoardTriggers/>
            <Navbar />
            {isRightPanelVisible && <RightPanel />}
          </>
        ) : (
          <SignedOutNavbar />
        )}
        <Routes>
          <Route
            path="/"
            element={currentGroup.length !== 0 ? <Dashboard /> : <></>}
          />

          <Route path="/task/:id" element={curuser ? <TaskDetails /> : <></>} />
          <Route
            path="/create-task"
            element={user && currentGroup.length !== 0 ? <CreateTask /> : <></>}
          />
          <Route
            path="/create-group"
            element={user ? <CreateGroup /> : <></>}
          />
          <Route
            path="/add-member"
            element={currentGroup.length !== 0 ? <AddMemberInBoard /> : <></>}
          />
        </Routes>
      </>
    </ErrorBoundary>
  );
};

export default Routing;
