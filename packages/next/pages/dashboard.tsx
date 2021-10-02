/* eslint-disable jsx-a11y/no-redundant-roles */
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/client'
import React, { useState } from 'react'
import { Toaster } from 'react-hot-toast'

import KeyModal from '@components/KeysModal'
import ProjectNameModal from '@components/ProjectNameModal'
import { LockClosedIcon, PlusIcon, ViewListIcon } from '@heroicons/react/solid'
import { Project } from '@interfaces/project'
import { PrismaClient } from '@prisma/client'

export default function Dashboard({ projects }: { projects: Project[] }) {
  const [currentProject, setCurrentProject] = useState<Project | null>(null)
  const [showKeysModal, setShowKeysModal] = useState(false)
  const [showProjectNameModal, setShowProjectNameModal] = useState(false)

  const handleKeysModal = (project: Project) => {
    setCurrentProject(project)
    setShowKeysModal(true)
  }

  return (
    <>
      <Toaster position="top-right"></Toaster>
      {currentProject && (
        <KeyModal
          project={currentProject}
          open={showKeysModal}
          setOpen={setShowKeysModal}></KeyModal>
      )}
      <ProjectNameModal
        open={showProjectNameModal}
        setOpen={setShowProjectNameModal}></ProjectNameModal>
      <div className="relative min-h-screen bg-white">
        {/* Page heading */}
        <header className="bg-gray-50 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:flex xl:items-center xl:justify-between">
            <div className="flex-1 min-w-0">
              <p className="mt-2 text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                Dashboard
              </p>
            </div>
          </div>
        </header>

        <main className="pt-8 pb-16">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="px-4 py-4 sm:px-0">
              <p className="text-lg font-medium text-gray-900">Projects</p>
            </div>

            {/* Stacked list */}
            <ul
              role="list"
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects && projects.length > 0 ? (
                <>
                  {projects.map((project) => (
                    <li
                      key={project.id}
                      className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200">
                      <div className="w-full flex items-center justify-between p-6 space-x-6">
                        <div className="flex-1 truncate">
                          <div className="flex items-center space-x-3">
                            <h3 className="text-gray-900 text-sm font-medium truncate">
                              {project.projectName}
                            </h3>
                          </div>
                          <p className="mt-1 text-gray-500 text-sm truncate">
                            Whitelisted users: {project._count?.whitelist}
                          </p>
                        </div>
                      </div>
                      <div>
                        <div className="-mt-px flex divide-x divide-gray-200">
                          <div className="w-0 flex-1 flex">
                            <button
                              onClick={() => {
                                handleKeysModal(project)
                              }}
                              className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500">
                              <LockClosedIcon
                                className="w-5 h-5 text-gray-400"
                                aria-hidden="true"
                              />
                              <span className="ml-3">Get Keys</span>
                            </button>
                          </div>
                          <div className="-ml-px w-0 flex-1 flex">
                            <button className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500">
                              <ViewListIcon
                                className="w-5 h-5 text-gray-400"
                                aria-hidden="true"
                              />
                              <span className="ml-3">View Users</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                  <li
                    key="new"
                    className="col-span-1 bg-white rounded-lg shadow">
                    <div className="w-full flex items-center justify-between p-6 space-x-6"></div>
                    <div>
                      <div className="-mt-px flex ">
                        <div className="w-0 flex-1 flex">
                          <button
                            onClick={() => {
                              setShowProjectNameModal(true)
                            }}
                            className="relative outline-none focus:outline-none -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500">
                            <PlusIcon
                              className="-ml-1 mr-2 h-5 w-5"
                              aria-hidden="true"
                            />
                            <span className="ml-3">New Project</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                </>
              ) : (
                <div className="text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true">
                    <path
                      vectorEffect="non-scaling-stroke"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                    />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">
                    No projects
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Get started by creating a new project.
                  </p>
                  <div className="mt-6">
                    <button
                      onClick={() => {
                        setShowProjectNameModal(true)
                      }}
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      <PlusIcon
                        className="-ml-1 mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                      New Project
                    </button>
                  </div>
                </div>
              )}
            </ul>
          </div>
        </main>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const prisma = new PrismaClient()

  const session = await getSession(ctx)

  try {
    if (session && session.user) {
      const email = session.user.email

      if (email) {
        const projects = await prisma.project.findMany({
          where: { owner: { email } },
          include: { _count: { select: { whitelist: true } } }
        })
        return { props: { projects } }
      }
    }
    // Redirect handled inside handleAuthSSR
    return { redirect: { destination: '/', permanent: false } }
  } catch (err) {
    console.error(err)
    return { redirect: { destination: '/', permanent: false } }
  }
}
