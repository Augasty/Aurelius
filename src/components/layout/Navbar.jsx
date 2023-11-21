/* eslint-disable react/prop-types */

import { Link } from 'react-router-dom';
import './Navbar.css'; // Import your CSS file
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';

const Navbar = ({auth,profile}) => {
  // const links = auth?.uid ? <SignedInLinks profile={profile} /> : <SignedOutLinks />;
  const links =  <SignedInLinks profile={profile} />
  return (
    <nav className="nav-wrapper">
      <div className="container">
        <Link to='/' className="brand-logo">Planify</Link>
        {links}
      </div>
    </nav>
  );
};

export default Navbar;