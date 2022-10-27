import { useCallback, useState } from "react"

export const useUndo = <T>(initialPresent: T) => {
  const [state, setState] = useState<{
    past: T[],
    present: T,
    future: T[]
  }>({
    past: [],
    present: initialPresent,
    future: []
  })

  const canUndo = state.past.length !== 0
  const canRedo = state.future.length !== 0

  
  const undo = useCallback(() => {
    setState(currentState => {
      const {past, present, future} = currentState
      if(past.length === 0) return currentState
      const copyPast = past.slice()
      const now = copyPast.pop() as T
      return {
        past:copyPast,
        present: now,
        future: [...future, present]
      }
    })
  }, [])

  const redo = useCallback(() => {
    setState(currentState => {
      const {past, present, future} = currentState
      if(future.length === 0) return currentState
      const copyFuture = future.slice()
      const now = copyFuture.pop() as T
      return {
        past: [...past, present],
        present: now,
        future: copyFuture
      }
    })
  }, [])

  const set = useCallback((newPresent:T) => {
    setState(currentState => {
      const {past, present} = currentState
      if(newPresent === present) return currentState
      return {
        past: [...past, present],
        present: newPresent,
        future: []
      }
    })
  }, [])

  const reset = useCallback((newPresent = initialPresent) => {
    setState(() => {
      return {
        past: [],
        present: newPresent,
        future: []
      }
    })
  },[initialPresent])

  return [
    state,
    {set, reset, undo, redo, canRedo, canUndo}
  ] as const
}