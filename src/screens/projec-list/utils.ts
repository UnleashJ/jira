import { useMemo } from "react"
import { useProject } from "utils/project"
import { useUrlQueryParam } from "utils/url"

// 项目列表搜索的参数
export const useProjectsSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(['name', 'personId'])
  return [
    useMemo(() => {
      return {...param, personId: Number(param.personId) || undefined}
    }, [param]),
    setParam
  ] as const
}

// Modal框
export const useProjectModal = () => {
  // 通过URL search参数中的projectCreate为true或者false控制modal框的展示与关闭
  const [{projectCreate, editingProjectId}, setProjectModalParam] = useUrlQueryParam(['projectCreate', 'editingProjectId'])
  const {data: editingProject, isLoading} = useProject(Number(editingProjectId))

  const open = () => setProjectModalParam({projectCreate: true})
  const close = () => {
    setProjectModalParam({projectCreate: undefined, editingProjectId: undefined})
  }
  const startEdit = (id: number) => setProjectModalParam({editingProjectId: id})

  return {
    projectModalOpen: projectCreate === 'true' || !!editingProjectId, // useSearchParams读取的数据都是字符串
    open, 
    close,
    startEdit,
    editingProject,
    isLoading
  }
}