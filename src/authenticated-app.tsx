import styled from "@emotion/styled"
import { Button } from "antd"
import { Row } from "components/lib"
import { useAuth } from "context/auto-context"
import { ProjectListScreen } from "screens/projec-list"

export const AuthenticatedApp = () => {
  const {logout} = useAuth()
  return (
    <Container>
     <Header>
      {/* between={true} */}
        <HeaderLeft gap={true}>
          <h2>Logo</h2>
          <h2>项目</h2>
          <h2>用户</h2>
        </HeaderLeft>
        <HeaderRight>
          <Button onClick={logout}>登出</Button>
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
const Header = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`
const HeaderLeft = styled(Row)`
`
const HeaderRight = styled.div``