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
const Routing = () => {
  const [user] = useAuthState(auth);
  // keep the groups here
  const curuser = auth.currentUser;
  
  const mygroups = useSelector((state) => state);
  console.log(mygroups)


  const [group, setGroup] = useState(null);

  // DROPDOWN COMPONENT
  const [groupsObject, setGroupsObject] = useState({})
  useEffect(() => {

    const storedValue = JSON.parse(localStorage.getItem(curuser?.uid));
    setGroup(storedValue);
  }, [curuser]);
  // useEffect to update localStorage when the state changes
  useEffect(() => {
    localStorage.setItem(curuser?.uid, JSON.stringify(group));

  }, [curuser, group]);


  return (
    <div>
    <Navbar group={group} setGroupsObject={setGroupsObject} groupsObject={groupsObject}/>
      <Routes>
        <Route path="/" element={<Dashboard projects={fakeProjects} />} />

        <Route
          path="/project/:id"
          element={curuser ? <ProjectDetails /> : <></>}
        />
        <Route path="/create-project" element={user ? <CreateProject /> : <></>} />
        <Route path="/create-group" element={user ? <CreateGroup setGroup={setGroup} 
        groupsObject={groupsObject}
        setGroupsObject={setGroupsObject}/> : <></>} />
      </Routes>
    </div>
  );
};

export default Routing;
