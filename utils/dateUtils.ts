// @/utils/dateUtils.ts
import { DateObject } from 'react-multi-date-picker'

export const calculateDaysBetweenDates = (startDate: string, endDate: string): number => {
  try {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const diffTime = end.getTime() - start.getTime()
    return Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1
  } catch (err) {
    console.error('Error calculating days:', err)
    return 0
  }
}

export const handleRangePickerDateChange = (
  newDates: [DateObject, DateObject] | null,
  onDateChange: (dates: string[]) => void
) => {
  if (!newDates || !newDates[0] || !newDates[1]) {
    onDateChange([])
    return {
      values: null,
      days: null
    }
  }

  const [start, end] = newDates
  const diffTime = end.toDate().getTime() - start.toDate().getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1

  const formattedDates = [
    start.format('YYYY/MM/DD'),
    end.format('YYYY/MM/DD')
  ]

  onDateChange(formattedDates)

  return {
    values: newDates,
    days: diffDays
  }
}