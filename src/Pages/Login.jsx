import React, { useState } from 'react'

const Login = () => {

  const [currentState, setCurrentState] = useState('Log in');
  const onSubmitHandler = async (event) => {
    e.preventDefault();
  }
  return (
    <>
      <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-6">
        <div class="sm:mx-auto sm:w-full sm:max-w-md">
          <img class="mx-auto h-10 w-auto" src="https://www.svgrepo.com/show/301692/login.svg" alt="Workflow" />
          <h2 class="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
            {currentState} to your account
          </h2>
          <p class="mt-2 text-center text-sm leading-5 text-blue-500 max-w">
            Or
            <a href="#"
              class="font-medium text-blue-500 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150">
              create a new acccount
            </a>
          </p>
        </div>


        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form onSubmit={onSubmitHandler} class="space-y-6">
              <div>
                <label for="email" class="block text-sm font-medium leading-5  text-gray-700">Email address</label>
                <div class="mt-1 relative rounded-md shadow-sm">
                  <input id="email" name="email" placeholder="user@example.com" type="email" required="" value="" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                  <div class="hidden absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg class="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clip-rule="evenodd"></path>
                    </svg>
                  </div>
                </div>
              </div>

              {currentState === 'Log in' ? '' : <div class="mt-6">
                <label for="password" class="block text-sm font-medium leading-5 text-gray-700">Password</label>
                <div class="mt-1 rounded-md shadow-sm">
                  <input id="name" name="password" type="password" required="" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                </div>
              </div>}

              <div class="mt-6">
                <label for="password" class="block text-sm font-medium leading-5 text-gray-700">Password</label>
                <div class="mt-1 rounded-md shadow-sm">
                  <input id="password" name="password" type="password" required="" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                </div>
              </div>

              <div class="mt-6 flex items-center justify-between">
                {/* <div class="flex items-center">
                  <input id="remember_me" name="remember" type="checkbox" value="1" class="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out" />
                  <label for="remember_me" class="ml-2 block text-sm leading-5 text-gray-900">Remember me</label>
                </div> */}


                <div class="text-sm leading-5">
                  <a href=""
                    class="font-medium text-blue-500 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150">
                    Forgot your password?
                  </a>
                </div>

                {currentState === 'Log in'
                 ? <p onClick={()=>setCurrentState('sign up')} className='cursor-pointer'>Create Account</p>
                 : <p onClick={()=>setCurrentState('Login')} className='cursor-pointer'>Login Account</p>
                }

              </div>

              <div class="mt-6">
                <span class="block w-full rounded-md shadow-sm">
                  {
                    currentState === 'Log in' ? (
                      <button type="submit" onClick={() => setCurrentState('Sign Up')}
                        class="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out">
                        Log in
                      </button>
                    ) : (
                      <button type="submit" onClick={() => setCurrentState('Login')}
                        class="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:border-green-700 focus:shadow-outline-green active:bg-green-700 transition duration-150 ease-in-out">
                        Register
                      </button>
                    )
                  }
                </span>
                {/* <button className='w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:border-green-700 focus:shadow-outline-green active:bg-green-700 transition duration-150 ease-in-out'>{currentState === 'Login'?'sign in': 'sign up'}</button> */}
             
              </div>
            </form>

          </div>
        </div>
      </div>

      {/* <div class="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 min-h-screen flex items-center justify-center p-4">
        <div class="bg-white dark:bg-gray-700 shadow-2xl rounded-3xl w-full max-w-md overflow-hidden grid md:grid-cols-1 transform transition-transform duration-300 hover:scale-105">
          <div class="p-8 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" class="mx-auto mb-6 w-48 h-48 animate-pulse">
              <circle cx="200" cy="200" r="150" fill="#3B82F6" />
              <circle cx="200" cy="200" r="120" fill="#FFFFFF" />
              <circle cx="200" cy="200" r="90" fill="#3B82F6" />
              <circle cx="200" cy="200" r="60" fill="#FFFFFF" />
              <text x="200" y="200" text-anchor="middle" fill="#2563EB" font-size="40" font-weight="bold" dy=".3em" class="text-center">OTP</text>
            </svg>

            <h2 class="text-2xl font-bold mb-2 text-gray-800 dark:text-white">Verify OTP</h2>
            <p class="text-sm text-gray-600 dark:text-gray-300 mb-6">Enter the 6-digit code sent to +91 8888888888</p>

            <div class="flex justify-center space-x-4 mb-6">
              <input type="text" maxlength="1"
                class="w-12 h-16 text-center text-2xl border-2 border-blue-500 rounded-xl
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                    dark:bg-gray-600 dark:text-white dark:border-blue-400
                    transition-transform duration-300 hover:scale-110"/>
              <input type="text" maxlength="1"
                class="w-12 h-16 text-center text-2xl border-2 border-blue-500 rounded-xl
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                    dark:bg-gray-600 dark:text-white dark:border-blue-400
                    transition-transform duration-300 hover:scale-110"/>
              <input type="text" maxlength="1"
                class="w-12 h-16 text-center text-2xl border-2 border-blue-500 rounded-xl
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                    dark:bg-gray-600 dark:text-white dark:border-blue-400
                    transition-transform duration-300 hover:scale-110"/>
              <input type="text" maxlength="1"
                class="w-12 h-16 text-center text-2xl border-2 border-blue-500 rounded-xl
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                    dark:bg-gray-600 dark:text-white dark:border-blue-400
                    transition-transform duration-300 hover:scale-110"/>
              <input type="text" maxlength="1"
                class="w-12 h-16 text-center text-2xl border-2 border-blue-500 rounded-xl
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                    dark:bg-gray-600 dark:text-white dark:border-blue-400
                    transition-transform duration-300 hover:scale-110"/>
              <input type="text" maxlength="1"
                class="w-12 h-16 text-center text-2xl border-2 border-blue-500 rounded-xl
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                    dark:bg-gray-600 dark:text-white dark:border-blue-400
                    transition-transform duration-300 hover:scale-110"/>
            </div>

            <div class="text-sm text-gray-600 dark:text-gray-300 mb-6">
              Didn't receive code?
              <a href="#" class="text-blue-500 hover:underline dark:text-blue-400 transition-colors duration-300 hover:text-blue-600 dark:hover:text-blue-500">Resend OTP</a>
            </div>
            <a href="/" target="">
              <button class="w-full py-4 bg-blue-500 text-white rounded-xl hover:bg-blue-600
            transition-transform duration-300 hover:scale-105
            dark:bg-blue-600 dark:hover:bg-blue-700">
                Verify OTP
              </button>
            </a>

          </div>
        </div>

      </div> */}
    </>
  )
}

export default Login
