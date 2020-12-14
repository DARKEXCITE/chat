import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { history } from '../redux'
import { signUp, updateRegisterLogin, updateRegisterPassword } from '../redux/reducers/register'

const Register = () => {
  const dispatch = useDispatch()
  const login = useSelector((s) => s.register.login)
  const password = useSelector((s) => s.register.password)
  const message = useSelector((s) => s.register.message)

  return (
    <div className="w-screen h-screen bg-teal-500 flex items-center justify-center">
      <div className="bg-white rounded-lg py-5 px-10 shadow-xl border-2 border-teal-700 border-solid">
        <h2 className="text-2xl text-teal-800 font-bold mb-6 border-b-2 border-solid border-teal-700 pb-2">
          Registration
        </h2>

        <div className="flex flex-col place-content-center">
          {message && (
            <div className="p-2 border-solid border-2 border-red-600 bg-red-400 rounded font-bold">
              {message}
            </div>
          )}

          <input
            type="text"
            name="userLogin"
            id="userLoginInput"
            placeholder="Username"
            className="text-gray-800 border-2 border-solid border-teal-700 rounded focus:outline-none py-1 pl-1 my-1 font-bold"
            value={login}
            onInput={(e) => {
              dispatch(updateRegisterLogin(e.target.value))
            }}
          />
          <input
            type="password"
            name="userPassword"
            id="userPasswordInput"
            placeholder="************"
            className="text-gray-800 border-2 border-solid border-teal-700 rounded focus:outline-none py-1 pl-1 my-1 font-bold"
            value={password}
            onInput={(e) => {
              dispatch(updateRegisterPassword(e.target.value))
            }}
          />
          <button
            type="button"
            className="bg-teal-700 py-2 rounded hover:bg-teal-500 text-white mt-5 font-bold transition-all duration-200 focus:outline-none"
            onClick={() => {
              dispatch(signUp())
            }}
          >
            Sign up
          </button>

          <button
            type="button"
            className="mt-2 underline text-gray-500 focus:outline-none"
            onClick={() => {
              history.push('/login')
            }}
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  )
}

Register.propTypes = {}

export default React.memo(Register)
