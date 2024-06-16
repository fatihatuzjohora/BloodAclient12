import { Navigate } from 'react-router-dom'

import useRole from '../hook/useRole'
import PropTypes from 'prop-types'
const AdminRoute = ({ children }) => {
  const [data] = useRole()
const role = data.role;


  if (role === 'admin') return children
  return <Navigate to='/dashboard' />
}

export default AdminRoute

AdminRoute.propTypes = {
  children: PropTypes.element,
}