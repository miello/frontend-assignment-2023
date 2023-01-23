import { FC } from 'react'
import Image from 'web/src/common/components/Image'
import Typography from 'web/src/common/components/Typography'

import { useDiscount } from './hooks/useDiscount'
import { IShortMenuCardProps } from './types'

const ShortMenuCard: FC<IShortMenuCardProps> = (props) => {
  const { isDiscounted } = useDiscount(props.discountedTimePeriod)
  return (
    <div
      onClick={() => props.open(props.name)}
      className="flex gap-5 cursor-pointer hover:bg-gray-100 transition duration-200 ease-in-out rounded-md"
    >
      <Image
        src={props?.thumbnailImage}
        className="rounded-lg min-w-[100px] max-w-[125px] h-[125px]"
        alt={props.name}
        containerclassname="rounded-lg min-w-[125px] h-[125px]"
      />
      <div>
        <div className="flex gap-2 items-center">
          <Typography className="text-lg">{props.name}</Typography>
          {isDiscounted && (
            <Typography className="text-sm font-bold text-red-500 animate-pulse border-red-500 border-2 pl-2 pr-2 rounded-2xl">
              Sale
            </Typography>
          )}
        </div>
        <div className="flex gap-1 items-center">
          <Typography
            className={`text-lg 
            ${isDiscounted ? 'line-through decoration-4 text-red-500' : ''}
            `}
          >
            {props.fullPrice}
          </Typography>
          {isDiscounted && (
            <Typography className="text-lg">{props.discountedPrice}</Typography>
          )}
          <Typography className="text-lg">บาท</Typography>
        </div>
      </div>
    </div>
  )
}

export default ShortMenuCard
