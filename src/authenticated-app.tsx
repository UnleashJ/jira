import styled from "@emotion/styled"
import { Button, Dropdown, Menu } from "antd"
import { FormProvider } from "antd/lib/form/context"
import { Row } from "components/lib"
import { useAuth } from "context/auto-context"
import { ProjectListScreen } from "screens/projec-list"
import { ReactComponent as SoftwareLogo } from 'assets/software-logo.svg'

export const AuthenticatedApp = () => {
  const {logout, user} = useAuth()
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
                <a onClick={logout}>登出</a>
              </Menu.Item>
            </Menu>
          }>
            <a onClick={e=> e.preventDefault()}>
              Hi, {user?.name}
            </a>
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