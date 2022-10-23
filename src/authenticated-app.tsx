import { Button } from "antd"
import { useAuth } from "context/auto-context"
import { ProjectListScreen } from "screens/projec-list"

export const AuthenticatedApp = () => {
  const {logout} = useAuth()
  return (
    <div>
      <Button onClick={logout}>登出</Button>
      <ProjectListScreen />
    </div>
  )
}