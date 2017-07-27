/**
 * Created by Witt on 2016/3/20.
 */
;(function (self, w, d) {
  if ('object' === typeof exports && 'undefined' !== typeof module) {
    module.exports = self(w, d)
  } else if (typeof define === 'function' && define.amd) {
    define([], self(w, d))
  } else {
    w.sendAlert = w.seal = self(w, d)
  }
})(function (w, d) {
  let sendAlertDOM = {},
    _createDOM = () => {
      const _createStr = '<div class="send-alert"><div class="send-alert-bg"></div>' +
        ' <div class="send-alert-content"><div class="send-alert-group">' +
        '<h2></h2><p></p><div class="send-alert-group-btn">' +
        '<button class="left">确定</button><button class="right">取消</button>' +
        '</div></div></div></div>'
      const _div = d.createElement('div')
      _div.innerHTML = _createStr
      _div.setAttribute('id', 'sendAlert')
      sendAlertDOM = {
        div: _div,
        bg: _div.getElementsByClassName('send-alert-bg')[0],
        content: _div.getElementsByClassName('send-alert-content')[0],
        title: _div.getElementsByTagName('h2')[0],
        detail: _div.getElementsByTagName('p')[0],
      }
      d.body.appendChild(_div)
    },
    updateDOM = (txt, close) => {
      sendAlertDOM.content.classList[close ? 'add' : 'remove']('two')
      if (toString.call(txt) === '[object String]') {
        sendAlertDOM.title.innerHTML = txt
        sendAlertDOM.content.classList.add('title')
        return open()
      }
      if (Array.isArray(tet)) {
        sendAlertDOM.content.classList.remove('title')
        sendAlertDOM.title.innerHTML = txt[0]
        sendAlertDOM.detail.innerHTML = txt[1]
        return open()
      }
      return w.console.error('消息类型错误=>sendAlert')
    },
    open = () => {
      sendAlertDOM.bg.classList.add('change')
      sendAlertDOM.content.classList.add('change')
      const timer = setTimeout(() => {
        sendAlertDOM.content.classList.add('show')
        clearTimeout(timer)
      }, 350)
    },
    windowClose = (callback, toggle) => {
      sendAlertDOM.content.classList.remove('show')
      const timer = setTimeout(() => {
        sendAlertDOM.content.classList.remove('change')
        sendAlertDOM.bg.classList.remove('change')
        clearTimeout(timer)
      }, 350)
      callback && callback(toggle)
    },
    isNullObj = obj => Object.getOwnPropertyNames(obj).length === 0,
    addEvent = (t, done) => {
      const handle = (e) => {
        e.stopPropagation()
        const isPositive = e.target.className === 'left'
        windowClose(t ? done : '', isPositive)
        sendAlertDOM.div.removeEventListener('click', handle)
      }
      sendAlertDOM.div.addEventListener('click', handle)
    }
    const seal = (text, done, close) => {
      const callbackToggle = Object(done) === done
      isNullObj(sendAlertDOM) && _createDOM()
      updateDOM(text, close || null)
      addEvent(callbackToggle, done)
  }
  return seal
}, typeof window !== 'undefined' ? window : this, document)





