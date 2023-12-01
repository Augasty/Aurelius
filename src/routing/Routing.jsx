import { Route, Routes } from "react-router";
import Dashboard from "../components/dashboard/Dashboard";
import fakeProjects from "../components/fakeProjects";
import ProjectDetails from "../components/projects/ProjectDetails/ProjectDetails";
import CreateProject from "../components/projects/createProject/CreateProject";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import CreateGroup from "../components/layout/groups/CreateGroup";
const Routing = () => {
  const [user] = useAuthState(auth);
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard projects={fakeProjects} />} />

        <Route
          path="/project/:id"
          element={user ? <ProjectDetails /> : <></>}
        />
        <Route path="/create-project" element={user ? <CreateProject /> : <></>} />
        <Route path="/create-group" element={user ? <CreateGroup /> : <></>} />
      </Routes>
    </div>
  );
};

export default Routing;
