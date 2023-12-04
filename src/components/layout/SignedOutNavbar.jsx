import { Link, NavLink } from "react-router-dom";
import "./Navbar.css"; // Import your CSS file
import { signInWithGoogle } from "../../utils/singInWithGoogle";

const SignedOutNavbar = () => {
  return (
    <nav>
      <div>
        <Link to="/">Planetask</Link>
        <div>
          <ul>
            <li onClick={signInWithGoogle} className="login">
              Login with Google
            </li>
            <li>
              <NavLink to="/" className="profile">
                <img alt="User" />
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default SignedOutNavbar;
