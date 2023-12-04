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
const Routing = () => {
  const [user] = useAuthState(auth);

  const redux_groups = useSelector((state) => state.groups);










  // keep the groups here
  const curuser = auth.currentUser;

  const [group, setGroup] = useState(null);

  // DROPDOWN COMPONENT

  // useEffect to update localStorage whenever the state changes
  // works both, when group is changed or new group is created
  // don't touch the current group code
  useEffect(() => {
    const storedValue = JSON.parse(localStorage.getItem(curuser?.uid));

    // if there is nothing in localstorage, even after logging in
    // see if anything is present in redux_store, and fetch the first item
    if(!storedValue && curuser && redux_groups){
      try{

        const firstPair = Object.entries(redux_groups)[0];
        const firstPairString = firstPair?.join(',');
        localStorage.setItem(curuser?.uid, JSON.stringify(firstPairString));
      }catch(e){
        console.error('error while loading past group',e)
      }
      // console.log('value from firabse fetched and stored in localstorage',storedValue,firstPair)
    }
    setGroup(storedValue);
  }, [curuser,redux_groups]);



  useEffect(() => {
    localStorage.setItem(curuser?.uid, JSON.stringify(group));

  }, [curuser, group]);


  return (
    <div>
    <Navbar group={group} setGroup={setGroup}/>
      <Routes>
        <Route path="/" element={<Dashboard projects={fakeProjects} />} />

        <Route
          path="/project/:id"
          element={curuser ? <ProjectDetails /> : <></>}
        />
        <Route path="/create-project" element={user ? <CreateProject /> : <></>} />
        <Route path="/create-group" element={user ? <CreateGroup setGroup={setGroup}/> : <></>} />
        <Route path="/add-member" element={group ?<AddMemberInGroup group={group}/>:<></>}/>
      </Routes>
    </div>
  );
};

export default Routing;
