import { List } from './list'
import { SearchPanel } from './search-panel'
import { useDebounce } from 'utils/index'
import styled from '@emotion/styled'
import { Row, Button, Typography } from 'antd'
import { useProjects } from 'utils/project'
import { useUsers } from 'utils/users'
import { useProjectModal, useProjectsSearchParams } from './utils'

export const ProjectListScreen = () => {
  const [param, setParam] = useProjectsSearchParams()
  const debouncedParam = useDebounce(param)
  const {error, isLoading, list} = useProjects(debouncedParam)
  const {users} = useUsers()
  const {open} = useProjectModal()
  
  return (
    <Container>
      <Row justify='space-between' align='middle'>
        <h1>项目列表</h1>
        <Button onClick={open}>创建项目</Button>
      </Row>
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