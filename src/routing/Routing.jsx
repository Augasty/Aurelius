/* eslint-disable react/prop-types */
import { Route, Routes } from "react-router";
import Dashboard from "../components/dashboard/Dashboard";
import fakeProjects from "../components/fakeProjects";
import ProjectDetails from "../components/projects/ProjectDetails/ProjectDetails";
import CreateProject from "../components/projects/createProject/CreateProject";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import CreateGroup from "../components/layout/groups/CreateGroup";
import Navbar from "../components/layout/Navbar";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AddMemberInGroup from "../components/layout/groups/addMemberInGroup";
import SignedOutNavbar from "../components/layout/SignedOutNavbar";

import { ErrorBoundary } from "react-error-boundary"


const ErrorFallback = ({ error, resetErrorBoundary }) => (
  <div>
    <h2>Something went wrong:</h2>
    <pre>{error.message}</pre>
    <button onClick={resetErrorBoundary}>Try Again</button>
  </div>
);













const Routing = () => {
  const [user] = useAuthState(auth);

  const user_groups_from_redux = useSelector((state) => state.groups);










  // keep the groups here
  const curuser = auth.currentUser;

  const [currentGroup, setcurrentGroup] = useState('');

  // DROPDOWN COMPONENT

  // useEffect to update localStorage whenever the state changes[when group is changed, or new group is created]
  // don't touch the current group code
  useEffect(() => {
    // this try block is for avoiding error while loading a user with empty grouplist
    try{

      const storedValue = JSON.parse(localStorage.getItem(curuser?.uid || ''));
      if(!storedValue && curuser && user_groups_from_redux){
        try{
  
          const firstPair = Object.entries(user_groups_from_redux)[0];
          const firstPairString = firstPair?.join(',');
          localStorage.setItem(curuser?.uid, JSON.stringify(firstPairString));
        }catch(e){
          console.error('error while loading past group',e)
        }
        // console.log('value from firabse fetched and stored in localstorage',storedValue,firstPair)
      }
      setcurrentGroup(storedValue);
    }catch(e){
      console.log('cant load groups, so, blank',e)
    }

    // if there is nothing in localstorage, even after logging in
    // see if anything is present in redux_store, and fetch the first item


  }, [curuser,user_groups_from_redux]);



  useEffect(() => {
    localStorage.setItem(curuser?.uid, JSON.stringify(currentGroup));

  }, [curuser, currentGroup]);


  return (

    <ErrorBoundary FallbackComponent={ErrorFallback}>
    <div>
    {user?<Navbar currentGroup={currentGroup} setcurrentGroup={setcurrentGroup}/>:<SignedOutNavbar/>}
      <Routes>
        <Route path="/" element={currentGroup? <Dashboard currentGroup={currentGroup} />:<></>} />

        <Route
          path="/project/:id"
          element={curuser ? <ProjectDetails /> : <></>}
        />
        <Route path="/create-project" element={user && currentGroup ? <CreateProject currentGroup={currentGroup}/> : <></>} />
        <Route path="/create-group" element={user ? <CreateGroup setcurrentGroup={setcurrentGroup}/> : <></>} />
        <Route path="/add-member" element={currentGroup ?<AddMemberInGroup currentGroup={currentGroup}/>:<></>}/>
      </Routes>
    </div>

    </ErrorBoundary>
  );
};

export default Routing;
