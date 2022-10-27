import { Dropdown, Menu, Table, TableProps } from "antd"
import { ButtonNoPadding } from "components/lib"
import { Pin } from "components/pin"
import dayjs from "dayjs"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { useEditProject } from "utils/project"
import { projectListActons } from "./project-list.slice"
import { User } from "./search-panel"

export interface Project {
  id: number
  name: string
  personId: number
  organization: string
  created: number
  pin ?:boolean
}

interface ListProps extends TableProps<Project> {
  users: User[]
}

export const List = ({users, ...props}: ListProps ) => {
  const dispatch = useDispatch()
  const {mutate, isLoading} = useEditProject()
  const pinProject = (id:number) => (pin:boolean) => mutate({id, pin}) // 函数柯里化
  return(
    <Table
      pagination={false}
      rowKey={record => record.id}
      columns={[{
        title: <Pin checked disabled/>,
        render(value, project) {
          return <Pin 
            checked={project.pin || false} 
            onCheckedChange={pinProject(project.id)}
          />
        }
      },{
        title: '名称',
        dataIndex: 'name',
        sorter: (a,b) => a.name.localeCompare(b.name),
        render(value, project) {
          return <Link to={String(project.id)}>{project.name}</Link>
        }
      },{
        title: '部门',
        dataIndex: 'organization'
      },{
        title: '负责人',
        render(value, project) {
          return (
            <span>
              {users.find(user => user.id === project.personId)?.name || '未知'}
            </span>
          )
        }
      },{
        title: '创建时间',
        dataIndex: 'created',
        render(value, project) {
          return (
            <span>
              {value ? dayjs(value).format('YYYY-MM-DD'):'无'}
            </span>
          )
        }
      },{
        title: '操作',
        render(value, record, index) {
          return (
            <Dropdown overlay={
              <Menu>
                <Menu.Item key={'edit'}>
                  <ButtonNoPadding type="link" onClick={() => {
                    dispatch(projectListActons.openProjectModal())
                  }}>编辑</ButtonNoPadding>
                </Menu.Item>
              </Menu>
            }>
              <ButtonNoPadding type="link">...</ButtonNoPadding>
            </Dropdown>
          )
        },
      }]} 
      {...props}
      loading = {props.loading || isLoading}
    />
  )
}