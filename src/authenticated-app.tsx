import styled from "@emotion/styled"
import { Button, Dropdown, Menu } from "antd"
import { Row } from "components/lib"
import { useAuth } from "context/auto-context"
import { ProjectListScreen } from "screens/projec-list"
import { ReactComponent as SoftwareLogo } from 'assets/software-logo.svg'
import { useDocumentTitle } from "utils"

export const AuthenticatedApp = () => {
  const {logout, user} = useAuth()
  useDocumentTitle('项目列表', false)
  return (
    <Container>
     <Header between={true}>
      {/* between={true} */}
        <HeaderLeft gap={true}>
          <SoftwareLogo width={'18rem'} color={'rgb(38, 132, 255)'}/>
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
      <main>
        <ProjectListScreen />
      </main>
    </Container>
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