import styled from "@emotion/styled"
import { useDocumentTitle } from "utils"
import { useKanbans } from "utils/kanban"
import { KanbanColumn } from "./kanban-column"
import { useKanbansSearchParams, useProjectInUrl } from "./util"

export const KanbanScreen = () => {
  useDocumentTitle('看板列表')
  const {data: kanbans} = useKanbans(useKanbansSearchParams())
  const {data: currentProject} = useProjectInUrl()
  
  return (
    <div>
      <h1>{currentProject?.name}看板</h1>
      <ColumnsContainer>
        {
          kanbans?.map(kanban => <KanbanColumn key={kanban.id} kanban={kanban}/>)
        }
      </ColumnsContainer>
    </div>
  )
}

const ColumnsContainer = styled.div`
  display: flex;
  overflow: hidden;
  margin-right: 2rem;
`