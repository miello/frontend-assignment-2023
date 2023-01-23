import { generateTime } from './date'

describe('Date utils', () => {
  describe('generateTime', () => {
    it('valid data', () => {
      const result = generateTime('23:59')

      expect(result.getHours()).toEqual(23)
      expect(result.getMinutes()).toEqual(59)
      expect(result.getSeconds()).toEqual(0)
      expect(result.getMilliseconds()).toEqual(0)
    })
    it('throw error if bad format', () => {
      const result = new Promise((resolve, reject) => {
        try {
          const date = generateTime('Hello:World')
          resolve(date)
        } catch (err) {
          reject(err)
        }
      })

      return expect(result).rejects.toThrowError(
        new Error('Invalid time format: Expected 24 hour format')
      )
    })
  })
})
