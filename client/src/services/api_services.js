import api from '@/services/api'

export default {
  getAddress (address) {
    return api().get('address/' + address)
  },

  generateAddress () {
    return api().post('generateAddress')
  },

  addFunds (addressObj) {
    return api().post('generateAddress', addressObj)
  }
}
