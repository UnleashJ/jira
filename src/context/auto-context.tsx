import React, { useContext, ReactNode } from "react"
import * as auth from 'auth-provider'
import { http } from "utils/http"
import { useMount } from "utils"
import { useAsync } from "utils/use-async"
import { FullPageErrorFallback, FullPageLoading } from "components/lib"
import { useQueryClient } from "react-query"
import { User } from "types"

interface AuthForm {
  username: string
  password: string
}

const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken() // 获取缓存中的token
  if(token) {
    // 请求token对应的user对象
    const data = await http('me', {token})
    user = data.user
  }
  return user
}

const AuthContext = React.createContext<{
  user:User|null,
  register: (form: AuthForm) => Promise<void>,
  login: (form: AuthForm) => Promise<void>,
  logout: () => Promise<void>
} | undefined>(undefined)
AuthContext.displayName = 'AuthContext'

export const AuthProvider = ({children}:{children: ReactNode}) => {
  const {data: user, error, isLoading, isIdle, isError, run, setData:setUser} = useAsync<User | null> ()

  const queryClient = useQueryClient()

  const login = (form: AuthForm) => auth.login(form).then(setUser)
  const register = (form: AuthForm) => auth.register(form).then(setUser)
  const logout = () => auth.logout().then(() => {
    setUser(null)
    queryClient.clear() // 把用useQuery查询的数据，全部清空
  })

  useMount(() => {
    // 加载初始user
    run(bootstrapUser())
  })

  if(isIdle || isLoading) {
    return <FullPageLoading/>
  }

  if(isError && error) {
    return <FullPageErrorFallback error = {error}/>
  }

  return (
    <AuthContext.Provider 
      children={children} 
      value={{user, login, register, logout}}
    />
  )
}

// 消费Context
export const useAuth = () => {
  const context = useContext(AuthContext)
  if(!context) {
    throw new Error('useAuth必须在AuthProvider中使用')
  }
  return context
}