import styled from "@emotion/styled"
import { Button, Dropdown, Menu } from "antd"
import { Row } from "components/lib"
import { useAuth } from "context/auto-context"
import { ProjectListScreen } from "screens/projec-list"
import { ReactComponent as SoftwareLogo } from 'assets/software-logo.svg'
import { useDocumentTitle } from "utils"
import { Navigate, Routes, Route, useLocation, useNavigate } from "react-router-dom"
import { ProjectScreen } from "screens/project"
import { EpicScreen } from "screens/epic"
import { KanBanScreen } from "screens/kanban"

export const AuthenticatedApp = () => {
  const location = useLocation()
  useDocumentTitle('项目列表', false)
  return (
    <Container>
      <PageHeader/>
      <main>
        {location.pathname === '/' && <Navigate to="/projects"/>}
        <Routes>
          <Route path="/projects" element={<ProjectListScreen />} />
          <Route path="/projects/:projectId" element={<ProjectScreen />} >
            <Route path="" element={<KanBanScreen/>} />
            <Route path="kanban" element={<KanBanScreen/>} />
            <Route path="epic" element={<EpicScreen/>} />
          </Route>
        </Routes> 
      </main>
    </Container>
  )
}

const PageHeader = () => {
  const {logout, user} = useAuth()
  const navigate = useNavigate()
  
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <SoftwareLogo 
          width={'18rem'} 
          color={'rgb(38, 132, 255)'}
          onClick={() => navigate('/')}
        />
        <h2>项目</h2>
        <h2>用户</h2>
      </HeaderLeft>
      <HeaderRight>
        <Dropdown overlay={
          <Menu>
            <Menu.Item key={'logout'}>
              <Button type="link" onClick={logout}>登出</Button>
            </Menu.Item>
          </Menu>
        }>
          <Button type="link" onClick={e=> e.preventDefault()}>
            Hi, {user?.name}
          </Button>
        </Dropdown>
      </HeaderRight>
    </Header>
  )
}

const Container = styled.div`
  display: grid ;
  grid-template-rows: 6rem calc(100vh - 6rem);
`
const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
`
const HeaderLeft = styled(Row)`
`
const HeaderRight = styled.div``