import Navbar from "./components/layout/Navbar"
import './App.css'
import Routing from "./routing/Routing"
import { auth } from "./firebase";
import { useEffect } from "react"

function App() {
  // const [user] = useAuthState(auth);
  // const user = auth.currentUser;

  // useEffect(() => {

  //   console.log(user?.displayName)
  // }, [user])
  return (
    <>
    <Navbar/>
    <Routing/>
    </>
  )
}

export default App
