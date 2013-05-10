/// <reference path="core_pubsub.ts" />
var core;
(function (core) {
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
                return false;//do alert
                
            } else {
                return true;//do not alert end user!
                
            }
        };
    }
    core.setApp = setApp;
    var App = (function () {
        function App(w, debug) {
            if (typeof debug === "undefined") { debug = false; }
            this._debug = debug;
            this.PubSub = new core.pubsub.PubSub();
        }
        App.prototype.log = function (sev, err) {
            //TODO log to the server
            //TODO est-ce qu'il faut prévoir une alerte pour visualiser les erreurs non trappées?
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
    //TODO gestion des erreur ne semble pas bonne il doit y avoir des errors dans => s'appuyer sur la gestion des erreurs js
    var mtgError = (function () {
        function mtgError(errorNum, errorCoreString, errorParam) {
            if (typeof errorParam === "undefined") { errorParam = []; }
            this._errornum = errorNum;
            this._errorCoreString = errorCoreString;
            this._errorParamList = errorParam;
        }
        mtgError.prototype.errorNum = function () {
            return this._errornum;
        };
        mtgError.prototype.errorCoreString = function () {
            var tmp;
            tmp = "";
            if(this._errorCoreString !== undefined) {
                tmp = this._errorCoreString;
                for(var i = 0; i < this._errorParamList.length; i++) {
                    tmp.replace(this._errorParamList[i].key(), this._errorParamList[i].value());
                }
            }
            return tmp;
        };
        return mtgError;
    })();
    core.mtgError = mtgError;    
    var _app;
})(core || (core = {}));
//@ sourceMappingURL=core.js.map
