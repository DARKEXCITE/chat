import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'

import { trySignIn } from '../redux/reducers/auth'

const Startup = (props) => {
  const dispatch = useDispatch()
  const token = useSelector((s) => s.auth.token)

  useEffect(() => {
    if (token) {
      dispatch(trySignIn())
    }
  }, [dispatch, token])

  return props.children
}

Startup.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
}

export default Startup
