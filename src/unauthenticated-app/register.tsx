import { Form, Input } from "antd"
import { useAuth } from "context/auto-context"
import { LongButton } from "unauthenticated-app"
import { useAsync } from "utils/use-async"
import { useMount } from "utils"

export const RegisterScreen = ({onError}: {onError: (error: Error | null) => void}) => {
  const {register} = useAuth()
  const {run, isLoading} = useAsync(undefined, {
    throwOnError: true
  })

  useMount(() => {
    onError(null)
  })

  const handleSubmit = async ({cpassword, ...values}: {username: string, password: string, cpassword: string}) => {
    if(cpassword !== values.password) {
      onError(new Error('两次输入的密码不相同，请重新输入'))
      return
    }
    try {
      await run(register(values))
      onError(null)
    } catch (error) {
      onError(error as Error)
    }
  }
  return (
    <Form onFinish={handleSubmit}>
      <Form.Item name={'username'} rules={[{required: true, message:'请输入用户名'}]}>
        <Input placeholder="用户名" type="text" id="username" />
      </Form.Item>
      <Form.Item name={'password'} rules={[{required: true, message:'请输入密码'}]}>
        <Input placeholder="密码" type="password" id="password" />
      </Form.Item>
      <Form.Item name={'cpassword'} rules={[{required: true, message:'请确认密码'}]}>
        <Input placeholder="确认密码" type="password" id="cpassword" />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} type="primary" htmlType="submit">注册</LongButton>
      </Form.Item>
  </Form>
  )
}