import { Navigate } from 'react-router-dom'

import useRole from '../hook/useRole'
import PropTypes from 'prop-types'

const Volunteer = ({ children }) => {
  const [data] = useRole()
const role = data.role;

  if (role === 'volunteer' || role === 'admin') return children
  return <Navigate to='/dashboard' />
}

export default Volunteer

Volunteer.propTypes = {
  children: PropTypes.element,
}