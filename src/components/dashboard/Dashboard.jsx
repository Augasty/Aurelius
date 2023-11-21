// Dashboard.js
import ProjectList from '../projects/ProjectList';
import Notifications from './Notifications';
import './Dashboard.css';

const Dashboard = ({ projects
    // , notifications 
}) => {
//   if (!auth.uid) return <Redirect to='/signin' />;

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
