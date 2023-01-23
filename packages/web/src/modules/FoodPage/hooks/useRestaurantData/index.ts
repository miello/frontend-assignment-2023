import { AxiosError } from 'axios'
import { isAfter, isBefore, isEqual } from 'date-fns'
import { IErrorDTO, IRestaurantDTO } from 'libs/src/dtos'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { apiClient } from 'web/src/common/config/axios'
import { generateTime } from 'web/src/common/utils/date'

export const useRestaurantData = (id: string) => {
  const [isOpen, setOpen] = useState(false)

  const { data, isLoading, error, isError } = useQuery<
    IRestaurantDTO,
    AxiosError<IErrorDTO>
  >([`restaurant-info`, id], async () => {
    return (await apiClient.get<IRestaurantDTO>(`/restaurant/${id}`)).data
  })

  useEffect(() => {
    if (!data) return

    const current = new Date()
    const start = generateTime(data.activeTimePeriod.open)
    const end = generateTime(data.activeTimePeriod.close)
    setOpen(
      (isAfter(current, start) || isEqual(current, start)) &&
        (isBefore(current, end) || isEqual(current, end))
    )

    const intervalId = setInterval(() => {
      const current = new Date()
      setOpen(
        (isAfter(current, start) || isEqual(current, start)) &&
          (isBefore(current, end) || isEqual(current, end))
      )
    }, 1000)

    return () => clearInterval(intervalId)
  }, [data])

  return { restaurantData: data, isLoading, error, isError, isOpen }
}
