/** @jsxImportSource @emotion/react */
import { Form, Input } from "antd"
import { UserSelect } from "components/user-select"
import { Project } from "./list"

export interface User {
  id: number
  name: string
  email: string
  title: string
  organization: string
  token: string
}
interface SearchPanelProps {
  users: User[],
  param: Partial<Pick<Project, 'name' | 'personId'>>, 
  setParam:  (param: SearchPanelProps['param']) => void
}

export const SearchPanel = ({users, param, setParam} : SearchPanelProps) => {
  return(
    <Form css={{ marginBottom: '2rem' }} layout="inline">
      <Form.Item>
        <Input 
          type="text" 
          value={param.name} 
          onChange={e => setParam({
            ...param,
            name:e.target.value
          })} 
          placeholder='请输入项目名称'
        />
        </Form.Item>
      <Form.Item>
        <UserSelect 
          value={param.personId} 
          defaultOptionName={'负责人'}
          onChange={value => setParam({
            ...param,
            personId: value
          })} 
        />
      </Form.Item> 
    </Form>
  )
}