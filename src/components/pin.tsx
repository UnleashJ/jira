import { Rate } from "antd";
import { useState } from "react";

interface PinProps extends React.ComponentProps<typeof Rate> {
  checked: boolean,
  onCheckedChange?: (checked: boolean) => Promise<any>
}

export const Pin = (props: PinProps) => {
  const [checked, setChecked] = useState(props.checked)
  const {onCheckedChange, ...restProps} = props
  return (
    <Rate 
      count={1}
      value={Number(checked)}
      onChange={(value:number) => {
        onCheckedChange?.(!!value)
          .then(() => {
            console.log('更新')
            setChecked(!!value)
          })
      }}
    />
  )
}