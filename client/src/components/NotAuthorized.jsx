import { Link } from 'react-router-dom'

const NotAuthorized = () => {
  return (
    <h3 className="text-center p-4">
      🔐 <Link to="/login">Login</Link> or <Link to="/signup">Signup</Link> to see this!
    </h3>
  )
}

export default NotAuthorized
