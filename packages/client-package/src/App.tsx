import React from 'react'

import Modal from './ui/modal'

function App() {
  return (
    <>
      <Modal darkMode={false}></Modal>
      <div className="bg-blue-600 min-h-screen min-w-full flex justify-center items-center">
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Modal
        </button>
      </div>
    </>
  )
}

export default App
