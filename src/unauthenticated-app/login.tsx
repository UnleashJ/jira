import { useAuth } from "context/auto-context"
import { Form, Input } from "antd"
import { LongButton } from "unauthenticated-app"
import { useAsync } from "utils/use-async"

export const LoginScreen = ({onError}: {onError: (error: Error) => void}) => {
  const {login, user} = useAuth()
  const {run, isLoading} = useAsync(undefined, {
    throwOnError: true
  })

  const handleSubmit = (values: {username: string, password: string}) => {
    run(login(values)).catch(error => {
      onError(error)
    })
  }
  return (
    <Form onFinish={handleSubmit}>
      {
        user && `登录成功，用户名：${user?.name}`
      }
      <Form.Item name={'username'} rules={[{required: true, message:'请输入用户名'}]}>
        <Input placeholder="用户名" type="text" id="username" />
      </Form.Item>
      <Form.Item name={'password'} rules={[{required: true, message:'请输入密码'}]}>
        <Input placeholder="密码" type="password" id="password" />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} type="primary" htmlType="submit">登录</LongButton>
      </Form.Item>
    </Form>
  )
}