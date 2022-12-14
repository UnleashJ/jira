import { Drawer, Button, Spin, Form, Input } from "antd"
import { useProjectModal, useProjectQuertKey } from "./utils"
import { UserSelect } from "components/user-select"
import { useAddProject, useEditProject } from "utils/project"
import { useForm } from "antd/es/form/Form"
import { useEffect, useMemo } from "react"
import { ErrorBox } from "components/lib"
import styled from "@emotion/styled"

export const ProjectModal = () => {
  // const {projectModalOpen, onClose} = props
  const queryKey = useProjectQuertKey()
  const {projectModalOpen, close, editingProject, isLoading} = useProjectModal()
  const useMutateProject = useMemo(() => {
    return editingProject ? useEditProject: useAddProject
  },[editingProject])

  const {mutateAsync, error, isLoading:mutateLoading} = useMutateProject(queryKey)
  const [form] = useForm()
  const onFinish = (values: any) => {
    mutateAsync({...editingProject, ...values}).then(() => {
      form.resetFields()
      close()
    })
  }

  const closeModal = () => {
    // 关闭的时候，情况form表单
    form.resetFields()
    close()
  }

  const title = editingProject? '编辑项目': '创建项目'

  useEffect(() => {
    form.setFieldsValue(editingProject)
  }, [editingProject, form])

  return (
    <Drawer forceRender={true} width={'100%'} open={projectModalOpen} onClose={closeModal}>
      <Container>
      {
        isLoading ?
          <Spin size="large"/> : 
          <>
            <h1>{title}</h1>
            <ErrorBox error={error}/>
            <Form form={form} layout="vertical" style={{width: '40rem'}} onFinish={onFinish}>
              <Form.Item label="项目名称" name={'name'} rules={[{required: true, message: '请输入项目名称'}]}>
                <Input placeholder="请输入项目名称"/>
              </Form.Item>

              <Form.Item label="部门" name={'organization'} rules={[{required: true, message: '请输入部门名称'}]}>
                <Input placeholder="请输入部门名称"/>
              </Form.Item>

              <Form.Item label="负责人" name={'personId'}>
                <UserSelect defaultOptionName={'负责人'}/>
              </Form.Item>

              <Form.Item style={{textAlign: 'right'}}>
                <Button loading={mutateLoading} type={'primary'} htmlType="submit">
                  提交
                </Button>
              </Form.Item>
            </Form>
          </>
      }
      </Container>
    </Drawer>
  )
}

const Container = styled.div`
  height: 80vh;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
`