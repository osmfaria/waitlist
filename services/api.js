import axios from 'axios'

export const nextapi = axios.create({
  baseURL: '/api',
})
