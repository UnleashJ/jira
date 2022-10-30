import { useMemo } from "react"
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

// Modal框搜索参数
export const useProjectModal = () => {
  // 通过URL search参数中的projectCreate为true或者false控制modal框的展示与关闭
  const [{projectCreate}, setProjectCreate] = useUrlQueryParam(['projectCreate'])

  const open = () => setProjectCreate({projectCreate: true})
  const close = () => setProjectCreate({projectCreate: undefined})

  return {
    projectCreate: projectCreate === 'true', // useSearchParams读取的数据都是字符串
    open, 
    close
  }
}