import api from '@/services/api'

export default {
  getAddress (address) {
    return api().get('address/' + address)
  },

  generateAddress () {
    return api().get('generateAddress')
  },

  makeDeposit (addressObj) {
    return api().post('addFaucetFunds', addressObj)
  },

  makeTransaction (transactionObj) {
    return api().post('addTransaction', transactionObj)
  }
}
