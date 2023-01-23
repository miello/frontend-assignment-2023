import { isAfter, isBefore, isEqual } from 'date-fns'
import { useMemo } from 'react'
import { generateTime } from 'web/src/common/utils/date'

export const useDiscount = (discountedTimePeriod?: {
  begin: string
  end: string
}) => {
  const isDiscounted = useMemo(() => {
    if (!discountedTimePeriod) return

    const current = new Date()
    const start = generateTime(discountedTimePeriod?.begin)
    const end = generateTime(discountedTimePeriod?.end)

    return (
      (isAfter(current, start) || isEqual(current, start)) &&
      (isBefore(current, end) || isEqual(current, end))
    )
  }, [discountedTimePeriod])

  return { isDiscounted }
}
