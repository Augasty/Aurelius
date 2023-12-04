import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css"; // Import your CSS file
import { signInWithGoogle } from "../../utils/singInWithGoogle";
import topchicken from "../../../assets/topchicken.jpg"


const SignedOutNavbar = () => {


  // going to homepage when logging in
  const history = useNavigate();
  const handleSignIn = () =>{
    signInWithGoogle()
    history('/')
    // console.log('to the home')

  }
  return (
    <nav>
      <div>
        <Link to="/">Planetask</Link>
        <div>
          <ul>
            <li onClick={handleSignIn} className="login">
              Login with Google
            </li>
            <li>
              <NavLink to="/" className="profile">
                <img src={topchicken} alt="User" />
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default SignedOutNavbar;
