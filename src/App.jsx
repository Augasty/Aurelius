
import Routing from "./routing/Routing"
import './App.css'
import { ProjectContextsProvider } from "./utils/ProjectContexts"

function App() {

  return (
    <>
     <ProjectContextsProvider>

    <Routing/>
     </ProjectContextsProvider>
    </>
  )
}

export default App
