import axios from './axios'

const API = process.env.NODE_ENV === 'production' ? 'https://thk.34580.com' : 'https://wechaty.34580.com'
const WXURL = process.env.NODE_ENV === 'production' ? 'https://wechatx.34580.com' : 'https://wechaty.34580.com'

// wxconfig
export function wxConfig (params) {
  return axios({
    method: 'post',
    url: `${WXURL}/sz/WxAPP/JsSdkSignature`,
    data: {
      ServiceName: 'wechatpublic',
      SourceType: 9,
      url: params
    }
  })
}

/**
 * 是否是Max会员
 * @export
 * @param {*} [city={}]
 * @param {*} [data={}]
 * @returns
 */
export function IsMaxMember (city = {}, data = {}) {
  return axios({
    method: 'post',
    url: `${WXURL}/${city.CityFlag}/Member/MaxMemberInfoRequest`,
    data: {
      accesstoken: data.AccessToken,
      customerguid: data.CustomerGuid,
      sourcetype: data.SourceType || 9,
      maxmemberversion: 1
    },
    params: {
      accesstoken: data.AccessToken,
      customerguid: data.CustomerGuid,
      sourcetype: data.SourceType || 9,
      maxmemberversion: 1
    }
  })
}

export function GetCartCount (city = {}, data = {}) {
  return axios({
    method: 'get',
    url: `${WXURL}/${city.CityFlag}/ShoppingCart/CartCountRequest`,
    data: {
      accesstoken: data.AccessToken,
      customerguid: data.CustomerGuid,
      sourcetype: data.SourceType || 9
    },
    params: {
      accesstoken: data.AccessToken,
      customerguid: data.CustomerGuid,
      sourcetype: data.SourceType || 9
    }
  })
}

// 注册
export function onRegisterBySms (data = {}) {
  return axios({
    method: 'post',
    // url: `/${data.cityFlag}/Sign/CustomerRegisterActivity`,
    url: `${API}/promotionactivity/api/promotionactivity/${
      data.cityFlag
    }/register`,
    data
  })
}

// 获取 活动详情
export function onActivityInfo (data = {}) {
  return axios({
    method: 'get',
    url: `${API}/promotionactivity/api/promotionactivitymanage/activitysummary/${
      data.SummaryId
    }/${data.cityCode}`
  })
}
