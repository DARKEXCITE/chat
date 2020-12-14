import Cookies from 'universal-cookie'
import { history } from ".."

const UPDATE_LOGIN = 'UPDATE_LOGIN'
const UPDATE_PASSWORD = 'UPDATE_PASSWORD'
const LOGIN = 'LOGIN'

const cookies = new Cookies()
const initialState = {
  email: '',
  password: '',
  token: cookies.get('token'),
  user: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PASSWORD:
      return {
        ...state,
        password: action.password
      }

    case UPDATE_LOGIN:
      return {
        ...state,
        email: action.email
      }

    case LOGIN:
      return {
        ...state,
        token: action.token,
        password: '',
        user: action.user
      }

    default:
      return state
  }
}

export function updatePassword(password) {
  return { type: UPDATE_PASSWORD, password }
}

export function updateLogin(email) {
  return { type: UPDATE_LOGIN, email }
}

export function signIn() {
  return (dispatch, getState) => {
    const state = getState()
    const { email, password } = state.auth

    fetch('/api/v1/auth', {
      method: 'POST',
      body: JSON.stringify({
        email, password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(r => r.json())
      .then(data => {
        dispatch({
          type: LOGIN,
          token: data.token,
          user: data.user
        })
        history.push('/')
      })
  }
}

export function tryGetUserInfo() {
  return () => {
    fetch('/api/v1/user/info')
      .then(r => r.json())
      .then(data => {
        console.log(data);
      })
  }
}

export function trySignIn() {
  return (dispatch) => {
    fetch('/api/v1/test/auth')
      .then(r => r.json())
      .then(data => {
        dispatch({
          type: LOGIN,
          token: data.token,
          user: data.user
        })
        history.push('/')
      })
  }
}
