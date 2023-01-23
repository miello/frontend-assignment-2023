import { PORT } from './constants/env'
import app from './express'

try {
  app.listen(PORT, (): void => {
    console.log(`Connected successfully on port ${PORT}`)
  })
} catch (error) {
  console.error(`Error occured: ${(error as Error).message}`)
}
