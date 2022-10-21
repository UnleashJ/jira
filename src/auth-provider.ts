import { User } from "screens/projec-list/search-panel"

const apiURL = process.env.REACT_APP_API_URL

const localStorageKey = '__auth_provider_token__'

export const getToken = () => window.localStorage.getItem(localStorageKey)

export const handleUserResponse = ({user} : {user:User}) => {
  window.localStorage.setItem(localStorageKey, user.token || '')
  return user
}

export const login = (data: {username:string, password: string}) => {
  return fetch(`${apiURL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(
    async (response: Response) => {
      if(response.ok) {
        return handleUserResponse(await response.json())
      } else {
        return Promise.reject(data)
      }
    }
  )
}

export const register = (data: {username:string, password: string}) => {
  return fetch(`${apiURL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(
    async (response: Response) => {
      if(response.ok) {
        return handleUserResponse(await response.json())
      } else {
        return Promise.reject(data)
      }
    }
  )
}

export const logout = async () => window.localStorage.removeItem(localStorageKey)