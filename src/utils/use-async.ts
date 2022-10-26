import { useCallback, useState } from "react";

interface State<D> {
  error: Error | null;
  data: D | null;
  stat: 'idle' | 'loading' | 'error' | 'success'
}

const defaultInitialState: State<null> = {
  stat: 'idle',
  error: null,
  data: null
}

const defaultConfig = {
  throwOnError: false
}

export const useAsync = <D>(initialState?: State<D>, initialConfig?: typeof defaultConfig) => {
  const [state, setState] = useState({
    ...defaultInitialState,
    ...initialState
  })
  const config = {
    ...defaultConfig,
    ...initialConfig
  }

  // 请求成功，设置数据
  const setData = useCallback((data: D) => {
    setState({
      data,
      stat: 'success',
      error: null
    })
  }, [setState])

  const setError = useCallback((error: Error) => {
    setState({
      data:null,
      error,
      stat: 'error'
    })
  }, [setState])

  const run = useCallback((promise: Promise<D>) => {
    if(!promise || !promise.then) {
      throw new Error('请传入Promise数据')
    }
    setState(state => ({
      ...state,
      stat: 'loading'
    }))
    return promise
      .then(data => {
        setData(data)
        return data
      }).catch(error => {
        setError(error)
        if(config.throwOnError) {
          return Promise.reject(error)
        }
        return error
      })
  }, [ config.throwOnError, setData, setError])

  return {
    ...state,
    setData,
    setError,
    run,
    isIdle: state.stat === 'idle',
    isLoading: state.stat === 'loading',
    isError: state.stat === 'error',
    isSuccess: state.stat === 'success'
  }
}