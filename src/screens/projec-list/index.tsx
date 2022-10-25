import { List } from './list'
import { SearchPanel } from './search-panel'
import { useDebounce } from 'utils/index'
import styled from '@emotion/styled'
import { Typography } from 'antd'
import { useProjects } from 'utils/project'
import { useUsers } from 'utils/users'
import { useUrlQueryParam } from 'utils/url'

export const ProjectListScreen = () => {
  const [param, setParam] = useUrlQueryParam(['name', 'personId'])
  const debouncedParam = useDebounce(param)

  const {error,isLoading,list} = useProjects(debouncedParam)
  const {users} = useUsers()
  
  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel  users={users || []} param={param} setParam={setParam}/>
      {
        error ? <Typography.Text type='danger'>{error.message}</Typography.Text> : null
      }
      <List users={users || []} dataSource={list || []} loading={isLoading}/>
    </Container>
  )
}

const Container = styled.div`
 padding: 3.2rem;
`