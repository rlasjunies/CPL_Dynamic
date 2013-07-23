var gApp;
var gSite;
var core;
(function (core) {
    var App = (function () {
        function App(site) {
            this.PubSub = new core.pubsub.PubSub();
            this.site = site;
        }
        return App;
    })();
    core.App = App;

    var Logger = (function () {
        function Logger() {
        }
        Logger.log = function (message) {
            if (typeof window.console !== 'undefined') {
                window.console.log(message);
            }
        };
        return Logger;
    })();
    core.Logger = Logger;
})(core || (core = {}));
//@ sourceMappingURL=core.js.map
