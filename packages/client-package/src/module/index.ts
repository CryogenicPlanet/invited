import axios from 'axios'
import React from 'react'
import { render } from 'react-dom'

import Modal from '../ui/modal'
import { serverUrl } from '../utils/url'

export type Options = {
  modal?: boolean
  baseUrl?: string
  darkMode?: boolean
  homeUrl?: string
  redirectUrl?: string
}

class Invited {
  apiToken: string
  modal: boolean = true
  baseUrl: string = serverUrl
  darkMode: boolean = true
  homeUrl: string = '/'
  redirectUrl: string | undefined

  constructor(apiToken: string, options?: Options) {
    this.apiToken = apiToken
    this.modal = options?.modal || true
    this.baseUrl = options?.baseUrl || serverUrl
    this.darkMode = options?.darkMode || true
    this.homeUrl = options?.homeUrl || '/'

    if (options?.redirectUrl) {
      this.redirectUrl = options.redirectUrl
      this._updateRedirectUrl()
    }
  }

  verify = async (email: string) => {
    const { apiToken, modal } = this
    try {
      await axios.post(
        `${serverUrl}/api/verify`,
        { email },
        { headers: { apiToken } }
      )
      return true
    } catch (err) {
      if (modal) {
        this._openModal()
      }
      throw new Error(err as string)
    }
  }

  _updateRedirectUrl = async () => {
    const { apiToken, redirectUrl } = this
    if (redirectUrl) {
      try {
        await axios.post(
          `${serverUrl}/api/project/update`,
          { redirectUrl },
          { headers: { apiToken } }
        )
      } catch (err) {
        console.error(err)
      }
    }
  }

  _openModal = () => {
    const { darkMode, homeUrl } = this

    const newElement = document.createElement('div')
    newElement.id = 'modal-root'
    document.body.appendChild(newElement)

    const modal = React.createElement(Modal, {
      darkMode,
      homeUrl
    })
    render(modal, newElement)
  }

  setDarkMode = (state: boolean) => {
    this.darkMode = state
  }

  create = async () => {
    const { apiToken } = this

    try {
      const response = await axios.get(
        `${serverUrl}/api/invite/create?apiToken=${apiToken}`,

        { headers: { apiToken } }
      )
      return `${this.baseUrl}/${response.data.slug}`
    } catch (err) {
      throw new Error(err as string)
    }
  }

  consume = async (email: string, slug: string) => {
    const { apiToken } = this

    try {
      await axios.post(
        `${serverUrl}/api/use`,
        { email, slug },
        { headers: { apiToken } }
      )
    } catch (err) {
      throw new Error(err as string)
    }
  }
}

export default Invited

export { Invited }
