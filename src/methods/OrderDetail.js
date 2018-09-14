import Link from '../utils/Link'

export default class OrderDetail extends Link {
  constructor (...args) {
    super(...args)
    this.nativeUrl = ''
    this.wechatUrl = '/order/detail/'
  }
}
