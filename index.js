
/**
 * ajax-pager
 */

var Pager = require('pager')
var Spin = require('spin')

module.exports = function () {
  var cache = []
  var inFlight = []
  var spinner
  var pager = new Pager

  pager.itemsEl = document.createElement('ul')
  pager.itemsEl.className = 'pager-items'
  pager.items = []

  pager.fetch = function (fn) {
    for (var i=0, len=pager.pages(); i<len; i++) {
      var li = document.createElement('li')
      li.className = 'pager-item' + (0!=i ? ' pager-item-hide' : '')
      pager.items.push(li)
      pager.itemsEl.appendChild(li)
    }
    pager._fetch = fn
    return this
  }

  pager.on('show', function(n){
    if (pager.activeItem) pager.activeItem.classList.add('pager-item-hide')
    pager.activeItem = pager.items[n]
    if (spinner && pager.activeItem !== spinner.parent) {
      spinner.remove()
      spinner = null
    }
    pager.activeItem.classList.remove('pager-item-hide')
    if (!~cache.indexOf(n) && !~inFlight.indexOf(n)) {
      setTimeout(function () {
        spinner = Spin(pager.activeItem)
        spinner.parent = pager.activeItem
        pager.emit('fetch', n, pager.activeItem)
      }, 0)
    }
  })

  pager.on('fetch', function(n, curr){
    inFlight.push(n)
    pager._fetch(n, function (res) {
      var idx = inFlight.indexOf(n)
      inFlight.splice(idx, 1)
      if (!res) return
      cache.push(n)
      if (spinner && curr === spinner.parent) {
        spinner.remove()
        spinner = null
      }
      curr.innerHTML = res
    })
  })

  return pager
}
