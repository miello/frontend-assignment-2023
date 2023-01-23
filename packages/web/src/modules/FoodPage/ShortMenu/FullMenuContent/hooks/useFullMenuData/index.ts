import { AxiosError } from 'axios'
import { isAfter, isBefore, isEqual } from 'date-fns'
import { IErrorDTO, IFullMenuDTO } from 'libs/src/dtos'
import { useContext, useMemo } from 'react'
import { useQuery } from 'react-query'
import { apiClient } from 'web/src/common/config/axios'
import { AlertContext } from 'web/src/common/contexts/AlertContext'
import { generateTime } from 'web/src/common/utils/date'

export const useFullMenuData = (restaurantId: string, menuName: string) => {
  const { showAlert } = useContext(AlertContext)
  const { data, error, isError, isLoading } = useQuery<
    IFullMenuDTO,
    AxiosError<IErrorDTO>
  >(
    ['fullmenu', restaurantId, menuName],
    async () => {
      return (
        await apiClient.get<IFullMenuDTO>(
          `/restaurant/${restaurantId}/menu/${menuName}`
        )
      ).data
    },
    {
      onError: (err) =>
        showAlert({
          msg:
            err.response?.data.message ||
            err.response?.statusText ||
            err.message,
          type: 'error',
        }),
    }
  )

  const isDiscounted = useMemo(() => {
    if (!data || !data.discountedTimePeriod) return

    const current = new Date()
    const start = generateTime(data.discountedTimePeriod.begin)
    const end = generateTime(data.discountedTimePeriod.end)

    return (
      (isAfter(current, start) || isEqual(current, start)) &&
      (isBefore(current, end) || isEqual(current, end))
    )
  }, [data])

  return { data, error, isError, isLoading, isDiscounted }
}
