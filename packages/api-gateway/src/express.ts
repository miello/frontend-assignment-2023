import cors from 'cors'
import express, { Application, NextFunction, Request, Response } from 'express'
import RestaurantController from './restaurant/restaurant.controller'
import { processError } from './utils/errorHelper'

const app: Application = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use('/restaurant', RestaurantController)
app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err)
  }
  processError(err, res)
})

export default app
