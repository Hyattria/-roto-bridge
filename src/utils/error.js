import $ from 'jquery'

//显示错误提示
export function errorTipsShow(e) {
  if ($('.error-tips').length == 0) {
    $('body').append('<div class="error-tips"></div>')
  }
  $(".error-tips").html(e).show()
  setTimeout(function () {
    $(".error-tips").addClass('error-tips-visible').addClass('error-tips-transition')
  }, 10)
  setTimeout(function () {
    errorTipsHide()
  }, 3e3)
}

//关闭错误提示
export function errorTipsHide() {
  $(".error-tips").removeClass('error-tips-visible');
  setTimeout(function () {
    $(".error-tips").remove()
  }, 200)
}
