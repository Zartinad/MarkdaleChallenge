import axios from 'axios'

const port = process.env.PORT || 8080

export default() => {
  return axios.create({
    baseURL: `/`
  })
}
