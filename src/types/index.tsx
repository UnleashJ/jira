export type Raw = string | number

export interface Project {
  id: number
  name: string
  personId: number
  organization: string
  created: number
  pin ?:boolean
}

export interface User {
  id: number
  name: string
  email: string
  title: string
  organization: string
  token: string
}

export interface Kanban {
  id: number
  name: string
  projectId: number
}

export interface Task {
  id: number
  name: string
  processorId: number // 任务经办人
  projectId: number
  epicId: number // 任务组
  kanbanId: number
  typeId: number // bug or task
  note: string
}

export interface TaskType {
  id: number
  name: string
}