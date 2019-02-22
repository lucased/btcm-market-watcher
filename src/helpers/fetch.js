import axios from 'axios'

const baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:4000' : ''

export default axios.create({
    baseURL
  });