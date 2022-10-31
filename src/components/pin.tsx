import { Rate } from "antd";

interface PinProps extends React.ComponentProps<typeof Rate> {
  checked: boolean,
  onCheckedChange?: (checked: boolean) => void
}

export const Pin = (props: PinProps) => {
  const {onCheckedChange} = props
  return (
    <Rate 
      count={1}
      value={Number(props.checked)}
      onChange={(value:number) => {
        onCheckedChange?.(!!value)
      }}
    />
  )
}