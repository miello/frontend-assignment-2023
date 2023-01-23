import axios from 'axios'
import { API_SERVER_URL } from 'api-gateway/src/constants/env'

export const apiClient = axios.create({
  baseURL: API_SERVER_URL,
  timeout: 3000,
})
