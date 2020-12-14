import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { updateLogin, updatePassword, signIn } from '../redux/reducers/auth'
import { history } from '../redux'

const Login = () => {
  const dispatch = useDispatch()
  const login = useSelector((s) => s.auth.login)
  const password = useSelector((s) => s.auth.password)

  return (
    <div className="w-screen h-screen bg-teal-500 flex items-center justify-center">
      <div className="bg-white rounded-lg py-5 px-10 shadow-xl border-2 border-teal-700 border-solid">
        <h2 className="text-2xl text-teal-800 font-bold mb-6 border-b-2 border-solid border-teal-700 pb-2">
          Login
        </h2>

        <div className="flex flex-col place-content-center">
          <input
            type="text"
            name="userLogin"
            id="userLoginInput"
            placeholder="Username"
            value={login}
            className="text-gray-800 border-2 border-solid border-teal-700 rounded focus:outline-none py-1 pl-1 my-1 font-bold"
            onInput={(e) => {
              dispatch(updateLogin(e.target.value))
            }}
          />

          <input
            type="password"
            name="userPassword"
            id="userPasswordInput"
            placeholder="************"
            value={password}
            className="text-gray-800 border-2 border-solid border-teal-700 rounded focus:outline-none py-1 pl-1 my-1 font-bold"
            onInput={(e) => {
              dispatch(updatePassword(e.target.value))
            }}
          />

          <button
            type="button"
            className="bg-teal-700 py-2 rounded hover:bg-teal-500 text-white mt-5 font-bold transition-all duration-200 focus:outline-none"
            onClick={() => {
              dispatch(signIn())
            }}
          >
            Sign in
          </button>

          <button
            type="button"
            className="mt-2 underline text-gray-500 focus:outline-none"
            onClick={() => {
              history.push('/register')
            }}
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  )
}

Login.propTypes = {}

export default React.memo(Login)
