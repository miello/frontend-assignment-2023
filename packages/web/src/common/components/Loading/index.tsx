import { FC } from 'react'

import { ILoadingProps } from './types'

const Loading: FC<ILoadingProps> = (props) => {
  const { centerWindow } = props
  return (
    <div
      className={`${
        centerWindow
          ? 'absolute top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2'
          : ''
      }`}
    >
      <div
        className={`rounded-full origin-center animate-spin border-l-blue-600 border-[12px] w-20 h-20`}
      />
    </div>
  )
}

export default Loading
