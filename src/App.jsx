import Navbar from "./components/layout/Navbar"
import './App.css'
import Dashboard from "./components/dashboard/Dashboard"
import fakeProjects from './components/fakeProjects'

function App() {

  return (
    <>
      <Navbar/>
      <Dashboard projects={fakeProjects}/>
    </>
  )
}

export default App
