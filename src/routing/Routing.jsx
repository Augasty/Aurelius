/* eslint-disable react/prop-types */
import { Route, Routes } from "react-router";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { ErrorBoundary } from "react-error-boundary";
import {
  AddMemberInGroup,
  CreateGroup,
  CreateTask,
  Dashboard,
  Navbar,
  SignedOutNavbar,
  TaskDetails,
} from "./LazyLoad";

// need to lazy
import RightPanel from "../components/chat-system/RightPanel";
import CloudTaskTriggers from "../components/dashboard/CloudTaskTriggers";
import { useGroupAndChatToggleContext } from "../components/layout/navbar/GroupAndChatToggleContext";
import CloudGroupTriggers from "../components/dashboard/CloudGroupTriggers";
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
          <CloudGroupTriggers/>
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
            element={currentGroup.length !== 0 ? <AddMemberInGroup /> : <></>}
          />
        </Routes>
      </>
    </ErrorBoundary>
  );
};

export default Routing;
