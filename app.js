function Observer (data) {
  this.data = data
  this.walk(data)
}

Observer.prototype = {
  walk: function (data) {
    Object.keys(data).forEach(key => {
      this.defineReactive(data, key, data[key]);
    })
  },
  defineReactive: function (data, key, item) {
    observer(item)
    Object.defineProperty(data, key, {
      get: function () {
        return item
      },
      set: function (newVal) {
        item = newVal
        console.log(`${key}已被监控，当前值为${newVal}`)
      }
    })
  }
}

function observer (data) {
  if (!data || typeof data !== 'object') {
    return
  }
  return new Observer(data)
}

var library = {
  book1: {
    name: ''
  },
  book2: ''
}

observer(library)
library.book1.name = 'vue权威指南'
library.book2 = '没有此书籍'
