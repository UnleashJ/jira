import { useState, useEffect, useCallback } from 'react'
import { List } from './list'
import { SearchPanel } from './search-panel'
import { cleanObject, useMount, useDebounce } from 'utils/index'
import { useHttp } from 'utils/http'
import styled from '@emotion/styled'
import { Typography } from 'antd'

const apiURL = process.env.REACT_APP_API_URL

export const ProjectListScreen = () => {
  const [users, setUsers] = useState([]) // 用户数据列表
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<null | Error>(null)

  const [param, setParam] = useState({
    name: '',
    personId: ''
  }) // 请求参数
  const [list, setList] = useState([]) // 工程列表数据
  const debouncedParam = useDebounce(param)
  const client = useHttp()

  useEffect(() => {
    setIsLoading(true)
    client('projects', {
      data: cleanObject(debouncedParam)
    })
    .then(data => {
      setList(data)
      setError(null)
    })
    .catch((error) => {
      setError(error)
      setList([])
    })
    .finally(() => {
      setIsLoading(false)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedParam])
  
  useMount(useCallback(() => {
    setIsLoading(true)
    client('users')
    .then(user => {
      setUsers(user)
      setError(null)
    })
    .catch((error) => {
      setError(error)
      setList([])
    })
    .finally(() => {
      setIsLoading(false)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setUsers]))

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel  users={users} param={param} setParam={setParam}/>
      {
        error ? <Typography.Text type='danger'>{error.message}</Typography.Text> : null
      }
      <List users={users} dataSource={list} loading={isLoading}/>
    </Container>
  )
}

const Container = styled.div`
 padding: 3.2rem;
`