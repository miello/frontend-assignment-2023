export interface IPaginationProps {
  next: () => void
  prev: () => void
  // eslint-disable-next-line no-unused-vars
  jumpTo: (page: number) => void
  maxPage: number
  current: number
}
