import { history } from '../index'

const UPDATE_REGISTER_LOGIN = 'UPDATE_REGISTER_LOGIN'
const UPDATE_REGISTER_PASSWORD = 'UPDATE_REGISTER_PASSWORD'
const UPDATE_MESSAGE = 'UPDATE_MESSAGE'
const REGISTER = 'REGISTER'

const initialState = {
  email: '',
  password: '',
  message: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_REGISTER_PASSWORD:
      return {
        ...state,
        password: action.password
      }

    case UPDATE_REGISTER_LOGIN:
      return {
        ...state,
        email: action.email
      }

    case UPDATE_MESSAGE:
      return {
        ...state,
        message: action.message
      }

    case REGISTER:
      return {
        ...state,
        password: '',
        email: '',
        message: ''
      }

    default:
      return state
  }
}

export function updateRegisterPassword(password) {
  return { type: UPDATE_REGISTER_PASSWORD, password }
}

export function updateRegisterLogin(email) {
  return { type: UPDATE_REGISTER_LOGIN, email }
}

export function signUp() {
  return async (dispatch, getState) => {
    const state = getState()
    const { email, password } = state.register

    await fetch('/api/v1/register', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((r) => r.json())
      .then(() => {
        dispatch({ type: REGISTER })
        history.push('/login')
      })
      .catch((err) => {
        dispatch({ type: UPDATE_MESSAGE, message: err })
      })
  }
}
