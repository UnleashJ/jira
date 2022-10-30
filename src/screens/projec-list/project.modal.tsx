import { Drawer, Button } from "antd"
import { useProjectModal } from "./utils"

export const ProjectModal = () => {
  // const {projectModalOpen, onClose} = props
  const {projectCreate, close:onClose} = useProjectModal()
  
  return (
    <Drawer width={'100%'} open={projectCreate} onClose={onClose}>
      <h1>编辑项目</h1>
      <Button onClick={onClose}>关闭</Button>
    </Drawer>
  )
}