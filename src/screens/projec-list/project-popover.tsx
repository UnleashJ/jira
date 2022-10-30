import styled from "@emotion/styled"
import { Popover, Typography, List, Divider, Button } from "antd"
import { ButtonNoPadding } from "components/lib"
import { useProjects } from "utils/project"
import { useProjectModal } from "./utils"

export const ProjectPopover = () => {
  const {open} = useProjectModal()
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
      <ButtonNoPadding type="link" onClick={open}>创建项目</ButtonNoPadding>
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