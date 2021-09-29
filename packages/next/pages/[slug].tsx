import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'

import { LockClosedIcon } from '@heroicons/react/solid'

export default function Slug() {
  const [darkMode, setDarkMode] = useState(false)
  const [email, setEmail] = useState('')
  const router = useRouter()
  const { slug } = router.query

  console.log({ slug })

  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      setDarkMode(true)
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast.promise(axios.post('/api/invite/use', { email, slug }), {
      loading: 'Accepting Invite...',
      success: (response) => {
        const { data } = response
        if (data.url) {
          router.push(data.url)
        }
        return 'Accepted Invite!'
      },
      error: 'Failed to accept invite'
    })
  }

  return (
    <>
      <Toaster position="top-right"></Toaster>
      <div className={`${darkMode ? 'dark' : ''}`}>
        <div
          className={`min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8`}>
          <div className="max-w-md w-full space-y-8">
            <div>
              <p className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-50">
                Claim Invite
              </p>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <input type="hidden" name="remember" defaultValue="true" />
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none  relative block w-full px-3 py-2 rounded-md border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                    }}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group font-inter relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <LockClosedIcon
                      className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                      aria-hidden="true"
                    />
                  </span>
                  Accept Invite
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
