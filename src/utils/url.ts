import { useMemo } from "react"
import { useSearchParams } from "react-router-dom"

// 返回页面URL中指定键的参数值
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParams]  = useSearchParams()
  return [
    useMemo(() => {
      return keys.reduce((pre, key:K) => {
        return {
          ...pre,
          [key]: searchParams.get(key) || ''
        }
      }, {} as {[key in K]: string})
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams]), 
    setSearchParams
  ] as const
}