export const calculateDiscounted = (fullPrice: number, percent: number) => {
  return (fullPrice * (100 - percent)) / 100
}
