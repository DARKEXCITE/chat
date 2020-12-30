import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import auth from './auth'
import register from './register'
import chat from './chat'

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    auth,
    register,
    chat
  })

export default createRootReducer
