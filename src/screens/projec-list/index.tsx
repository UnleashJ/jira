import { useState, useEffect, useCallback } from 'react'
import { List } from './list'
import { SearchPanel } from './search-panel'
import qs from 'qs'
import { cleanObject, useMount, useDebounce } from 'utils/index'
import { useHttp } from 'utils/http'

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
    <div>
      <SearchPanel  users={users} param={param} setParam={setParam}/>
      <List users={users} list={list}/>
    </div>
  )
}