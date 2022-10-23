import { useState, useEffect, useCallback } from 'react'
import { List } from './list'
import { SearchPanel } from './search-panel'
import { cleanObject, useMount, useDebounce } from 'utils/index'
import { useHttp } from 'utils/http'
import styled from '@emotion/styled'

const apiURL = process.env.REACT_APP_API_URL

export const ProjectListScreen = () => {
  const [users, setUsers] = useState([]) // 用户数据列表

  const [param, setParam] = useState({
    name: '',
    personId: ''
  }) // 请求参数
  const [list, setList] = useState([]) // 工程列表数据
  const debouncedParam = useDebounce(param)
  const client = useHttp()

  useEffect(() => {
    client('projects', {
      data: cleanObject(debouncedParam)
    }).then(setList)
  }, [debouncedParam])
  
  useMount(useCallback(() => {
    client('users').then(setUsers)
    fetch(`${apiURL}/users`).then(async res => {
      if(res.ok) {
        setUsers(await res.json())
      }
    })
  }, [setUsers]))

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel  users={users} param={param} setParam={setParam}/>
      <List users={users} list={list}/>
    </Container>
  )
}

const Container = styled.div`
 padding: 3.2rem;
`