import Action from '../utils/Action'
import { GetCartCount } from '../axios'

export default class GetCartCounts extends Action {
  static init (options = {}) {
    return new this().setOptions(options)
  }
  constructor (options) {
    super()
  }

  async request (city, token) {
    const response = await GetCartCount(city, token)
    return response
  }

  wechat () {
    const token = this.getStorage(this.TOKENNAME)
    const city = this.getStorage(this.CITYNAME)

    this.request(city, token).then(response => {
      if (response.data.Error !== 0) {
        console.log(response.data.message)
      }
      this.successCallback(response)
    }).catch(e => {
      this.failCallback(e)
    })
  }
}
