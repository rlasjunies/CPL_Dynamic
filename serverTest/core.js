/// <reference path="core_pubsub.ts" />
var core;
(function (core) {
    //export function setApp( w: Window, debug?:bool = false ) {
    //    app = new App( window, debug );
    //    window.onerror = function ( msg: string, url: string, line: number ) {
    //        app().log( eLogSeverity.critical, new Error( msg ) );
    //        if ( app().debug() ) {
    //            return false; //do alert
    //        } else {
    //            return true; //do not alert end user!
    //        }
    //    }
    //}
    (function (enumEntityStatus) {
        enumEntityStatus._map = [];
        enumEntityStatus._map[0] = "success";
        enumEntityStatus.success = 0;
        enumEntityStatus._map[1] = "failed";
        enumEntityStatus.failed = 1;
    })(core.enumEntityStatus || (core.enumEntityStatus = {}));
    var enumEntityStatus = core.enumEntityStatus;
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
    var App = (function () {
        function App() {
            this.PubSub = new core.pubsub.PubSub();
        }
        return App;
    })();
    core.App = App;    
})(core || (core = {}));
//@ sourceMappingURL=core.js.map
