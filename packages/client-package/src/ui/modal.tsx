import React, { Fragment, useState } from 'react'

import { Dialog, Transition } from '@headlessui/react'
import { ExclamationIcon } from '@heroicons/react/outline'

import './twind'

const Modal = ({
  darkMode,
  homeUrl
}: {
  homeUrl?: string
  darkMode?: boolean
}) => {
  const [open] = useState(true)

  const handleGoHome = () => {
    window.location.href = homeUrl || '/'
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className={`${
          darkMode ? 'dark' : ''
        } fixed z-10 inset-0 overflow-y-auto`}
        onClose={() => {}}>
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <div className="inline-block align-bottom bg-white dark:bg-gray-900 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full sm:p-6">
              <div>
                <div className="mx-auto  flex items-center justify-center h-12 w-12 rounded-full bg-orange-100 dark:bg-opacity-20">
                  <ExclamationIcon
                    className="h-6 w-6 animate-pulse text-orange-600 dark:text-orange-400"
                    aria-hidden="true"
                  />
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-50">
                    Restricted
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-base text-gray-500">
                      Looks like you do not have access to this application.
                    </p>
                    <p className="text-base text-gray-500">
                      Please contact the owner for an invite
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <button
                  type="button"
                  className="inline-flex items-center w-full px-4 py-2 justify-center border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none "
                  onClick={handleGoHome}>
                  Go back to home
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default Modal
