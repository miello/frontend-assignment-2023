import { FC } from 'react'
import Divider from 'web/src/common/components/Divider'
import Image from 'web/src/common/components/Image'
import Loading from 'web/src/common/components/Loading'
import Typography from 'web/src/common/components/Typography'

import { useFullMenuData } from './hooks/useFullMenuData'
import { IFullMenuContent } from './types'

const FullMenuContent: FC<IFullMenuContent> = (props) => {
  const { menuName, restaurantId } = props
  const { data, isLoading, isError, isDiscounted } = useFullMenuData(
    restaurantId,
    menuName
  )

  return (
    <div className="flex justify-center items-center flex-col gap-5">
      <Typography className="m-auto text-xl pl-6 pr-6">{menuName}</Typography>
      {isLoading && <Loading />}
      {!isLoading && !isError && (
        <>
          <Image
            className="h-[200px]"
            containerclassname="w-full"
            src={data?.largeImage}
            alt="cover"
          />
          <div className="flex flex-col w-full pl-5 pr-5 gap-2">
            <div className="flex gap-1 items-center">
              <Typography className="text-xl">ราคา</Typography>
              <Typography
                className={`text-xl 
                ${isDiscounted ? 'line-through decoration-4 text-red-500' : ''}
                `}
              >
                {data?.fullPrice}
              </Typography>
              {isDiscounted && (
                <Typography className="text-xl">
                  {data?.discountedPrice}
                </Typography>
              )}
              <Typography className="text-xl">บาท</Typography>
            </div>

            <Divider />

            {data?.options.map((option) => (
              <div
                key={`option-${menuName}-${restaurantId}-${option.label}`}
                className="flex flex-col gap-1"
              >
                <Typography className="text-xl font-bold">
                  {option.label}
                </Typography>
                {option.choices.map((choice) => (
                  <div
                    key={`choice-${menuName}-${restaurantId}-${option.label}-${choice.label}`}
                    className="flex justify-between"
                  >
                    <Typography>{choice.label}</Typography>

                    {/* Placeholder */}
                    <Typography>ฟรี</Typography>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default FullMenuContent
