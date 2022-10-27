import { useCallback, useReducer } from "react"


const UNDO = 'undo'
const REDO = 'redo'
const SET = 'set'
const RESET = 'reset'

interface State<T> {
    past: T[],
    present: T,
    future: T[]
}

interface Action<T> {
  type: typeof UNDO | typeof REDO | typeof SET | typeof RESET,
  payload?: T
}


const undoReducer
   = <T>(state: State<T>, action: Action<T>) => {
    const {past, present, future} = state
    const {type, payload} = action

    switch (type) {
      case UNDO: {
        if(past.length === 0) return state
        const copyPast = past.slice()
        const now = copyPast.pop() as T
        return {
          past:copyPast,
          present: now,
          future: [...future, present]
        }
      }  
      case REDO: {
        if(future.length === 0) return state
        const copyFuture = future.slice()
        const now = copyFuture.pop() as T
        return {
          past: [...past, present],
          present: now,
          future: copyFuture
        }
      }     
      case SET: {
        const newPresent = payload as T
        if(newPresent === present) return state
        return {
          past: [...past, present],
          present: newPresent,
          future: [] as T[]
        }
      }
      case RESET: {
        const newPresent = payload as T
        return {
          past: [] as T[],
          present: newPresent,
          future: [] as T[]
        }
      }
      default:
        return state
    }
  }


export const useUndo = <T>(initialPresent: T) => {
  const [state, dispatch] = useReducer(undoReducer, {
    past: [],
    present: initialPresent,
    future: []
  }) as [State<T>, React.Dispatch<Action<T>>]
  const canUndo = state?.past.length !== 0
  const canRedo = state?.future.length !== 0

  const undo = useCallback(() => dispatch({type: UNDO}), [])
  const redo = useCallback(() => dispatch({type: REDO}), [])
  const set = useCallback((newPresent:T) => dispatch({type: SET, payload: newPresent}), [])
  const reset = useCallback((newPresent = initialPresent) => dispatch({type: RESET, payload: newPresent}),[initialPresent])

  return [
    state,
    {set, reset, undo, redo, canRedo, canUndo}
  ] as const
}


