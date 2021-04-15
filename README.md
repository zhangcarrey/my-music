## 仿酷狗音乐小程序

### 首次提交
+ 目前还是个低配版，只有简单的音乐播放功能，后续准备通过云开发增添更多的功能
+ 微信小程序背景音频播放目前好像还有点问题，所以简单的播放功能也有待完善，之能等后面API的修复和完善

src\monitor\lib\jsError.js
```
import tracker from '../util/tracker';
import getLastEvent from '../util/getLastEvent';
import getSelector from '../util/getSelector';
import formatTime from '../util/formatTime';
export function injectJsError() {
    //一般JS运行时错误使用window.onerror捕获处理
    window.addEventListener('error', function (event) {
        let lastEvent = getLastEvent();
        if (event.target && (event.target.src || event.target.href)) {
            tracker.send({//资源加载错误
                kind: 'stability',//稳定性指标
                type: 'error',//resource
                errorType: 'resourceError',
                filename: event.target.src || event.target.href,//加载失败的资源
                tagName: event.target.tagName,//标签名
                timeStamp: formatTime(event.timeStamp),//时间
                selector: getSelector(event.path || event.target),//选择器
            })
        } else {
            tracker.send({
                kind: 'stability',//稳定性指标
                type: 'error',//error
                errorType: 'jsError',//jsError
                message: event.message,//报错信息
                filename: event.filename,//报错链接
                position: (event.lineNo || 0) + ":" + (event.columnNo || 0),//行列号
                stack: getLines(event.error.stack),//错误堆栈
                selector: lastEvent ? getSelector(lastEvent.path || lastEvent.target) : ''//CSS选择器
            })
        }
    }, true);// true代表在捕获阶段调用,false代表在冒泡阶段捕获,使用true或false都可以

    //当Promise 被 reject 且没有 reject 处理器的时候，会触发 unhandledrejection 事件
    window.addEventListener('unhandledrejection', function (event) {
        let lastEvent = getLastEvent();
        let message = '';
        let line = 0;
        let column = 0;
        let file = '';
        let stack = '';
        if (typeof event.reason === 'string') {
            message = event.reason;
        } else if (typeof event.reason === 'object') {
            message = event.reason.message;
        }
        let reason = event.reason;
        if (typeof reason === 'object') {
            if (reason.stack) {
                var matchResult = reason.stack.match(/at\s+(.+):(\d+):(\d+)/);
                if (matchResult) {
                    file = matchResult[1];
                    line = matchResult[2];
                    column = matchResult[3];
                }
                stack = getLines(reason.stack);
            }
        }
        tracker.send({//未捕获的promise错误
            kind: 'stability',//稳定性指标
            type: 'error',//jsError
            errorType: 'promiseError',//unhandledrejection
            message: message,//标签名
            filename: file,
            position: line + ':' + column,//行列
            stack,
            selector: lastEvent ? getSelector(lastEvent.path || lastEvent.target) : ''
        })
    }, true);// true代表在捕获阶段调用,false代表在冒泡阶段捕获,使用true或false都可以
}
function getLines(stack) {
    if (!stack) {
        return '';
    }
    return stack.split('\n').slice(1).map(item => item.replace(/^\s+at\s+/g, '')).join('^');
}
```

src\monitor\util\formatTime.js
```
export default (time) => {
    return `${time}`.split(".")[0]
}
```

src\monitor\util\getLastEvent.js
```
let lastEvent;
['click','pointerdown', 'touchstart', 'mousedown', 'keydown', 'mouseover'].forEach(event => {
    document.addEventListener(event, (event) => {
        lastEvent = event;
    }, {
        capture: true,//capture 控制监听器是在捕获阶段执行还是在冒泡阶段执行 
        passive: true //passive 的意思是顺从的，表示它不会对事件的默认行为说 no
    });
});
export default function () {
    return lastEvent;
};
```
src\monitor\util\getSelector.js
```
const getSelector = function (path) {
    return path.reverse().filter(function (element) {
        return element !== window && element !== document;
    }).map(function (element) {
        var selector;
        if (element.id) {
            selector = `#${element.id}`;
        } else if (element.className && typeof element.className === 'string') {
            selector = '.' + element.className.split(' ').filter(function (item) { return !!item }).join('.');
        } else {
            selector = element.nodeName;
        }
        return selector;
    }).join(' ');
}
export default function (pathsOrTarget) {
    if (Array.isArray(pathsOrTarget)) {
        return getSelector(pathsOrTarget);
    } else {
        var paths = [];
        var element = pathsOrTarget;
        while (element) {
            paths.push(element);
            element = element.parentNode;
        }
        return getSelector(paths);
    }
}
```

src\monitor\util\tracker.js
```
let host = 'cn-beijing.log.aliyuncs.com';
let project = 'zhufengmonitor';
let logstore = 'zhufengmonitor-store';
var userAgent = require('user-agent')
function getExtraData() {
    return {
        title: document.title,
        url: location.href,
        timestamp: Date.now(),
        userAgent: userAgent.parse(navigator.userAgent).name
    };
}

