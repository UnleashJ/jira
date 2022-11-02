import { useMutation, useQuery, useQueryClient } from "react-query"
import { Project } from "screens/projec-list/list"
import { useProjectsSearchParams } from "screens/projec-list/utils"
import { useHttp } from "./http"

export const useProjects = (param?:Partial<Project>) => {
  const client = useHttp()
  return useQuery<Project[]>(['projects', param], () => client('projects', {data: param}))
}

export const useEditProject = () => {
  const client = useHttp()
  const queryClient = useQueryClient()
  const [searchParams] = useProjectsSearchParams()
  const queryKey = ['projects', searchParams]

  return useMutation((params: Partial<Project>) => client(`projects/${params.id}`, {
    method: 'PATCH',
    data: params
  }), {
    async onMutate(target:Partial<Project>) {
      console.log(target, queryKey)
      // 将要更新时发生

      // 保存前一次状态的快照
      const previousItems = queryClient.getQueryData(queryKey)
      // 执行"乐观"更新
      queryClient.setQueryData(queryKey, (old?: Project[]) => {
        return old?.map(project => project.id === target.id ? {...project, ...target}: project) || []
      })
       // 返回具有快照值的上下文对象
      return {
        previousItems
      }
    },
    onSuccess: () => queryClient.invalidateQueries(queryKey),
    onError: (error: Error, newItem, context) => {
      // 回滚
      queryClient.setQueryData(queryKey, context?.previousItems)
    }
  })
}


export const useAddProject = () => {
  const client = useHttp()
  const queryClient = useQueryClient()

  return useMutation((params: Partial<Project>) => client(`projects`, {
    method: 'POST',
    data: params
  }), {
    onSuccess: () => queryClient.invalidateQueries('projects')
  })
}

// 获取project详情
export const useProject = (id?: number) => {
  const client = useHttp()
  return useQuery<Project>(
    ['project', {id}],
    () => client(`projects/${id}`),
    {
      enabled: !!id
    }
  )
}