import Cookies from 'universal-cookie'
import { history, getSocket } from '..'

const UPDATE_LOGIN = 'UPDATE_LOGIN'
const UPDATE_PASSWORD = 'UPDATE_PASSWORD'
const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'

const cookies = new Cookies()
const initialState = {
  email: '',
  password: '',
  token: cookies.get('token'),
  user: {}
}

const sideEffects = {
  [LOGOUT]: () => {
    cookies.remove('token')
    document.location.href = '/login'
  }
}

export default (state = initialState, action) => {
  if (typeof sideEffects[action.type] !== 'undefined') {
    sideEffects[action.type]()
  }

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
        email,
        password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((r) => r.json())
      .then((data) => {
        getSocket().send(
          JSON.stringify({
            type: 'WELCOME',
            token: data.token,
            userInfo: data.user
          })
        )
        dispatch({
          type: LOGIN,
          token: data.token,
          user: data.user
        })
        history.push('/')
      })
  }
}

export function trySignIn() {
  return (dispatch) => {
    fetch('/api/v1/test/auth')
      .then((r) => r.json())
      .then((data) => {
        setTimeout(() => {
          getSocket().send(
            JSON.stringify({
              type: 'WELCOME',
              token: data.token,
              user: data.user
            })
          )
        }, 1000)

        dispatch({
          type: LOGIN,
          token: data.token,
          user: data.user
        })
        history.push('/')
      })
  }
}
