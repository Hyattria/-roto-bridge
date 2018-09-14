import Action from '../utils/Action'
import { onActivityInfo } from '../axios'

export default class Activity extends Action {
  static init (options = {}) {
    return new this().setOptions(options)
  }
  constructor (options) {
    super(options)
    this.options = {
      SummaryId: -1,
      cityCode: this.getStorage(this.CITYNAME).CityFlag || 'sz'
    }
  }

  async request (data) {
    const response = await onActivityInfo(data)
    return response
  }

  wechat () {
    const data = this.options

    this.request(data).then(response => {
      if (!response.data.target || response.data.target.length === 0) {
        console.log(response.data.message)
      }
      this.successCallback(response)
    }).catch(e => {
      this.failCallback(e)
    })
  }
}
