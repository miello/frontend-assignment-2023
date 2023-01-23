import { useParams } from 'react-router-dom'
import Divider from 'web/src/common/components/Divider'
import Image from 'web/src/common/components/Image'
import Loading from 'web/src/common/components/Loading'
import Typography from 'web/src/common/components/Typography'

import ErrorPage from '../ErrorPage'
import { useRestaurantData } from './hooks/useRestaurantData'
import ShortMenu from './ShortMenu'

function FoodPage() {
  const params = useParams()
  const { id } = params

  const { isLoading, isError, restaurantData, error, isOpen } =
    useRestaurantData(id!)

  if (isLoading) return <Loading centerWindow={true} />
  if (isError)
    return (
      <ErrorPage
        message={
          error?.response?.data.message ||
          error?.response?.statusText ||
          error?.message ||
          'เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ'
        }
        status={error?.status || 500}
      />
    )

  return (
    <div className="flex flex-col md:items-center">
      <Image
        src={restaurantData?.coverImage}
        containerclassname="h-[300px] w-full"
      />
      <div className="md:min-w-[700px] m-6">
        <div className="flex items-center gap-3 mb-2">
          <Typography className="text-2xl font-semibold break-all">
            {restaurantData?.name}
          </Typography>
          <Typography
            className={`${isOpen ? 'bg-green-500' : 'bg-red-500'} 
            font-semibold pl-6 pr-6 text-white pt-1 pb-1 rounded-lg`}
          >
            {isOpen ? 'เปิด' : 'ปิด'}
          </Typography>
        </div>
        <Typography className="font-light mb-2 text-lg">{`เวลาเปิด - ปิด : ${restaurantData?.activeTimePeriod.open} - ${restaurantData?.activeTimePeriod.close}`}</Typography>
        <Divider className="mb-5" />
        <ShortMenu id={id!} />
      </div>
    </div>
  )
}

export default FoodPage
