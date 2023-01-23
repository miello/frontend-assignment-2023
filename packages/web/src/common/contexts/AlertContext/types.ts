export type AlertType = 'info' | 'error'

export interface IAlert {
  type: AlertType
  msg: string
}

export interface IAlertProviderValue {
  showAlert: (alert: IAlert) => void
}
