/**
 * Created by Witt on 2016/3/20.
 */
;(function (self, w, d) {
    if ('object' === typeof exports && 'undefined' !== typeof module) {
        module.exports = self(w, d)
    }else if(typeof define === 'function' && define.amd){
        define([],self(w, d))
    }else{
        w.sendAlert = w.seal = self(w, d);
    }
})(function (w, d) {
    var sendAlertDOM = {},
        _createDOM = function () {
        var _createStr = '<div class="send-alert"><div class="send-alert-bg"></div>'  +
                ' <div class="send-alert-content"><div class="send-alert-group">' +
                '<h2></h2><p></p><div class="send-alert-group-btn">' +
                '<button class="left">确定</button><button class="right">取消</button>' +
                '</div></div></div></div>';
        var _div = d.createElement('div');
        _div.innerHTML = _createStr;
        _div.setAttribute('id','sendAlert');
        sendAlertDOM = {
            div: _div,
            bg:_div.getElementsByClassName('send-alert-bg')[0],
            content: _div.getElementsByClassName('send-alert-content')[0],
            title: _div.getElementsByTagName('h2')[0],
            detail: _div.getElementsByTagName('p')[0]
        };
        d.body.appendChild(_div);
    },
    updateDOM = function (txt,close) {
        if (close) {
            sendAlertDOM.content.classList.add('two');
        }else{
            sendAlertDOM.content.classList.remove('two');
        }
        if (typeof txt === 'string') {
            sendAlertDOM.title.innerHTML = txt;
            sendAlertDOM.content.classList.add('title');
            return open();
        }
        if (typeof txt === 'object' && txt !== null &&  txt.constructor === Array) {
            sendAlertDOM.content.classList.remove('title');
            sendAlertDOM.title.innerHTML = txt[0];
            sendAlertDOM.detail.innerHTML = txt[1];
            return open()
        }
        return w.console.error('消息类型错误=>sendAlert')
    },
    open = function () {
        sendAlertDOM.bg.classList.add('change');
        sendAlertDOM.content.classList.add('change');
        var time = setTimeout(function () {
            sendAlertDOM.content.classList.add('show');
            clearTimeout(time);
        },350)
    },
    windowClose = function (callback, toggle) {
        sendAlertDOM.content.classList.remove('show');
        var time = setTimeout(function () {
            sendAlertDOM.content.classList.remove('change');
            sendAlertDOM.bg.classList.remove('change');
            clearTimeout(time);
        },350)
        callback ? callback(toggle) : '';
    },
    isNullObj = function (obj) {
        for(var i in obj){
            return false;
        }
        return true;
    },
    addEvent = function (t,callback) {
        var newEvent = function (e) {
            e.stopPropagation();
            if (e.target.className === 'left') {
                windowClose(t ? callback : '', true);
                sendAlertDOM.div.removeEventListener('click',newEvent);
            }
            if (e.target.className === 'right') {
                windowClose(t ? callback : '', false);
                sendAlertDOM.div.removeEventListener('click',newEvent);
            }
        };
        sendAlertDOM.div.addEventListener('click', newEvent);
    };

    var seal = function (text, callback, close) {
        var callbackToggle = Object.prototype.toString.call(callback) === '[object Function]';
        if (isNullObj (sendAlertDOM)) {
            _createDOM();
        }
        updateDOM(text,close ? close : null);
        addEvent(callbackToggle, callback);
    };
    return seal;
},typeof window !== 'undefined' ? window: this, document)