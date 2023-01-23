import axios from 'axios'
import { API_GATEWAY_URL } from 'web/src/common/constants/env'

export const apiClient = axios.create({
  baseURL: API_GATEWAY_URL,
  timeout: 5000,
})
