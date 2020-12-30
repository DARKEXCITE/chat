import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { getOnlineUsers, logoutSingleUser } from '../../redux/reducers/online'

const Admin = () => {
  const dispatch = useDispatch()
  const { users } = useSelector((s) => s.online)

  useEffect(() => {
    dispatch(getOnlineUsers())
  }, [dispatch])

  return (
    <div>
      <div>
        <Link to="/">Чат</Link>
      </div>

      {users.map((user) => {
        return (
          <div key={user._id}>
            {user.email}
            <button
              type="button"
              className="py-1 px-2 bg-red-600 rounded text-white ml-5"
              onClick={() => {
                dispatch(logoutSingleUser(user._id))
              }}
            >
              logout
            </button>
          </div>
        )
      })}
    </div>
  )
}

export default Admin
