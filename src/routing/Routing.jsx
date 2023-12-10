/* eslint-disable react/prop-types */
import { Route, Routes } from "react-router";
import Dashboard from "../components/dashboard/Dashboard";
import TaskDetails from "../components/tasks/TaskDetails/TaskDetails";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import CreateGroup from "../components/layout/groups/CreateGroup";
import Navbar from "../components/layout/Navbar";
import { useState } from "react";

import AddMemberInGroup from "../components/layout/groups/addMemberInGroup";
import SignedOutNavbar from "../components/layout/SignedOutNavbar";

import { ErrorBoundary } from "react-error-boundary";
import CreateTask from "../components/tasks/createTask/CreateTask";
import Tesct from "../components/Test/Tesct";
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
              currentGroup.length !== 0  ? <Dashboard currentGroup={currentGroup} /> : <></>
            }
          />

          <Route path="/task/:id" element={curuser ? <TaskDetails currentGroup={currentGroup} /> : <></>} />
          <Route
            path="/create-task"
            element={
              user && currentGroup.length !== 0 ? 
                <CreateTask currentGroup={currentGroup} />
               : <></>
            }
          />
          <Route
            path="/create-group"
            element={
              user ? <CreateGroup setcurrentGroup={setcurrentGroup} /> : <></>
            }
          />
                    <Route
            path="/abc"
            element={
             <Tesct/>
            }
          />
          <Route
            path="/add-member"
            element={
              currentGroup.length !== 0  ? (
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
