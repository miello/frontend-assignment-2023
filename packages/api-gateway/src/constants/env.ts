import { config } from 'dotenv'

config()

export const PORT = parseInt(process.env.PORT || '3001', 10)
export const API_SERVER_URL = process.env.API_SERVER_URL || ''
