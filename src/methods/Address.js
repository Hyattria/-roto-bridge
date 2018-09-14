import Link from '../utils/Link'

export default class Address extends Link {
  constructor (...agrs) {
    super(...agrs)
    this.nativeUrl = ''
    this.wechatUrl = '/order/submit/address'
  }
}
