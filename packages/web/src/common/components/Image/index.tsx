import { FC, useState } from 'react'

import { IImageProps } from './types'

const Image: FC<IImageProps> = (props) => {
  const [isLoading, setLoading] = useState(true)
  const [isError, setError] = useState(false)

  return (
    <div
      className={`bg-gray-400 ${props.containerclassname} 
      ${isLoading && props.src ? 'animate-pulse' : ''}`}
    >
      {!isError && (
        <img
          {...props}
          alt={props.alt}
          className={`w-full 
          ${props.className} 
          h-full object-center object-cover 
          ${isLoading ? 'opacity-0' : ''}`}
          crossOrigin={undefined}
          onLoad={() => setLoading(false)}
          onError={() => setError(true)}
        />
      )}
    </div>
  )
}

export default Image
