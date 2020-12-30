import express from 'express'
import path from 'path'
import cors from 'cors'
import bodyParser from 'body-parser'
import sockjs from 'sockjs'
import { renderToStaticNodeStream } from 'react-dom/server'
import React from 'react'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import jwt from 'jsonwebtoken'

import mongooseService from './services/mongoose'
import passportJWT from './services/passport'
import User from './model/User.model'
import config from './config'
import Html from '../client/html'
import auth from './middleware/auth'

const Root = () => ''

mongooseService.connect()

try {
  // eslint-disable-next-line import/no-unresolved
  // ;(async () => {
  //   const items = await import('../dist/assets/js/root.bundle')
  //   console.log(JSON.stringify(items))

  //   Root = (props) => <items.Root {...props} />
  //   console.log(JSON.stringify(items.Root))
  // })()
  console.log(Root)
} catch (ex) {
  console.log(' run yarn build:prod to enable ssr')
}

let connections = []

const port = process.env.PORT || 8090
const server = express()

const middleware = [
  cors(),
  passport.initialize(),
  express.static(path.resolve(__dirname, '../dist/assets')),
  bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }),
  bodyParser.json({ limit: '50mb', extended: true }),
  cookieParser()
]

passport.use('jwt', passportJWT.jwt)

middleware.forEach((it) => server.use(it))

server.post('/api/v1/message', async (req, res) => {
  connections.forEach((c) => {
    c.write(
      JSON.stringify({ type: 'UPDATE_MESSAGES', message: req.body.message, email: req.body.email })
    )
  })
  res.json({ status: 200 })
})

server.post('/api/v1/auth', async (req, res) => {
  try {
    const user = await User.findAndValidateUser(req.body)
    const payload = { uid: user.id }
    const token = jwt.sign(payload, config.secret, { expiresIn: '48h' })
    delete user.password
    res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 48 })

    res.json({
      status: 200,
      token,
      user
    })
  } catch (err) {
    res.json({
      status: 203,
      err
    })
  }
})

server.post('/api/v1/register', async (req, res) => {
  const validate = await User.findOne({ email: req.body.email })

  if (validate) {
    res.status(400)
    res.json({
      status: 400,
      message: 'Данный email уже зарегестрирован'
    })
  }

  const user = await new User({
    email: req.body.email,
    password: req.body.password
  })
  await user.save()

  res.json({ status: 200 })
})

server.get('/api/v1/test/auth', async (req, res) => {
  try {
    const jwtUser = jwt.verify(req.cookies.token, config.secret)
    const user = await User.findById(jwtUser.uid)

    const payload = { uid: user.id }
    const token = jwt.sign(payload, config.secret, { expiresIn: '48h' })
    delete user.password

    res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 48 })
    res.json({ status: 200, token, user })
  } catch (err) {
    res.json({ status: 203, err })
  }
})

server.get('/api/v1/admin/logout', auth(['admin']), async (req, res) => {
  connections.forEach((c) => {
    c.write(JSON.stringify({ type: 'LOGOUT' }))
  })
  res.json({ status: 200 })
})

server.get('/api/v1/admin/users', auth(['admin']), async (req, res) => {
  connections.forEach((c) => {
    c.write(JSON.stringify({ type: 'PUSH_USER_INFO' }))
  })
  res.json({ status: 200 })
})

server.use('/api/', (req, res) => {
  res.status(404)
  res.end()
})

const [htmlStart, htmlEnd] = Html({
  body: 'separator',
  title: 'Skillcrucial - Become an IT HERO'
}).split('separator')

server.get('/', (req, res) => {
  const appStream = renderToStaticNodeStream(<Root location={req.url} context={{}} />)
  res.write(htmlStart)
  appStream.pipe(res, { end: false })
  appStream.on('end', () => {
    res.write(htmlEnd)
    res.end()
  })
})

server.get('/*', (req, res) => {
  const initialState = {
    location: req.url
  }

  return res.send(
    Html({
      body: '',
      initialState
    })
  )
})

const app = server.listen(port)

if (config.isSocketsEnabled) {
  const echo = sockjs.createServer()
  echo.on('connection', (conn) => {
    connections.push(conn)

    conn.on('data', async (message) => {
      const data = JSON.parse(message)

      if (data.type === 'WELCOME') {
        conn.token = data.token
      }
    })

    conn.on('close', () => {
      connections = connections.filter((c) => c.readyState !== 3)
    })
  })
  echo.installHandlers(app, { prefix: '/ws' })
}
console.log(`Serving at http://localhost:${port}`)
