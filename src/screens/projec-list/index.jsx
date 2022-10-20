import { useState, useEffect } from 'react'
import { List } from './list'
import { SearchPanel } from './search-panel'
import qs from 'qs'
import { cleanObject, useMount, useDebounce } from 'utils/index'

const apiURL = process.env.REACT_APP_API_URL

export const ProjectListScreen = () => {
  const [users, setUsers] = useState([]) // 用户数据列表

  const [param, setParam] = useState({
    name: '',
    personId: ''
  }) // 请求参数
  const [list, setList] = useState([]) // 工程列表数据

  const debouncedParam = useDebounce(param)

  useEffect(() => {
    fetch(`${apiURL}/projects?${qs.stringify(cleanObject(debouncedParam))}`).then(async res => {
      if(res.ok) {
        setList(await res.json())
      }
    })
  }, [debouncedParam])

  useMount(() => {
    fetch(`${apiURL}/users`).then(async res => {
      if(res.ok) {
        setUsers(await res.json())
      }
    })
  })

  return (
    <div>
      <SearchPanel  users={users} param={param} setParam={setParam}/>
      <List users={users} list={list}/>
    </div>
  )
}