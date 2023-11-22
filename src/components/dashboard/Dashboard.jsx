// Dashboard.js
import ProjectList from "../projects/ProjectList";
import Notifications from "./Notifications";
import "./Dashboard.css";
import { getAllProjects } from "../projects/ProjectSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const Dashboard = () => {
  //   if (!auth.uid) return <Redirect to='/signin' />;
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects);

  useEffect(() => {
    // Fetch all projects when the component mounts
    dispatch(getAllProjects());
  }, [dispatch]);
  // console.log(projects);
  return (
    <div className="dashboard container">
      <div className="row">
        <div className="col s12 m6">
          <ProjectList projects={projects} />
        </div>
        <div className="col s12 m5 offset-m1">
          {/* <Notifications notifications={notifications} /> */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
