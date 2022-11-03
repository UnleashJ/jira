import { useLocation } from "react-router-dom"
import { useProject } from "utils/project"

export const useProjectIdInUrl = () => {
  const {pathname} = useLocation() // url中的路径部分
  const id = pathname.match(/projects\/(\d+)/)?.[1]
  return Number(id)
}

export const useProjectInUrl = () => useProject(useProjectIdInUrl())

export const useKanbansSearchParams = () => ({projectId: useProjectIdInUrl()})

export const useKanbansQueryKey = () => ['kanbans', useKanbansSearchParams()]

export const useTasksSearchParams = () => ({projectId: useProjectIdInUrl()})

export const useTasksQueryKey = () => ['kanbans', useTasksSearchParams()]