class SendTracker {
    constructor() {
        this.url = `http://${project}.${host}/logstores/${logstore}/track`;
        this.xhr = new XMLHttpRequest();
    }
    send(data = {}, callback) {
        let extraData = getExtraData();
        let logs = { ...extraData, ...data };
        for (let key in logs) {
            if (typeof logs[key] === 'number') {
                logs[key] = "" + logs[key];
            }
        }
        console.log(logs);
        console.log(JSON.stringify(logs, null, 2));
        let body = JSON.stringify({
            __logs__: [logs]
        });
        this.xhr.open("POST", this.url, true);
        this.xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        this.xhr.setRequestHeader('x-log-apiversion', '0.6.0');
        this.xhr.setRequestHeader('x-log-bodyrawsize', body.length);
        this.xhr.onload = function () {
            if ((this.status >= 200 && this.status <= 300) || this.status == 304) {
                callback && callback();
            }
        }
        this.xhr.onerror = function (error) {
            console.log('error', error);
        }
        this.xhr.send(body);
    }
}

export default new SendTracker();
```
src\index.html
```
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>monitor</title>
</head>

<body>
    <div id="container">
        <div class="content">
+            <input type="button" value="发起ajax成功请求" onclick="sendAjaxSuccess()" />
+            <input type="button" value="发起ajax失败请求" onclick="sendAjaxError()" />
        </div>
    </div>

    <script>
+        function sendAjaxSuccess() {
+            let xhr = new XMLHttpRequest;
+            xhr.open('GET', '/success', true);
+            xhr.responseType = 'json';
+            xhr.onload = function () {
+                console.log(xhr.response);
+            }
+            xhr.send();
+        }
+        function sendAjaxError() {
+            let xhr = new XMLHttpRequest;
+            xhr.open('POST', '/error', true);
+            xhr.responseType = 'json';
+            xhr.onload = function () {
+                console.log(xhr.response);
+            }
+            xhr.onerror = function (error) {
+                console.log(error);
+            }
+            xhr.send("name=zhufeng");
        }
    </script>
</body>

</html>
```

webpack.config.js

```
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode: 'development',
    context: process.cwd(),
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'monitor.js'
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
+        before(router) {
+            router.get('/success', function (req, res) {
+                res.json({ id: 1 });
+            });
+            router.post('/error', function (req, res) {
+                res.sendStatus(500);
+            });
+        }
    },
    module: {},
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: 'head'
        })
    ],

}
```

src\monitor\lib\xhr.js
```
import tracker from '../util/tracker';
export function injectXHR() {
    let XMLHttpRequest = window.XMLHttpRequest;
    let oldOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function (method, url, async, username, password) {
        if (!url.match(/logstores/) && !url.match(/sockjs/)) {
            this.logData = {
                method, url, async, username, password
            }
        }
        return oldOpen.apply(this, arguments);
    }
    let oldSend = XMLHttpRequest.prototype.send;
    let start;
    XMLHttpRequest.prototype.send = function (body) {
        if (this.logData) {
            start = Date.now();
            let handler = (type) => (event) => {
                let duration = Date.now() - start;
                let status = this.status;
                let statusText = this.statusText;
                tracker.send({//未捕获的promise错误
                    kind: 'stability',//稳定性指标
                    type: 'xhr',//xhr
                    eventType: type,//load error abort
                    pathname: this.logData.url,//接口的url地址
                    status: status + "-" + statusText,
                    duration: "" + duration,//接口耗时
                    response: this.response ? JSON.stringify(this.response) : "",
                    params: body || ''
                })
            }
            this.addEventListener('load', handler('load'), false);
            this.addEventListener('error', handler('error'), false);
            this.addEventListener('abort', handler('abort'), false);
        }
        oldSend.apply(this, arguments);
    };
}
```
src\monitor\lib\blankScreen.js
```
import tracker from '../util/tracker';
import onload from '../util/onload';
function getSelector(element) {
    var selector;
    if (element.id) {
        selector = `#${element.id}`;
    } else if (element.className && typeof element.className === 'string') {
        selector = '.' + element.className.split(' ').filter(function (item) { return !!item }).join('.');
    } else {
        selector = element.nodeName.toLowerCase();
    }
    return selector;
}
export function blankScreen() {
    const wrapperSelectors = ['body', 'html', '#container', '.content'];
    let emptyPoints = 0;
    function isWrapper(element) {
        let selector = getSelector(element);
        if (wrapperSelectors.indexOf(selector) >= 0) {
            emptyPoints++;
        }
    }
    onload(function () {
        let xElements, yElements;
        debugger
        for (let i = 1; i <= 9; i++) {
            xElements = document.elementsFromPoint(window.innerWidth * i / 10, window.innerHeight / 2)
            yElements = document.elementsFromPoint(window.innerWidth / 2, window.innerHeight * i / 10)
            isWrapper(xElements[0]);
            isWrapper(yElements[0]);
        }
        if (emptyPoints >= 0) {
            let centerElements = document.elementsFromPoint(window.innerWidth / 2, window.innerHeight / 2)
            tracker.send({
                kind: 'stability',
                type: 'blank',
                emptyPoints: "" + emptyPoints,
                screen: window.screen.width + "x" + window.screen.height,
                viewPoint: window.innerWidth + 'x' + window.innerHeight,
                selector: getSelector(centerElements[0]),
            })
        }
    });
}
```
