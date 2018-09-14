import Link from '../utils/Link'

export default class City extends Link {
  constructor (...args) {
    super(...args)
    this.nativeUrl = ''

    this.redirect = args['redirect'] || window.location.href
    this.wechatUrl = `/city?city_redirect=${encodeURIComponent(this.redirect)}`
  }
}
