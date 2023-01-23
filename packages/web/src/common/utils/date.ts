import { set } from 'date-fns'

export const generateTime = (time: string): Date => {
  if (!time.match(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/))
    throw new Error('Invalid time format: Expected 24 hour format')

  const [hour, minute] = time.split(':')
  return set(new Date(), {
    hours: parseInt(hour, 10),
    minutes: parseInt(minute, 10),
    milliseconds: 0,
    seconds: 0,
  })
}
