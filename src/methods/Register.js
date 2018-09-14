import Action from '../utils/Action'
import { onRegisterBySms } from '../axios'

export default class Register extends Action {
  static init (options = {}) {
    return new this().setOptions(options)
  }
  constructor (options = {}) {
    super(options)
    this.options = {
      Phone: '',
      SmsCode: '',
      SourceType: this.getStorage(this.TOKENNAME).SourceType,
      ActivityId: -1,
      ActivityType: -1,
      Channel: 0,
      JobNumber: '0000000',
      WorkStationId: 0,
      ReferPhone: '',
      IsSmsCodeRegister: true,
      cityFlag: this.getStorage(this.CITYNAME).CityFlag || 'sz',
      RegisterMethod: this.getUserAgent(),
      RegisterType: this.originData.activityType
    }
  }

  async request (data) {
    const response = await onRegisterBySms(data)
    return response
  }

  wechat () {
    const data = this.options
    this.request(data).then(response => {
      if (!response.data.Data) {
        console.log(response.data.Message)
      }
      this.successCallback()
    }).catch(e => {
      this.failCallback(e)
    })
  }
}
