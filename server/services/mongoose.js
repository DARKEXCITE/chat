import mongoose from 'mongoose'

import config from '../config'

mongoose.connection.on('connected', () => {
  // eslint-disable-next-line no-console
  console.log('DB is connected')
})
mongoose.connection.on('error', (err) => {
  // eslint-disable-next-line no-console
  console.log(`DB is not connected, ${err}`)
  process.exit(1)
})

exports.connect = async (mongoURL = config.mongoURL) => {
  await mongoose.connect(mongoURL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  return mongoose.connection
}
