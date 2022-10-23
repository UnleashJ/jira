import qs from 'qs'
import * as auth from 'auth-provider'
import { useAuth } from 'context/auto-context'

const apiURL = process.env.REACT_APP_API_URL

interface Config extends RequestInit {
  token?: string,
  data?: object
}

export const http = async (endpoint: string, {data, token, headers, ...customConfig}: Config = {}) => {
  const config = {
    method: 'GET', // 默认为get，可能被customConfig覆盖
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': data ? 'application/json' : ''
    },
    ...customConfig
  }
  if(config.method.toUpperCase() === 'GET') {
    endpoint += `?${qs.stringify(data)}`
  }else {
    config.body = JSON.stringify(data || {})
  }
  return window.fetch(`${apiURL}/${endpoint}`, config)
    .then(async response => {
      if(response.status === 401) {
        // token失效或没有携带，logout
        await auth.logout()
        window.location.reload()
        return Promise.reject({
          message: '请重新登录'
        })
      }
      const data = await response.json()
      if(response.ok) {
        return data
      } else {
        return Promise.reject(data)
      }
    })
}

export const useHttp = () => {
  const {user} = useAuth() // 从context中获得user
  // Parameters<Type> 由函数类型Type的参数类型来构建出一个元组类型。
  return (...[endpoint, config]: Parameters<typeof http>) => http(endpoint, {...config, token: user?.token})
}