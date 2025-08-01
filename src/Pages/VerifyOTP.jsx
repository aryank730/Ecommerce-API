import React from 'react'

const VerifyOTP = () => {
  return (
    <div>
     <div class="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 min-h-screen flex items-center justify-center p-4">
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

                  </div>   
    </div>
  )
}

export default VerifyOTP