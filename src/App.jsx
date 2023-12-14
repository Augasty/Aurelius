
import Routing from "./routing/Routing"
import './App.css'
import { GroupAndChatToggleProvider } from "./components/layout/navbar/GroupAndChatToggleContext"

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
