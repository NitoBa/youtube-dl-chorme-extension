import axios from 'axios'

const BASE_URL = import.meta.env.VITE_BASE_URL ?? 'http://localhost:3333'
console.log(import.meta.env.VITE_BASE_URL)
export const api = axios.create({
  baseURL: BASE_URL,
})
