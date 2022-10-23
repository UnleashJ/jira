/** @jsxImportSource @emotion/react */
import { Form, Input, Select } from "antd"

export interface User {
  id: string
  name: string
  token: string
}
interface SearchPanelProps {
  users: User[],
  param: {
    name: string
    personId: string
  },
  setParam:  (param: ((state: SearchPanelProps['param']) => SearchPanelProps['param']) | SearchPanelProps['param']) => void
}

export const SearchPanel = ({users, param, setParam} : SearchPanelProps) => {
  return(
    <Form css={{ marginBottom: '2rem' }} layout="inline">
      <Form.Item>
        <Input 
          type="text" 
          value={param.name} 
          onChange={e => setParam(state => ({
            ...state,
            name:e.target.value
          }))} 
          placeholder='请输入项目名称'
        />
        </Form.Item>
      <Form.Item>
        <Select value={param.personId} onChange={value => setParam({
          ...param,
          personId: value
        })}>
          <Select.Option value={''}>负责人</Select.Option>
          {
            users.map(user => (
              <Select.Option value={user.id} key={user.id}>{user.name}</Select.Option>
            ))
          }
        </Select>
      </Form.Item> 
    </Form>
  )
}