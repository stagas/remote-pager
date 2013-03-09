
# remote-pager

remote resource pager (or generic async pagination)

## Installing

```sh
$ component-install stagas/remote-pager
```

## Example

```js
// deps
var RemotePager = require('remote-pager')

// create pager
var pager = RemotePager()
pager.total(500).perpage(10).render().fetch(fetch).show(0)

// put items and nav in different places if you like
append(document.body, pager.itemsEl)
append(document.body, pager.el)

// our custom page fetcher
function fetch (i, fn) {
  // something async, like an ajax call
  setTimeout(function () {
    // callback response body
    fn('Successfully fetched page: '+(i+1))
  }, Math.random()*2000|0)
}
```

## API

Everything from [Pager](https://github.com/component/pager)

plus

### RemotePager.fetch(fn)

Sets a fetcher function. `fn` will be called with `(i, callback)`,
where `i` is a zero-indexed page number and `callback` expects
to be called with a body of type html.

## License

MIT
