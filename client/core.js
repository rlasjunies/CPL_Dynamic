var core;
(function (core) {
    var _app;
    function app() {
        return _app;
    }
    core.app = app;
    function setApp(w, debug) {
        if (typeof debug === "undefined") { debug = false; }
        _app = new App(window, debug);
        window.onerror = function (msg, url, line) {
            core.app().log(eLogSeverity.critical, new Error(msg));
            if(_app.debug()) {
                return false;
            } else {
                return true;
            }
        };
    }
    core.setApp = setApp;
    var App = (function () {
        function App(w, debug) {
            if (typeof debug === "undefined") { debug = false; }
            this._debug = debug;
        }
        App.prototype.log = function (sev, err) {
            if(this._debug) {
                throw err;
            }
        };
        App.prototype.debug = function () {
            return this._debug;
        };
        return App;
    })();
    core.App = App;    
    (function (eCallbackSignatureStatus) {
        eCallbackSignatureStatus._map = [];
        eCallbackSignatureStatus._map[0] = "ok";
        eCallbackSignatureStatus.ok = 0;
        eCallbackSignatureStatus._map[1] = "error";
        eCallbackSignatureStatus.error = 1;
    })(core.eCallbackSignatureStatus || (core.eCallbackSignatureStatus = {}));
    var eCallbackSignatureStatus = core.eCallbackSignatureStatus;
    ;
    (function (eLogSeverity) {
        eLogSeverity._map = [];
        eLogSeverity._map[0] = "critical";
        eLogSeverity.critical = 0;
        eLogSeverity._map[1] = "warning";
        eLogSeverity.warning = 1;
        eLogSeverity._map[2] = "information";
        eLogSeverity.information = 2;
    })(core.eLogSeverity || (core.eLogSeverity = {}));
    var eLogSeverity = core.eLogSeverity;
    var CallbackSignatureReturn = (function () {
        function CallbackSignatureReturn(status, value, error) {
            if (typeof error === "undefined") { error = null; }
            this._status = status;
            this._value = value;
            this._error = error;
        }
        CallbackSignatureReturn.prototype.status = function () {
            return this._status;
        };
        CallbackSignatureReturn.prototype.value = function () {
            return this._value;
        };
        CallbackSignatureReturn.prototype.error = function () {
            return this._error;
        };
        return CallbackSignatureReturn;
    })();
    core.CallbackSignatureReturn = CallbackSignatureReturn;    
    var ErrorParam = (function () {
        function ErrorParam(key, value) {
            this._key = key;
            this._value = value;
        }
        ErrorParam.prototype.key = function () {
            return this._key;
        };
        ErrorParam.prototype.value = function () {
            return this._value;
        };
        return ErrorParam;
    })();
    core.ErrorParam = ErrorParam;    
})(core || (core = {}));
//@ sourceMappingURL=core.js.map
