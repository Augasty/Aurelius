
import Routing from "./routing/Routing"
import './App.css'
import { GroupAndChatToggleProvider } from "./utils/GroupAndChatToggleContext"

function App() {

  return (
    <>
     <GroupAndChatToggleProvider>

    <Routing/>
     </GroupAndChatToggleProvider>
    </>
  )
}

export default App
