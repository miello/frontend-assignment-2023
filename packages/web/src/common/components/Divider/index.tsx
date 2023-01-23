import { FC } from 'react'

import { IDividerProps } from './types'

const Divider: FC<IDividerProps> = (props) => {
  return (
    <div
      {...props}
      className={`w-full h-[3px] bg-gray-100 ${props.className}`}
    />
  )
}

export default Divider
