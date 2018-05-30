export const CITY = {
  get () {
    const TOCCITY = localStorage.getItem('TOCCITY')
    return TOCCITY ? JSON.parse(TOCCITY).CityFlag : ''
  }
}

export const TOKEN = {
  get () {
    const TOCTOKEN = localStorage.getItem('TOCTOKEN')
    return TOCTOKEN ? JSON.parse(TOCTOKEN) : {}
  }
}
