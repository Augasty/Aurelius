/* eslint-disable react/prop-types */
import { Route, Routes } from "react-router";

import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import { useState } from "react";

import { ErrorBoundary } from "react-error-boundary";
import {
  AddMemberInGroup,
  CreateGroup,
  CreateTask,
  Dashboard,
  Navbar,
  SignedOutNavbar,
  TaskDetails,
  Tesct,
} from "./LazyLoad";

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

  const [currentGroup, setcurrentGroup] = useState([]);

  // console.log(currentGroup,currentGroup.length!==0)
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <>
        {user ? (
          <Navbar
            currentGroup={currentGroup}
            setcurrentGroup={setcurrentGroup}
          />
        ) : (
          <SignedOutNavbar />
        )}
        <Routes>
          <Route
            path="/"
            element={
              currentGroup.length !== 0 ? (
                <Dashboard currentGroup={currentGroup} />
              ) : (
                <></>
              )
            }
          />

          <Route
            path="/task/:id"
            element={
              curuser ? <TaskDetails currentGroup={currentGroup} /> : <></>
            }
          />
          <Route
            path="/create-task"
            element={
              user && currentGroup.length !== 0 ? (
                <CreateTask currentGroup={currentGroup} />
              ) : (
                <></>
              )
            }
          />
          <Route
            path="/create-group"
            element={
              user ? <CreateGroup setcurrentGroup={setcurrentGroup} /> : <></>
            }
          />

          {/* testing the locking here */}
          <Route path="/abc" element={<Tesct />} />
          <Route
            path="/add-member"
            element={
              currentGroup.length !== 0 ? (
                <AddMemberInGroup currentGroup={currentGroup} />
              ) : (
                <></>
              )
            }
          />
        </Routes>
      </>
    </ErrorBoundary>
  );
};

export default Routing;
