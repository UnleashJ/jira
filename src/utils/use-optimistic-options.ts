import { QueryKey, useQueryClient } from "react-query";

/**
 * 生成配置 
 * @param queryKey 
 * @param callback 如何通过旧数据生成新数据，即如何乐观更新（增删改）
 */
export const useConfig = (queryKey: QueryKey, callback:(target:any, old?: any[]) => any[]) => {
  const queryClient = useQueryClient()
  return {
    async onMutate(target: any) {
      const previousItems = queryClient.getQueryData(queryKey)
      queryClient.setQueryData(queryKey, (old?: any[]) => {
        return callback(target, old)
      })
      return {
        previousItems
      }
    },
    onSuccess: () => queryClient.invalidateQueries(queryKey),
    onError: (error: any, newItem: any, context: any) => {
      queryClient.setQueryData(queryKey, context?.previousItems)
    }
  }
}

// 删除操作的配置
export const useDeleteConfig = (queryKey: QueryKey) => {
  return useConfig(queryKey, (target:any, old?:any[]) => 
    old?.filter(item => item.id !== target.id) || [])
}
// 编辑操作的配置
export const useEditConfig = (queryKey: QueryKey) => {
  return useConfig(queryKey, (target:any, old?:any[]) => 
    // 使用target覆盖item的属性
    old?.map(item => item.id === target.id ? {...item, ...target} : item) || [])
}
// 新增操作的配置
export const useAddConfig = (queryKey: QueryKey) => {
  return useConfig(queryKey, (target:any, old?:any[]) => 
    old ? [...old,target] : [target])
}