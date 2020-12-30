import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import auth from './auth'
import register from './register'
import chat from './chat'
import online from './online'

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    auth,
    register,
    chat,
    online
  })

export default createRootReducer
