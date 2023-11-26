import { NavLink } from 'react-router-dom'

const SignedOutLinks = () => {
  return (
    <div>
      <ul className="right">
        <li><NavLink to='/signin'>Login with google</NavLink></li>
      </ul>
    </div>
  )
}

export default SignedOutLinks