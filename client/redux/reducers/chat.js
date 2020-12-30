const UPDATE_MESSAGE = 'UPDATE_MESSAGE'
const UPDATE_MESSAGES = 'UPDATE_MESSAGES'

const initialState = {
  message: '',
  messages: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_MESSAGE:
      return {
        ...state,
        message: action.message
      }

    case UPDATE_MESSAGES:
      return {
        ...state,
        messages: [...state.messages, { message: action.message, email: action.email }]
      }

    default:
      return state
  }
}

export function updateMessage(message) {
  return { type: UPDATE_MESSAGE, message }
}

export function sendMessage() {
  return (dispatch, getState) => {
    const state = getState()
    const { message } = state.chat
    const email = state.auth.user.email[0]

    fetch('/api/v1/message', {
      method: 'POST',
      body: JSON.stringify({
        message,
        email
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}
