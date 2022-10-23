import { useCallback } from "react"
import { User } from "screens/projec-list/search-panel"
import { useMount } from "utils"
import { useHttp } from "./http"
import { useAsync } from "./use-async"

export const useUsers = () => {
  const {run, data:users} = useAsync<User[]>({
    stat: 'idle',
    error: null,
    data: null
  })
  const client = useHttp()
  useMount(useCallback(() => {
    run(client('users'))
  }, [run, client]))

  return {
    users
  }
}