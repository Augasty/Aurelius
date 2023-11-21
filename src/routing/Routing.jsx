
import { Route, Routes } from 'react-router'
import Dashboard from '../components/dashboard/Dashboard'
import fakeProjects from '../components/fakeProjects'
import ProjectDetails from '../components/projects/ProjectDetails/ProjectDetails'
import CreateProject from '../components/projects/createProject/CreateProject'

const Routing = () => {
    return (
      <div>
        <Routes>
          <Route path='/' element={<Dashboard projects={fakeProjects}/>} />
          
          <Route path='/project/:id' element={<ProjectDetails/>} />
          <Route path='/create' element={<CreateProject/>} />
        </Routes>
        </div>
    )
  }
  
  export default Routing