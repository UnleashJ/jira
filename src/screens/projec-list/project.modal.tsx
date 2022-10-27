import { Drawer, Button } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { projectListActons, selectProjectModalOpen } from "./project-list.slice"

export const ProjectModal = () => {
  const dispatch = useDispatch()
  const projectModalOpen = useSelector(selectProjectModalOpen)
  
  return (
    <Drawer 
      width={'100%'} 
      open={projectModalOpen} 
      onClose={() => dispatch(projectListActons.closeProjectModal())}>
      <h1>编辑项目</h1>
      <Button onClick={() => dispatch(projectListActons.closeProjectModal())}>关闭</Button>
    </Drawer>
  )
}