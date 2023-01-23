import { IShortMenuDTO } from 'libs/src/dtos'

export interface IShortMenuCardProps extends IShortMenuDTO {
  open(menuName: string): void
}
