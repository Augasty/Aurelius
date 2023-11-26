
import { Route, Routes } from 'react-router'
import Dashboard from '../components/dashboard/Dashboard'
import fakeProjects from '../components/fakeProjects'
import ProjectDetails from '../components/projects/ProjectDetails/ProjectDetails'
import CreateProject from '../components/projects/createProject/CreateProject'
import { SignIn } from '../components/auth/SignIn'
import { auth } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
const Routing = () => {
  const [user] = useAuthState(auth);
    return (
      <div>
        <Routes>
          <Route path='/' element={<Dashboard projects={fakeProjects}/>} />
          
          <Route path='/project/:id' element={user?<ProjectDetails/>:<></>} />
          <Route path='/create' element={user?<CreateProject/>:<></>} />
          <Route path='/signin' element={<SignIn/>}/>
        </Routes>
        </div>
    )
  }
  
  export default Routing