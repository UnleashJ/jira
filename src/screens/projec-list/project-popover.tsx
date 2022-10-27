import styled from "@emotion/styled"
import { Popover, Typography, List, Divider } from "antd"
import { ButtonNoPadding } from "components/lib"
import { useDispatch } from "react-redux"
import { useProjects } from "utils/project"
import { projectListActons } from "./project-list.slice"

export const ProjectPopover = () => {
  const dispatch = useDispatch()
  const {list:projects} = useProjects()
  const pinnedProjects = projects?.filter(project => project.pin)
  const content = (
    <ContentContainer>
      <Typography.Text type="secondary">收藏项目</Typography.Text>
      <List 
        dataSource={pinnedProjects}
        renderItem={ item => <List.Item>
          <List.Item.Meta title={item.name}/>
        </List.Item>}
      />
      <Divider />
      <ButtonNoPadding type="link" onClick={() => {
        dispatch(projectListActons.openProjectModal())
      }}>创建项目</ButtonNoPadding>
    </ContentContainer>
  )

  return (
    <Popover placement="bottom" content={content} zIndex={1}>
      <span>项目</span>
    </Popover>
  )
}


const ContentContainer = styled.div`
  min-width: 30rem;
`