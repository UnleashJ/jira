import styled from "@emotion/styled";
import { Button, Spin, Typography } from "antd";
import { DevTools } from 'jira-dev-tool';
import { useUndo } from "utils/use-undo";

export const Row = styled.div<{
  gap?:number | boolean,
  between?:boolean
  marginBottom?:number
}>`
  display: flex;
  align-items: center;
  justify-content: ${props => props.between ? 'space-between' : undefined};
  margin-bottom: ${props => props.marginBottom ? (props.marginBottom + 'rem') : '0rem'};
  > * {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    margin-right: ${props => typeof props.gap === "number" ? props.gap + 'rem' : props.gap ?  '2rem' : undefined};
  }
`

export const UnDo = () => {
  const [state, {set, reset, undo, redo, canRedo, canUndo}] = useUndo(0)
  return (
    <>
      <div>
        <Button onClick={() => set(state.present + 1)}>+</Button>
        <span>{state.present}</span>
        <Button onClick={() => set(state.present - 1)}>-</Button>
      </div>
      <div style={{marginBottom: '30rem'}}>
        <Button type="primary" disabled={!canUndo} onClick={undo}>undo</Button>
        <Button type="primary" disabled={!canRedo} onClick={redo}>redo</Button>
        <Button type="primary" onClick={() => reset()}> reset 0</Button>
      </div>
    </>
  )
}

const FullPage = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`
export const FullPageLoading = () => (
  <FullPage>
    <Spin size="large"/>
  </FullPage>
)

export const FullPageErrorFallback = ({error}: {error: Error | null}) => (
  <FullPage>
    <DevTools/>
    <Typography.Text type="danger">{error?.message}</Typography.Text>
  </FullPage>
)

export const ButtonNoPadding = styled(Button)`
  padding: 0;
`