import { Table } from "antd"
import { User } from "./search-panel"

interface Project {
  id: string
  name: string
  personId: string
  organization: string

}

interface ListProps {
  list: Project[]
  users: User[]
}

export const List = ({list, users}:ListProps ) => {
  return(
    <Table 
      pagination={false}
      rowKey={record => record.id}
      columns={[{
        title: '名称',
        dataIndex: 'name',
        sorter: (a,b) => a.name.localeCompare(b.name)
      }, {
        title: '负责人',
        render(value, {personId}) {
          return (
            <span>
              {users.find(user => user.id === personId)?.name || '未知'}
            </span>
          )
        }
      }]} 
      dataSource={list}
    />
  )
}