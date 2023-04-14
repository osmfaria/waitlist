import axios from "axios"

export const tablesready = axios.create({
  baseURL: '/api/tablesready',
})

export const nextapi = axios.create({
  baseURL: '/api'
})