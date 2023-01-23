import { FC } from 'react'

import { ITypographyProps } from './types'

const Typography: FC<ITypographyProps> = (props) => {
  return <div {...props} className={`font-kanit ${props.className}`} />
}

export default Typography
