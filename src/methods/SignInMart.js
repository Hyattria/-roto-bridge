import { SignIn } from '@freshservice/bridge'

/**
 *
 * SignInMart.init({ test: test, queryArray }).init().execute()
 * @export
 * @class SignInMart
 * @extends {SignIn}
 */
export default class SignInMart extends SignIn {
  constructor (args) {
    super(args)
    const queryArray = args['queryArray'] || []
    this.wechatUrl = `/sign/in?service=${encodeURIComponent(window.location.origin + window.location.pathname + window.location.hash)}` + `&${queryArray.join('&')}`
  }
}
