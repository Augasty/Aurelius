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
const Routing = () => {
  const [user] = useAuthState(auth);

  const user_groups_from_redux = useSelector((state) => state.groups);










  // keep the groups here
  const curuser = auth.currentUser;

  const [currentGroup, setcurrentGroup] = useState(null);

  // DROPDOWN COMPONENT

  // useEffect to update localStorage whenever the state changes[when group is changed, or new group is created]
  // don't touch the current group code
  useEffect(() => {
    const storedValue = JSON.parse(localStorage.getItem(curuser?.uid));

    // if there is nothing in localstorage, even after logging in
    // see if anything is present in redux_store, and fetch the first item
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
  }, [curuser,user_groups_from_redux]);



  useEffect(() => {
    localStorage.setItem(curuser?.uid, JSON.stringify(currentGroup));

  }, [curuser, currentGroup]);


  return (
    <div>
    {user?<Navbar currentGroup={currentGroup} setcurrentGroup={setcurrentGroup}/>:<SignedOutNavbar/>}
      <Routes>
        <Route path="/" element={user? <Dashboard projects={fakeProjects} />:<></>} />

        <Route
          path="/project/:id"
          element={curuser ? <ProjectDetails /> : <></>}
        />
        <Route path="/create-project" element={user ? <CreateProject /> : <></>} />
        <Route path="/create-group" element={user ? <CreateGroup setcurrentGroup={setcurrentGroup}/> : <></>} />
        <Route path="/add-member" element={currentGroup ?<AddMemberInGroup currentGroup={currentGroup}/>:<></>}/>
      </Routes>
    </div>
  );
};

export default Routing;
