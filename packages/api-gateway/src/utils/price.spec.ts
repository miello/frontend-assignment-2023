import { calculateDiscounted } from './price'

describe('price utils', () => {
  it('correctly calculate', () => {
    expect(calculateDiscounted(3, 70)).toEqual(0.9)
    expect(calculateDiscounted(90, 10)).toEqual(81)
  })
})
