export default {
  connected: (data) => {
    return {
      type: 'SOCKET_CONNECTED',
      data
    }
  },
  message: (data) => {
    return JSON.parse(data)
  },
  disconnected: (data) => ({
    type: 'SOCKET_DISCONNECTED',
    data
  })
}
