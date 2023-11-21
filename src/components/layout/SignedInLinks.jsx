/* eslint-disable react/prop-types */

import { NavLink } from 'react-router-dom';


const SignedInLinks = (props) => {
  return (
    <div>
      <ul className="right">
        <li><NavLink to='/create'>New Project</NavLink></li>
        <li><a onClick={props.signOut}>Log Out</a></li>
        <li>
          <NavLink to='/' className="btn btn-floating pink lighten-1">
            {props?.profile?.initials}
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default SignedInLinks;