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
  RightPanel,
} from "./LazyLoad";

import CloudTaskTriggers from "../utils/CloudTaskTriggers";
import CloudBoardTriggers from "../utils/CloudBoardTriggers";
import { useProjectContexts } from "../utils/ProjectContexts";

const ErrorFallback = ({ error, resetErrorBoundary }) => (
  <div>
    <h2>Something went wrong:</h2>
    <pre>{error.message}</pre>
    <button onClick={resetErrorBoundary}>Try Again</button>
  </div>
);

const Routing = () => {
  const [user] = useAuthState(auth);
  const curuser = auth.currentUser;
  const { currentboard, isRightPanelVisible } = useProjectContexts();

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <>
        {currentboard.length !== 0 && <CloudTaskTriggers />}
        {user ? (
          <>
            <CloudBoardTriggers />
            <Navbar />
            {isRightPanelVisible && <RightPanel />}
          </>
        ) : (
          <SignedOutNavbar />
        )}
        <Routes>
          <Route
            path="/"
            element={currentboard.length !== 0 ? <Dashboard /> : <></>}
          />

          <Route path="/task/:id" element={curuser ? <TaskDetails /> : <></>} />
          <Route
            path="/create-task"
            element={user && currentboard.length !== 0 ? <CreateTask /> : <></>}
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
      </>
    </ErrorBoundary>
  );
};

export default Routing;
