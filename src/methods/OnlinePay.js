import Link from '../utils/Link'

export default class OnlinePay extends Link {
  constructor (...agrs) {
    super(...agrs)
    const queryArray = agrs['queryArray'] || []
    this.wechatUrl = `/wxpay/in?service=${encodeURIComponent(window.location.origin + window.location.pathname + window.location.hash)}` + `&${queryArray.join('&')}`
  }
}
