import { useEffect } from "react"
import { Project } from "screens/projec-list/list"
import { cleanObject } from "utils"
import { useHttp } from "./http"
import { useAsync } from "./use-async"

export const useProjects = (param:Partial<Project>) => {
  const {run, data:list, isLoading, error} = useAsync<Project[]>({
    stat: 'idle',
    error: null,
    data: null
  })
  const client = useHttp()

  useEffect(() => {
    run(client('projects', {
      data: cleanObject(param)
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param])

  return {
    error,
    isLoading,
    list
  }
}

export const useEditProject = () => {
  const {run, ...asyncResult} = useAsync()
  const client = useHttp()
  const mutate = (params: Partial<Project>) => {
    return run(client(`projects/${params.id}`, {
      data: params,
      method: 'PATCH'
    }))
  }
  return {
    mutate,
    ...asyncResult
  }
}


export const useAddProject = () => {
  const {run, ...asyncResult} = useAsync()
  const client = useHttp()
  const mutate = (params: Partial<Project>) => {
    return run(client(`projects/${params.id}`, {
      data: params,
      method: 'POST'
    }))
  }
  return {
    mutate,
    ...asyncResult
  }
}