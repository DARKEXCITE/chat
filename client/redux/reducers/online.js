import axios from 'axios'

const UPDATE_ONLINE_USERS = 'UPDATE_ONLINE_USERS'

const initialState = {
  users: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_ONLINE_USERS:
      return {
        ...state,
        users: action.users
      }

    default:
      return state
  }
}

export function getOnlineUsers() {
  return (dispatch) => {
    fetch('/api/v1/admin/users')
      .then((r) => r.json())
      .then((data) => {
        return dispatch({
          type: UPDATE_ONLINE_USERS,
          users: data.users
        })
      })
  }
}

export function logoutSingleUser(id) {
  return (dispatch) => {
    axios.post('/api/v1/admin/user/logout', { id }).then(({ data }) => {
      return dispatch({
        type: UPDATE_ONLINE_USERS,
        users: data.newOnlineUsers
      })
    })
  }
}
